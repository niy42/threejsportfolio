import React, { useEffect, useState, useCallback } from 'react';
import { navLinks } from "../constants/index.js";
import  Niy, {NiyLogo} from '/src/components/Niy';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from "../context/ThemeContext.jsx";

const NavItems = () => {
    return (
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
                <li key={id} className="nav-li">
                    <a href={href} className="nav-link_a">{name}</a>
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    const [bg, setBg] = useState(false);
    const { toggleDarkMode, isDarkMode, toggleMenu, isMenuOpen } = useTheme();

    // Optimized scroll handler
    const handleBg = useCallback(() => {
        setBg(window.scrollY >= 40);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleBg);
        return () => window.removeEventListener("scroll", handleBg);
    }, [handleBg]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-black/90 ${bg ? "backdrop-blur-sm" : "lg:bg-transparent"}`}>
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center py-5 px-8 mx-auto">
                    {/* Logo */}
                    <a href="#home" className="...">
                        <NiyLogo/>
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button onClick={toggleMenu} className="sm:hidden flex ...">
                        <img
                            src={isMenuOpen ? "/assets/close.svg" : "/assets/menu.svg"}
                            alt="toggle menu"
                            className="w-6 h-6"
                        />
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="sm:flex hidden items-center gap-6">
                        <NavItems />
                    </nav>

                    {/* Desktop Theme Toggle */}
                    <ThemeToggleButton className="hidden sm:flex" />
                </div>

                {/* Mobile Menu */}
                <div className={`nav-sidebar transition-all ease-in-out duration-500 ${isMenuOpen ? 'min-screen-h' : 'h-0'}`}>
                    <nav className="relative p-5 space-y-3">
                        <NavItems />
                        <ThemeToggleButton className={"relative left-6 -bottom-2"}/>
                    </nav>
                </div>
            </div>
        </header>
    );
};

// Extracted Theme Toggle Component
const ThemeToggleButton = ({ className = '' }) => {
    const { toggleDarkMode, isDarkMode } = useTheme();

    return (
        <button
            onClick={toggleDarkMode}
            className={`${className} rounded-full flex items-center justify-center p-2
            transition-colors duration-300 cursor-pointer 
            ${isDarkMode ? 'text-yellow-300 bg-gray-800 hover:bg-gray-600' 
                : 'bg-yellow-300 hover:bg-yellow-200'}`}
            aria-label="Toggle theme"
        >
            {isDarkMode ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
        </button>
    );
};

export default Navbar;