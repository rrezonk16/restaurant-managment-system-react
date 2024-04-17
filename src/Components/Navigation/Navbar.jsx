import React, { useEffect, useState } from "react";
import logo_sm from "../Images/logo_sm.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate= useNavigate();

  const role = localStorage.getItem("role");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const checkUser = () => {
    if (role === "admin") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  const currentURL = window.location.href;

  useEffect(() => {
    checkUser();
    checkURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkURL = (substring) => {
    return currentURL.includes(substring);
  };

  const logout =()=>{
    localStorage.clear();
    navigate("/login")
  }


  return (
    <nav
      className="bg-black/30 shadow-lg ring-1 ring-black/5 sticky top-0 z-50"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 container">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo_sm} alt="" className=" w-12" />
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                className={`block py-2 px-3 ${
                  currentURL.includes(" ")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/Restaurants"
                className={`block py-2 px-3 ${
                  currentURL.includes("Restaurants")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                aria-current="page"
              >
                Restaurants
              </a>
            </li>
            <li>
              <a
                href="/Reserve"
                className={`block py-2 px-3 ${
                  currentURL.includes("Reserve")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                aria-current="page"
              >
                Reserve
              </a>
            </li>
            <li>
              <a
                href="/Menu"
                className={`block py-2 px-3 ${
                  currentURL.includes("Menu")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                aria-current="page"
              >
                Menu
              </a>
            </li>
            {!isLoggedIn ? (
              <li>
                <a
                  href="/Login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </a>
              </li>
            ) : (
              <li onClick={logout}>
                <p className=" cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Logout
                </p>
              </li>
            )}
            {/* onClick={Logout} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
