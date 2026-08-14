import React, { useEffect, useState } from "react";
import HeroSection from "@/components/shared/HeroSection";
import FeaturedNews from "@/components/shared/FeaturedNews";
import LatestPosts from "@/components/shared/LatestPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // gunakan endpoint yang sama dengan project lainnya
        const res = await fetch("/api/post/getposts?limit=6");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

console.log(LatestPosts)

  return (
    <div>
      {/* Hero */}
      <HeroSection latestPost={posts[0]} />

      {/* Features */}
      <FeaturedNews posts={posts} />

      {/* Aside */}
      {/* <section className="bg-white dark:bg-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          <PostAside />
        </div>
      </section> */}

      {/* Recent Posts */}
      
    </div>
  );
};

export default Home;