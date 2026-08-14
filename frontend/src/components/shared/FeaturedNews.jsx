import { Link } from "react-router-dom";

const FeaturedNews = ({ posts = [] }) => {
  if (posts.length < 2) return null;

  const featured = posts.slice(1, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          Featured News
        </h2>

        <Link
          to="/search"
          className="text-orange-600 font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Headline Besar */}

        <Link
          to={`/post/${featured[0].slug}`}
          className="lg:col-span-7 group"
        >
          <div className="overflow-hidden rounded-2xl">

            <img
              src={featured[0].image}
              alt={featured[0].title}
              className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
            />

          </div>

          <div className="mt-5">

            <span className="text-sm font-semibold uppercase text-orange-600">

              {featured[0].category}

            </span>

            <h2 className="mt-2 text-3xl font-bold group-hover:text-orange-600 transition line-clamp-2">

              {featured[0].title}

            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">

              {new Date(featured[0].createdAt).toLocaleDateString("id-ID")}

            </p>

          </div>
        </Link>

        {/* List Kanan */}

        <div className="lg:col-span-5 flex flex-col gap-5">

          {featured.slice(1).map((post) => (
            <Link
              key={post._id}
              to={`/post/${post.slug}`}
              className="flex gap-4 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-40 h-28 rounded-xl object-cover flex-shrink-0"
              />

              <div>

                <span className="text-xs uppercase font-semibold text-orange-600">

                  {post.category}

                </span>

                <h3 className="font-bold mt-2 line-clamp-2 group-hover:text-orange-600 transition">

                  {post.title}

                </h3>

                <p className="text-sm text-gray-500 mt-2">

                  {new Date(post.createdAt).toLocaleDateString("id-ID")}

                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedNews;