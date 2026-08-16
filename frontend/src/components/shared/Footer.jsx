import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-[#020617] dark:text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {/* About Us */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <img
                  src="/majangmejeng.svg"
                  alt="Majang Mejeng"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h2 className="text-lg font-bold tracking-tight">
                Majang Mejeng
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              Majang Mejeng adalah media kreatif lokal yang hadir untuk merekam,
              mengabarkan, dan mengangkat pelbagai cerita yang tumbuh dan
              berkembang di Lumajang.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Quick Links
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="group flex w-fit items-center gap-1 text-slate-600 transition-colors hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
                >
                  Home
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="group flex w-fit items-center gap-1 text-slate-600 transition-colors hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
                >
                  About Us
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  to="/news"
                  className="group flex w-fit items-center gap-1 text-slate-600 transition-colors hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
                >
                  News Article
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="group flex w-fit items-center gap-1 text-slate-600 transition-colors hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
                >
                  Contact
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Contact Us
            </h2>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>1234 Jalan, Kota, Wakanda</p>

              <p>
                <span className="text-slate-400 dark:text-slate-500">
                  Email:
                </span>{" "}
                info@website.com
              </p>

              <p>
                <span className="text-slate-400 dark:text-slate-500">
                  Phone:
                </span>{" "}
                +62812 3456 7890
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-7 sm:px-6 md:flex-row lg:px-8">
          {/* Copyright */}
          <p className="order-2 text-center text-xs text-slate-500 dark:text-slate-500 md:order-1 md:text-left">
            &copy; {new Date().getFullYear()}, Made with 🤍 by JVLIAN, All
            rights reserved.
          </p>

          {/* Social Media */}
          <div className="order-1 flex flex-col items-center gap-3 md:order-2 md:items-end">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Follow us on
            </p>

            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:text-slate-400 dark:hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
              >
                <FaFacebook className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:text-slate-400 dark:hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:text-slate-400 dark:hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
