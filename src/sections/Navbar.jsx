import React, {useEffect, useState} from 'react';
import { navLinks } from "../constants/index.js";
import  Niy, {NiyLogo} from '/src/components/Niy';

const NavItems = () => {
    return (
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name }, index) => (
                <li key={index} className="nav-li">
                    <a href={href} className="nav-link_a">{name}</a>
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [bg, setBg] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleBg = () => {
        setBg(window.scrollY >= 40);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleBg);
        return () => window.removeEventListener("scroll", handleBg);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-black/90 ${bg ? "backdrop-blur-sm" : "lg:bg-transparent"}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 px-8 mx-auto">
                    <a href="#home" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors duration-300 ease-in">
                        <NiyLogo />
                    </a>

                    <button onClick={toggleMenu} className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex" aria-label="Toggle Menu">
                        <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} alt="toggle" className="w-6 h-6" />
                    </button>

                    {/* Desktop view */}
                    <nav className="sm:flex hidden">
                        <NavItems />
                    </nav>
                </div>

                  {/* Mobile view */}
                <div className={`nav-sidebar transition-all ease-in-out duration-500 ${isOpen ? 'max-h-screen' : 'h-0'}`}>
                    <nav className="p-5">
                        <NavItems />
                    </nav>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
