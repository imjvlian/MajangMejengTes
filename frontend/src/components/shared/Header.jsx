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

  const [searchTerm, setSearchTerm] = useState(" ");
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

  return (
    <header className="shadow-lg sticky dark:shadow-gray-900 bg-white dark:bg-slate-950 z-50">
      <div className="max-w-6xl lg:max-w-7xl mx-auto p-4">
        {/* TOP HEADER */}
        <div className="flex justify-between items-center gap-4">
          {/* MOBILE MENU + LOGO */}
          <div className="flex items-center gap-3">
            {/* Hamburger - hanya muncul di mobile */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-700 dark:text-slate-200 text-xl p-1"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo */}
            <Link to="/" onClick={closeMenu}>
              <div className="h-12">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* SEARCH */}
          <form
            className="p-3 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none bg-transparent w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit">
              <FaSearch className="text-slate-600 dark:text-slate-100" />
            </button>
          </form>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden lg:flex gap-4">
            <Link to="/">
              <li className="text-slate-700 dark:text-slate-300 hover:underline">
                Home
              </li>
            </Link>

            <Link to="/about">
              <li className="text-slate-700 dark:text-slate-300 hover:underline">
                About
              </li>
            </Link>

            <Link to="/contact">
              <li className="text-slate-700 dark:text-slate-300 hover:underline">
                Contact
              </li>
            </Link>

            <Link to="/news">
              <li className="text-slate-700 dark:text-slate-300 hover:underline">
                Articles
              </li>
            </Link>
          </ul>

          {/* USER + DARK MODE */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="min-w-10 min-h-10">
                    <img
                      src={currentUser.profilePicture}
                      alt="user photo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-60">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-gray-400" />

                  <DropdownMenuItem className="block font-semibold text-sm">
                    <div className="flex flex-col gap-1">
                      <span>{currentUser.username}</span>
                      <span>{currentUser.email}</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="font-semibold mt-2">
                    <Link to="/dashboard?tab=profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="font-semibold mt-2"
                    onClick={handleSignout}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/sign-in">
                <Button>Sign In</Button>
              </Link>
            )}
            <div className="mt-5">
              <DarkModeToggler />
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="lg:hidden mt-4 border-t border-slate-300 dark:border-slate-700 pt-3">
            <nav className="flex flex-col">
              <Link
                to="/"
                onClick={closeMenu}
                className="py-3 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="py-3 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="py-3 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              >
                Contact
              </Link>

              <Link
                to="/news"
                onClick={closeMenu}
                className="py-3 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
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
