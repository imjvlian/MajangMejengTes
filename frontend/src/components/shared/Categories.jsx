import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/post/categories");
        const data = await res.json();

        if (res.ok) {
          setCategories(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 border-b pb-3">
        Categories
      </h2>

      <div className="rounded-lg border overflow-hidden">

        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/search?category=${cat._id}`}
            className="flex justify-between items-center px-4 py-3 border-b last:border-none hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <span className="capitalize">
              {cat._id}
            </span>

            <span className="font-semibold text-gray-500">
              {cat.total}
            </span>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Categories;