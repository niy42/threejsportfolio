import {useEffect, useState} from 'react'
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import DayNightCycle from "./components/DayNightCircle";
import LoadingPage from "./components/LoadingPage.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";

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
        <main className="max-w-7xl mx-auto">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Clients />

            <DayNightCycle />
        </main>
    )
}
export default App
