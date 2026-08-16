import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getFileView, uploadFile } from "@/lib/appwrite/uploadImage";
import { compressImage } from "@/lib/imageCompression";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

  const [updatePostError, setUpdatePostError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, categoryRes] = await Promise.all([
          fetch(`/api/post/getposts?postId=${postId}`),
          fetch("/api/category/getcategories"),
        ]);

        const postData = await postRes.json();
        const categoryData = await categoryRes.json();

        if (postRes.ok) {
          setFormData(postData.posts[0]);
        }

        if (categoryRes.ok) {
          setCategories(categoryData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        toast({ title: "Please select an image!" });
        return;
      }

      setImageUploading(true);
      setImageUploadError(null);

      const compressed = await compressImage(file);

      const uploadedFile = await uploadFile(compressed);

      const imageUrl = getFileView(uploadedFile.$id);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        imageId: uploadedFile.$id,
      }));

      toast({
        title: "Image uploaded successfully!",
      });
    } catch (error) {
      setImageUploadError("Image upload failed");

      toast({
        title: "Image upload failed!",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleUploadGallery = async () => {
    if (galleryFiles.length === 0) {
      toast({
        title: "Please select images!",
      });

      return;
    }

    try {
      setGalleryUploading(true);

      const uploads = await Promise.all(
        galleryFiles.map(async (file) => {
          const compressed = await compressImage(file);

          const uploaded = await uploadFile(compressed);

          return {
            url: getFileView(uploaded.$id),
            id: uploaded.$id,
          };
        }),
      );

      setFormData((prev) => ({
        ...prev,
        gallery: uploads.map((item) => item.url),
        galleryIds: uploads.map((item) => item.id),
      }));

      toast({
        title: "Gallery uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Gallery upload failed!",
      });
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." });
        setUpdatePostError(data.message);

        return;
      }

      if (res.ok) {
        toast({ title: "Article Published Successfully!" });
        setUpdatePostError(null);

        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." });
      setUpdatePostError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-orange-500">
            Article Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Edit Post
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Update your article content, images, category, and information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFORMATION */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Article Information
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update the title and category of your article.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Article Title
                </label>

                <Input
                  type="text"
                  placeholder="Enter article title"
                  required
                  id="title"
                  value={formData.title || ""}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none transition focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-800"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                </label>

                <Select
                  value={formData.category || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-slate-50 px-4 shadow-none focus:ring-2 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-800">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>

                      {categories.map((category) => (
                        <SelectItem
                          key={category._id}
                          value={category.slug}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* FEATURED IMAGE */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Featured Image
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Upload the main image for this article.
              </p>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                />

                <Button
                  type="button"
                  className="h-12 rounded-xl bg-slate-900 px-6 font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  onClick={handleUploadImage}
                >
                  {imageUploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
            </div>

            {imageUploadError && (
              <p className="mt-3 text-sm font-medium text-red-500">
                {imageUploadError}
              </p>
            )}

            {formData.image && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <img
                  src={formData.image}
                  alt="Article preview"
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>
            )}
          </section>

          {/* GALLERY */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Article Gallery
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Add supporting images to your article.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Max. 3
              </span>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);

                    setGalleryFiles((prev) => {
                      const combined = [...prev, ...newFiles];

                      const unique = combined.filter(
                        (file, index, self) =>
                          index ===
                          self.findIndex(
                            (f) =>
                              f.name === file.name &&
                              f.size === file.size &&
                              f.lastModified === file.lastModified,
                          ),
                      );

                      return unique.slice(0, 3);
                    });

                    e.target.value = "";
                  }}
                  className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                />

                <Button
                  type="button"
                  className="h-12 rounded-xl bg-slate-900 px-6 font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  onClick={handleUploadGallery}
                >
                  {galleryUploading ? "Uploading..." : "Upload Gallery"}
                </Button>
              </div>
            </div>

            {/* NEW GALLERY PREVIEW */}
            {galleryFiles.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Selected Images
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {galleryFiles.map((file, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected ${index + 1}`}
                        className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-white backdrop-blur transition hover:bg-red-600"
                        onClick={() =>
                          setGalleryFiles((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXISTING GALLERY */}
            {formData.gallery?.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Current Gallery
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {formData.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-white backdrop-blur transition hover:bg-red-600"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            gallery: prev.gallery.filter(
                              (_, i) => i !== index,
                            ),
                            galleryIds: prev.galleryIds
                              ? prev.galleryIds.filter(
                                  (_, i) => i !== index,
                                )
                              : [],
                          }))
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* CONTENT */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Article Content
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Edit the content of your article.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <ReactQuill
                theme="snow"
                placeholder="Write something here..."
                className="edit-post-quill h-72 mb-12"
                required
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    content: value,
                  }));
                }}
                value={formData.content || ""}
              />
            </div>
          </section>

          {/* ERROR */}
          {updatePostError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {updatePostError}
            </div>
          )}

          {/* ACTION */}
          <div className="flex justify-end pb-8">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-orange-500 px-8 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:w-auto"
            >
              Update Your Article
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;