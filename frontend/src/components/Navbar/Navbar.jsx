import React, { useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/Cart",
    },
    {
      title: "Profile",
      link: "/Profile",
    },
    {
      title: "Admin Profile",
      link: "/Profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if(isLoggedIn===true && role ==="admin"){
    links.splice(2, 2);
  }
  if(isLoggedIn===true && role ==="user"){
    links.splice(4, 1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  const toggleMobileNav = () => {
    setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
  };

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className={
                  items.title === "Profile" ||  items.title === "Admin Profile"
                    ? "px-4 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300"
                    : "hover:text-blue-500 transition-all duration-300 cursor-pointer"
                }
                key={i} // Assign key here
              >
                {items.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex gap-4 text-white">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/LogIn"
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <button
            className="text-white text-2xl hover:text-zinc-400 block md:hidden"
            onClick={toggleMobileNav}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={
              items.title === "Profile" || items.title === "Admin Profile"
                ? "mb-8 px-8 py-2 text-3xl font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300"
                : "text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer"
            }
            key={i} // Assign key here
            onClick={toggleMobileNav} // Close the menu when an item is clicked
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className="mb-8 px-8 py-2 text-3xl font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300"
              onClick={toggleMobileNav} // Close the menu when an item is clicked
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="mb-8 px-8 py-2 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300"
              onClick={toggleMobileNav} // Close the menu when an item is clicked
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
