import { toast } from "@/hooks/use-toast";
import { signInSuccess } from "@/redux/user/userSlice";
import React from "react";
import { BiCategory } from "react-icons/bi";
import {
  FaComments,
  FaSignOutAlt,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import { IoIosCreate, IoIosDocument } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signInSuccess());
        toast({ title: "Logged out!" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navItemClass =
    "group flex min-w-[52px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-orange-500 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-orange-400";

  const iconClass =
    "text-[18px] transition-transform duration-200 group-hover:-translate-y-0.5";

  const labelClass =
    "whitespace-nowrap text-[10px] font-medium leading-none";

  return (
    <nav
      className="
        fixed
        bottom-3
        left-3
        right-3
        z-50
        md:hidden
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-md
          items-center
          gap-1
          overflow-x-auto
          rounded-2xl
          border
          border-slate-200
          bg-white/95
          px-2
          py-2
          shadow-[0_8px_30px_rgba(0,0,0,0.15)]
          backdrop-blur-xl
          dark:border-slate-800
          dark:bg-slate-950/95
        "
      >
        {/* Profile */}
        <Link
          to="/dashboard?tab=profile"
          className={navItemClass}
        >
          <FaUserAlt className={iconClass} />
          <span className={labelClass}>Profile</span>
        </Link>

        {/* Admin Navigation */}
        {currentUser && currentUser.isAdmin && (
          <>
            {/* Create Post */}
            <Link
              to="/create-post"
              className={navItemClass}
            >
              <IoIosCreate className={iconClass} />
              <span className={labelClass}>Create Post</span>
            </Link>

            {/* Posts */}
            <Link
              to="/dashboard?tab=posts"
              className={navItemClass}
            >
              <IoIosDocument className={iconClass} />
              <span className={labelClass}>Posts</span>
            </Link>

            {/* Categories */}
            <Link
              to="/dashboard?tab=categories"
              className={navItemClass}
            >
              <BiCategory className={iconClass} />
              <span className={labelClass}>Categories</span>
            </Link>

            {/* All Users */}
            <Link
              to="/dashboard?tab=users"
              className={navItemClass}
            >
              <FaUsers className={iconClass} />
              <span className={labelClass}>All Users</span>
            </Link>

            {/* All Comments */}
            <Link
              to="/dashboard?tab=comments"
              className={navItemClass}
            >
              <FaComments className={iconClass} />
              <span className={labelClass}>All Comments</span>
            </Link>
          </>
        )}

        {/* Logout */}
        <button
          type="button"
          onClick={handleSignout}
          className={`
            ${navItemClass}
            border-0
            bg-transparent
          `}
        >
          <FaSignOutAlt className={iconClass} />
          <span className={labelClass}>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavBar;