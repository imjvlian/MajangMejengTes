import CommentSection from "@/components/shared/CommentSection";
import PostAside from "@/components/shared/PostAside";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const images = [
    ...(post?.image ? [post.image] : []),
    ...(post?.gallery || []),
  ];

  // console.log(post);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="loading"
          className="w-20 animate-spin"
        />
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <article className="lg:col-span-8">
          <h1 className="text-3xl mt-10 p-3 text-center font-bold max-w-3xl mx-auto lg:text-4xl text-slate-700 dark:text-slate-200">
            {post && post.title}
          </h1>

          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5 mx-13"
          >
            <Button
              variant="outline"
              className="border border-orange-600 dark:border-orange-600"
            >
              {post && post.category}
            </Button>
          </Link>

          <img
            src={post?.image}
            alt={post?.title}
            onClick={() => setSelectedImageIndex(0)}
            className="mt-10 p-3 max-h-[500px] w-full object-cover rounded-3xl cursor-zoom-in transition hover:opacity-90"
          />

          <div className="flex justify-between p-3 mx-auto w-full max-w-2xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>

          <Separator className="bg-slate-500" />

          <div
            className="max-w-3xl mx-auto w-full min-w-0 p-3 post-content"
            dangerouslySetInnerHTML={{
              __html:
                post && post.content
                  ? post.content
                      .replace(/&nbsp;/g, " ")
                      .replace(/\u00A0/g, " ")
                      .replace(/break-all/gi, "normal")
                  : "",
            }}
          ></div>

          {post.gallery?.length > 0 && (
            <div className="grid grid-cols-3 gap-4 my-8">
              {post.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index + 1)}
                  className="rounded-lg object-cover w-full h-48 cursor-zoom-in transition hover:scale-105"
                />
              ))}
            </div>
          )}

          <div className="max-w-3xl mx-auto mt-10 pt-8 border-t">
            <div className="flex items-center gap-4">
              <img
                src={post?.userId?.profilePicture}
                alt={post?.userId?.username}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wide">
                  Ditulis oleh
                </p>

                <h3 className="text-lg font-semibold">
                  {post?.userId?.username}
                </h3>
              </div>
            </div>
          </div>
          <CommentSection postId={post._id} />
        </article>
        <aside className="lg:col-span-4">
          <PostAside />
        </aside>
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-white/10 dark:bg-black/10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 flex items-center justify-center text-2xl font-bold"
            >
              ×
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 text-5xl text-white"
            >
              ❮
            </button>

            <img
              src={images[selectedImageIndex]}
              alt="Preview"
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[90vh] rounded-2xl object-contain"
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2 text-sm font-medium">
              {selectedImageIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`h-14 w-20 cursor-pointer rounded-lg object-cover border-2 transition ${
                    selectedImageIndex === index
                      ? "border-orange-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 text-5xl text-white"
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default PostDetail;
