import React, { useEffect, useState, useCallback, memo } from "react";
import { navLinks } from "../constants/index.js";
import { NiyLogo } from "/src/components/Niy";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext.jsx";

const NavItems = memo(({ activeSection, closeMenu }) => {
  const handleClick = (href) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (closeMenu) closeMenu();
  };

  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, href, name }) => (
        <li key={id} className="nav-li">
          <button
            onClick={() => handleClick(href)}
            className={`nav-link_a transition-colors duration-300 ${
              activeSection === href.replace("#", "")
                ? "text-white font-semibold"
                : "text-gray-400"
            }`}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
});

const ThemeToggleButton = memo(({ className = "" }) => {
  const { toggleDarkMode, isDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`${className} rounded-full flex items-center justify-center p-2
      transition-colors duration-300 cursor-pointer
      ${
        isDarkMode
          ? "text-yellow-300 bg-gray-800 hover:bg-gray-600"
          : "bg-yellow-300 hover:bg-yellow-200"
      }`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
});

const Navbar = () => {
  const [bg, setBg] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { toggleMenu, isMenuOpen } = useTheme();

  const closeMenu = () => {
    if (isMenuOpen) toggleMenu();
  };

  // Navbar background on scroll
  const handleScroll = useCallback(() => {
    setBg(window.scrollY >= 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll Spy (detect active section)
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${bg ? "bg-black/90 backdrop-blur-sm" : "lg:bg-transparent"}`}
    >
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center py-5 px-8 mx-auto">
          {/* Logo */}
          <a href="#home">
            <NiyLogo />
          </a>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="sm:hidden flex items-center">
            <img
              src={isMenuOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="toggle menu"
              className="w-6 h-6"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="sm:flex hidden items-center gap-6">
            <NavItems activeSection={activeSection} closeMenu={closeMenu} />
          </nav>

          {/* Desktop Theme Toggle */}
          <ThemeToggleButton className="hidden sm:flex" />
        </div>

        {/* Mobile Menu */}
        <div
          className={`nav-sidebar transition-all duration-500 ease-in-out
          ${isMenuOpen ? "min-screen-h" : "h-0 overflow-hidden"}`}
        >
          <nav className="relative p-5 space-y-3">
            <NavItems activeSection={activeSection} closeMenu={closeMenu} />
            <ThemeToggleButton className="relative left-6 -bottom-2" />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default memo(Navbar);
