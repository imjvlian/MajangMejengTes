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
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  ImagePlus,
  Images,
  Upload,
  X,
  FileText,
  FolderOpen,
  Send,
} from "lucide-react";

const CreatePost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [createPostError, setCreatePostError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/getcategories");
        const data = await res.json();

        if (res.ok) {
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

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
      const postImageUrl = getFileView(uploadedFile.$id);

      setFormData((prev) => ({
        ...prev,
        image: postImageUrl,
        imageId: uploadedFile.$id,
      }));

      toast({ title: "Image uploaded successfully!" });

      if (postImageUrl) {
        setImageUploading(false);
      }
    } catch (error) {
      setImageUploadError("Image upload failed");
      console.log(error);

      toast({ title: "Image upload failed!" });
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
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." });
        setCreatePostError(data.message);

        return;
      }

      if (res.ok) {
        toast({ title: "Article Published Successfully!" });
        setCreatePostError(null);

        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." });
      setCreatePostError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-[#020617] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-500">
            <FileText className="h-4 w-4" />
            <span>CONTENT MANAGEMENT</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Create an Article
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Write, organize, and publish a new article for Majang Mejeng.
          </p>
        </div>

        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          {/* =====================================================
              BASIC INFORMATION
          ====================================================== */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <FileText className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Article Information
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add the title and category of your article.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_240px]">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Article Title
                </label>

                <Input
                  type="text"
                  placeholder="Enter article title..."
                  required
                  id="title"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none transition-colors focus:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                  <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-slate-50 shadow-none dark:border-slate-700 dark:bg-slate-950">
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

          {/* =====================================================
              COVER IMAGE
          ====================================================== */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <ImagePlus className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Featured Image
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload the main image for your article.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <label className="flex min-h-20 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 transition hover:border-orange-400 hover:bg-orange-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-500">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setFile(e.target.files[0])
                      }
                    />

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <ImagePlus className="h-5 w-5 text-slate-500" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {file
                            ? file.name
                            : "Choose featured image"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Click to browse your files
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                <Button
                  type="button"
                  className="h-11 rounded-xl bg-slate-900 px-5 font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  onClick={handleUploadImage}
                  disabled={imageUploading}
                >
                  <Upload className="mr-2 h-4 w-4" />

                  {imageUploading
                    ? "Uploading..."
                    : "Upload Image"}
                </Button>
              </div>
            </div>

            {imageUploadError && (
              <p className="mt-3 text-sm font-medium text-red-600">
                {imageUploadError}
              </p>
            )}

            {formData.image && (
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <img
                  src={formData.image}
                  alt="upload"
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>
            )}
          </section>

          {/* =====================================================
              GALLERY
          ====================================================== */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <Images className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Article Gallery
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add up to 3 additional images.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex min-h-20 flex-1 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 transition hover:border-orange-400 hover:bg-orange-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-500">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const newFiles = Array.from(
                        e.target.files || [],
                      );

                      setGalleryFiles((prev) => {
                        const combined = [
                          ...prev,
                          ...newFiles,
                        ];

                        const unique = combined.filter(
                          (file, index, self) =>
                            index ===
                            self.findIndex(
                              (f) =>
                                f.name === file.name &&
                                f.size === file.size &&
                                f.lastModified ===
                                  file.lastModified,
                            ),
                        );

                        if (unique.length > 3) {
                          toast({
                            title: "Maximum 3 images",
                          });

                          return unique.slice(0, 3);
                        }

                        return unique;
                      });

                      e.target.value = "";
                    }}
                  />

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Images className="h-5 w-5 text-slate-500" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Choose gallery images
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Maximum 3 images
                      </p>
                    </div>
                  </div>
                </label>

                <Button
                  type="button"
                  className="h-11 rounded-xl bg-slate-900 px-5 font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  onClick={handleUploadGallery}
                  disabled={galleryUploading}
                >
                  <Upload className="mr-2 h-4 w-4" />

                  {galleryUploading
                    ? "Uploading..."
                    : "Upload Gallery"}
                </Button>
              </div>
            </div>

            {/* Selected gallery files */}
            {galleryFiles.length > 0 && (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {galleryFiles.map((file, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setGalleryFiles((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Uploaded gallery */}
            {formData.gallery && (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {formData.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =====================================================
              CONTENT EDITOR
          ====================================================== */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <FileText className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Article Content
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Write the content of your article.
                </p>
              </div>
            </div>

            <div className="create-post-editor overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <ReactQuill
                theme="snow"
                placeholder="Write something here..."
                className="h-72 mb-12"
                required
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    content: value,
                  }));
                }}
              />
            </div>
          </section>

          {/* =====================================================
              PUBLISH
          ====================================================== */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-orange-500 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md"
            >
              <Send className="mr-2 h-4 w-4" />
              Publish Your Article
            </Button>

            {createPostError && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-950/30">
                {createPostError}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* =====================================================
          QUILL CUSTOM STYLE
      ====================================================== */}
      <style>{`
        .create-post-editor .ql-toolbar {
          border: 0;
          border-bottom: 1px solid rgb(226 232 240);
          background: rgb(248 250 252);
          padding: 12px;
        }

        .create-post-editor .ql-container {
          border: 0;
          font-size: 15px;
        }

        .create-post-editor .ql-editor {
          min-height: 250px;
          padding: 18px;
          line-height: 1.7;
        }

        .create-post-editor .ql-editor.ql-blank::before {
          color: rgb(148 163 184);
          font-style: normal;
        }

        .dark .create-post-editor .ql-toolbar {
          border-color: rgb(51 65 85);
          background: rgb(15 23 42);
        }

        .dark .create-post-editor .ql-container {
          background: rgb(15 23 42);
          color: white;
        }

        .dark .create-post-editor .ql-stroke {
          stroke: rgb(203 213 225);
        }

        .dark .create-post-editor .ql-fill {
          fill: rgb(203 213 225);
        }

        .dark .create-post-editor .ql-picker {
          color: rgb(203 213 225);
        }

        .dark .create-post-editor .ql-picker-options {
          background: rgb(15 23 42);
          border-color: rgb(51 65 85);
        }
      `}</style>
    </div>
  );
};

export default CreatePost;