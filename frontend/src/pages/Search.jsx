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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | FETCH ALL CATEGORIES DYNAMICALLY
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const res = await fetch("/api/post/getposts?limit=1000");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        const uniqueCategories = [
          ...new Set(
            (data.posts || [])
              .map((post) => post.category?.trim())
              .filter(
                (category) =>
                  category &&
                  category.toLowerCase() !== "uncategorized",
              ),
          ),
        ].sort((a, b) => a.localeCompare(b));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FETCH POSTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    setSidebarData({
      searchTerm: searchTermFromUrl || "",
      sort: sortFromUrl || "desc",
      category: categoryFromUrl || "",
    });

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/post/getposts?${searchQuery}`);

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        const fetchedPosts = data.posts || [];

        setPosts(fetchedPosts);

        setShowMore(fetchedPosts.length === 9);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
        setShowMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  /*
  |--------------------------------------------------------------------------
  | HANDLE SEARCH INPUT
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "searchTerm") {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: value,
      }));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT FILTER
  |--------------------------------------------------------------------------
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();

    if (sidebarData.searchTerm.trim()) {
      urlParams.set("searchTerm", sidebarData.searchTerm.trim());
    }

    if (sidebarData.sort) {
      urlParams.set("sort", sidebarData.sort);
    }

    if (sidebarData.category) {
      urlParams.set("category", sidebarData.category);
    }

    navigate(`/search?${urlParams.toString()}`);
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD MORE
  |--------------------------------------------------------------------------
  */

  const handleShowMore = async () => {
    const startIndex = posts.length;

    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        throw new Error("Failed to load more posts");
      }

      const data = await res.json();

      const newPosts = data.posts || [];

      setPosts((prev) => [...prev, ...newPosts]);

      setShowMore(newPosts.length === 9);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESET FILTER
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setSidebarData({
      searchTerm: "",
      sort: "desc",
      category: "",
    });

    navigate("/search");
  };

  /*
  |--------------------------------------------------------------------------
  | CATEGORY LABEL
  |--------------------------------------------------------------------------
  */

  const formatCategory = (category) => {
    if (!category) return "";

    return category
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <SlidersHorizontal className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Filters
                </h2>

                <p className="text-xs text-slate-500">
                  Refine your search
                </p>
              </div>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Search */}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sort By
                </label>

                <Select
                  value={sidebarData.sort}
                  onValueChange={(value) =>
                    setSidebarData((prev) => ({
                      ...prev,
                      sort: value,
                    }))
                  }
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

              {/* =====================================================
                  DYNAMIC CATEGORY
              ====================================================== */}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </label>

                <Select
                  value={sidebarData.category || undefined}
                  onValueChange={(value) =>
                    setSidebarData((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                  disabled={categoryLoading}
                >
                  <SelectTrigger className="h-11 w-full rounded-lg border-slate-300 bg-slate-50 text-sm dark:border-slate-700 dark:bg-slate-900">
                    <SelectValue
                      placeholder={
                        categoryLoading
                          ? "Loading categories..."
                          : "Select a Category"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Categories</SelectLabel>

                      {categories.length === 0 && !categoryLoading ? (
                        <div className="px-2 py-3 text-sm text-slate-500">
                          No categories available
                        </div>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {formatCategory(category)}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {sidebarData.category && (
                  <button
                    type="button"
                    onClick={() =>
                      setSidebarData((prev) => ({
                        ...prev,
                        category: "",
                      }))
                    }
                    className="w-fit text-xs text-orange-500 hover:text-orange-600 hover:underline"
                  >
                    Clear category
                  </button>
                )}
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
                  className="h-10 w-full rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white"
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

                <p className="mt-2 text-sm text-slate-500">
                  Discover the latest stories and updates.
                </p>
              </div>

              {!loading && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
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
              <div className="grid min-h-[400px] place-items-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500 dark:border-slate-800 dark:border-t-orange-500" />

                  <p className="text-sm text-slate-500">
                    Loading articles...
                  </p>
                </div>
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

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
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
                      className="min-w-0"
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Load More */}

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