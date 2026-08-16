import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import DarkModeToggler from "../ui/DarkModeToggler";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "@/redux/user/userSlice";
import { toast } from "@/hooks/use-toast";
import logo from "../../assets/logo.PNG";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        toast({ title: "Logged out!" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = (path) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-200
    ${
      location.pathname === path
        ? "text-orange-500"
        : "text-slate-600 hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
    }`;

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-slate-200/70
        bg-white/90
        shadow-sm
        backdrop-blur-xl
        dark:border-slate-800/70
        dark:bg-[#020617]/90
      "
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between gap-4">

          {/* =====================================================
              LEFT — MOBILE MENU + LOGO
          ====================================================== */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                text-slate-600
                transition-all
                hover:bg-slate-100
                hover:text-orange-500
                active:scale-95
                dark:text-slate-300
                dark:hover:bg-slate-800
                dark:hover:text-orange-400
                lg:hidden
              "
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center"
            >
              <div className="h-11 w-auto">
                <img
                  src={logo}
                  alt="Majang Mejeng"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* =====================================================
              CENTER — SEARCH
          ====================================================== */}
          <form
            onSubmit={handleSubmit}
            className="
              hidden
              h-11
              w-full
              max-w-[300px]
              items-center
              rounded-xl
              border
              border-slate-200
              bg-slate-100/80
              px-3
              transition-all
              focus-within:border-orange-500
              focus-within:bg-white
              focus-within:ring-4
              focus-within:ring-orange-500/10
              dark:border-slate-800
              dark:bg-slate-900
              dark:focus-within:bg-slate-900
              sm:flex
            "
          >
            <input
              type="text"
              placeholder="Search articles..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-2
                text-sm
                text-slate-900
                outline-none
                placeholder:text-slate-400
                dark:text-white
                dark:placeholder:text-slate-500
              "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="submit"
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                text-slate-500
                transition-colors
                hover:bg-orange-500
                hover:text-white
                dark:text-slate-400
              "
              aria-label="Search"
            >
              <FaSearch className="text-sm" />
            </button>
          </form>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link to="/about" className={navLinkClass("/about")}>
              About
            </Link>

            <Link to="/contact" className={navLinkClass("/contact")}>
              Contact
            </Link>

            <Link to="/news" className={navLinkClass("/news")}>
              Articles
            </Link>
          </nav>

          {/* =====================================================
              RIGHT — USER + DARK MODE
          ====================================================== */}
          <div className="flex shrink-0 items-center gap-3">

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="
                      rounded-full
                      p-0.5
                      outline-none
                      ring-orange-500/30
                      transition-all
                      hover:ring-4
                      focus:ring-4
                    "
                  >
                    <img
                      src={currentUser.profilePicture}
                      alt="user photo"
                      className="
                        h-10
                        w-10
                        rounded-full
                        border-2
                        border-white
                        object-cover
                        shadow-sm
                        dark:border-slate-800
                      "
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="
                    mt-2
                    w-64
                    rounded-xl
                    border-slate-200
                    p-2
                    shadow-xl
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">
                        My Account
                      </span>

                      <span className="truncate text-xs font-normal text-slate-500">
                        {currentUser.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-lg"
                  >
                    <Link
                      to="/dashboard?tab=profile"
                      className="w-full font-medium"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleSignout}
                    className="
                      mt-1
                      cursor-pointer
                      rounded-lg
                      font-medium
                      text-red-500
                      focus:bg-red-50
                      focus:text-red-600
                      dark:focus:bg-red-950/30
                    "
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/sign-in">
                <Button
                  className="
                    rounded-xl
                    bg-orange-500
                    px-5
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    hover:bg-orange-600
                    hover:shadow-md
                  "
                >
                  Sign In
                </Button>
              </Link>
            )}

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-slate-100
                dark:bg-slate-800
              "
            >
              <DarkModeToggler />
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE SEARCH
        ====================================================== */}
        <div className="pb-3 sm:hidden">
          <form
            onSubmit={handleSubmit}
            className="
              flex
              h-11
              w-full
              items-center
              rounded-xl
              border
              border-slate-200
              bg-slate-100
              px-3
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <input
              type="text"
              placeholder="Search articles..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-2
                text-sm
                text-slate-900
                outline-none
                placeholder:text-slate-400
                dark:text-white
                dark:placeholder:text-slate-500
              "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="submit"
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                bg-orange-500
                text-white
                transition-colors
                hover:bg-orange-600
              "
              aria-label="Search"
            >
              <FaSearch className="text-sm" />
            </button>
          </form>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}
        {menuOpen && (
          <div
            className="
              border-t
              border-slate-200
              py-3
              dark:border-slate-800
              lg:hidden
            "
          >
            <nav className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:bg-orange-50
                  hover:text-orange-500
                  dark:text-slate-300
                  dark:hover:bg-orange-500/10
                  dark:hover:text-orange-400
                "
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:bg-orange-50
                  hover:text-orange-500
                  dark:text-slate-300
                  dark:hover:bg-orange-500/10
                  dark:hover:text-orange-400
                "
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:bg-orange-50
                  hover:text-orange-500
                  dark:text-slate-300
                  dark:hover:bg-orange-500/10
                  dark:hover:text-orange-400
                "
              >
                Contact
              </Link>

              <Link
                to="/news"
                onClick={closeMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition-colors
                  hover:bg-orange-50
                  hover:text-orange-500
                  dark:text-slate-300
                  dark:hover:bg-orange-500/10
                  dark:hover:text-orange-400
                "
              >
                Articles
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;