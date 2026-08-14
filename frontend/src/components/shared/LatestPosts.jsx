import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-6 border-b pb-3">
        Something Fresh
      </h2>

      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post.slug}`}
            className="flex gap-4 group"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-24 h-20 rounded-lg object-cover flex-shrink-0"
            />

            <div>
              <h3 className="font-semibold leading-5 group-hover:text-red-600 transition line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;