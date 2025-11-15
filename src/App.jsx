import {useEffect, useState} from 'react'
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
// import DayNightCycle from "./components/DayNightCircle";
import LoadingPage from "./components/LoadingPage.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";
import StarsCanvas from "./components/DayNightCircle";
import ShootingStar from "./components/shootingstar/ShootingStar.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 34000); // simulate a 34-second loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <main className="min-w-full mx-auto overflow-x-hidden">
           <ThemeProvider>
               <ShootingStar />
               <Navbar />
               <Hero />
               <About />
               <Projects />
               <Clients />
               <Experience />
               <Contact />
               <Footer />
               <StarsCanvas />
           </ThemeProvider>
        </main>
    )
}
export default App
