import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-gray-300 text-black dark:bg-gray-900 dark:text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            Majang Mejeng adalah media kreatif lokal yang hadir untuk merekam,
            mengabarkan, dan mengangkat pelbagai cerita yang tumbuh dan
            berkembang di Lumajang.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y2 text-gray-800 dark:text-gray-200">
            <li>
              <Link to={"/"} className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/news"} className="hover:text-white">
                News Article
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            1234 Jalan, Kota, Wakanda
          </p>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            Email: info@website.com
          </p>
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            Phone: +62812 3456 7890
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        <p>Follow us on</p>

        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="hover:text-white">
            Facebook
          </a>
          <a href="#" className="hover:text-white">
            Instagram
          </a>
          <a href="#" className="hover:text-white">
            Twitter
          </a>
        </div>
        <p className="mt-4">
          &copy; {new Date().getFullYear()}, Made with 🤍 by JVLIAN, All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
