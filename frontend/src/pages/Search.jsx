import PostCard from "@/components/shared/PostCard";
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
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "",
        category: categoryFromUrl || "",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/post/getposts?${searchQuery}`);

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        setPosts(data.posts || []);
        setLoading(false);

        if (data.posts?.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);

    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;

    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      setPosts([...posts, ...(data.posts || [])]);

      if (data.posts?.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    }
  };

  const resetFilters = () => {
    setSidebarData({
      searchTerm: "",
      sort: "desc",
      category: "",
    });

    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-white">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col md:flex-row">
        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <aside className="w-full shrink-0 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#020617] md:sticky md:top-0 md:h-[calc(100vh-80px)] md:w-[280px] md:border-b-0 md:border-r">
          <div className="p-5 md:p-6">
            {/* Sidebar Header */}

            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 dark:bg-orange-500/10">
                <SlidersHorizontal className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Filters
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Refine your search
                </p>
              </div>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Search */}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                  Search Term
                </label>

                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    placeholder="Search articles..."
                    id="searchTerm"
                    type="text"
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    className="h-11 rounded-lg border-slate-300 bg-slate-50 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Sort */}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                  Sort By
                </label>

                <Select
                  onValueChange={(value) =>
                    setSidebarData({
                      ...sidebarData,
                      sort: value,
                    })
                  }
                  value={sidebarData.sort}
                >
                  <SelectTrigger className="h-11 w-full rounded-lg border-slate-300 bg-slate-50 text-sm dark:border-slate-700 dark:bg-slate-900">
                    <SelectValue placeholder="Select Order" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Order by:</SelectLabel>

                      <SelectItem value="desc">Latest</SelectItem>

                      <SelectItem value="asc">Oldest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                  Category
                </label>

                <Select
                  onValueChange={(value) =>
                    setSidebarData({
                      ...sidebarData,
                      category: value,
                    })
                  }
                  value={sidebarData.category}
                >
                  <SelectTrigger className="h-11 w-full rounded-lg border-slate-300 bg-slate-50 text-sm dark:border-slate-700 dark:bg-slate-900">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category:</SelectLabel>

                      <SelectItem value="worldnews">World News</SelectItem>

                      <SelectItem value="sportsnews">Sports News</SelectItem>

                      <SelectItem value="localnews">Local News</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}

              <div className="mt-2 flex flex-col gap-2">
                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-orange-500 font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={resetFilters}
                  className="h-10 w-full rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-white"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </form>
          </div>
        </aside>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <main className="min-w-0 flex-1">
          {/* Header */}

          <div className="px-5 pb-5 pt-7 md:px-8 md:pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Majang Mejeng
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  News Articles
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                  Discover the latest stories and updates.
                </p>
              </div>

              {!loading && posts.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                  <span className="font-semibold text-slate-900 dark:text-slate-300">
                    {posts.length}
                  </span>
                  articles
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          {/* Articles */}

          <div className="p-5 md:p-8">
            {/* Loading */}

            {loading && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <div key={post._id} className="min-w-0">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}

            {!loading && posts.length === 0 && (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-800 dark:bg-slate-900/40">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <SearchIcon className="h-7 w-7 text-slate-400" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  No articles found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-500">
                  We couldn't find any articles matching your current filters.
                  Try changing your search or category.
                </p>

                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="mt-5 rounded-lg"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Posts */}

            {!loading && posts.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Show More */}

                {showMore && (
                  <div className="mt-10 flex justify-center">
                    <Button
                      onClick={handleShowMore}
                      variant="outline"
                      className="h-11 min-w-[150px] rounded-lg border-slate-300 px-6 font-semibold dark:border-slate-700"
                    >
                      Load More
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
