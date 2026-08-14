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
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
        Create a post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <Select
            value={formData.category || ""}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                category: value,
              }))
            }
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>

                {categories.map((category) => (
                  <SelectItem key={category._id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button className="bg-slate-700" onClick={handleUploadImage}>
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <div className="flex gap-4 items-center justify-between border-4 border-dashed border-slate-600 p-3">
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

          <Button
            type="button"
            className="bg-slate-700"
            onClick={handleUploadGallery}
          >
            {galleryUploading ? "Uploading..." : "Upload Gallery"}
          </Button>
        </div>

        {galleryFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {galleryFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-36 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() =>
                    setGalleryFiles((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {formData.gallery && (
          <div className="grid grid-cols-3 gap-3">
            {formData.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-36 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          className="h-72  mb-12"
          required
          onChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              content: value,
            }));
          }}
        />

        <Button
          type="submit"
          className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md"
        >
          Publish Your Article
        </Button>
        {createPostError && (
          <p className="text-red-600 mt-5">{createPostError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
