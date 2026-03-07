import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import LoadingPage from "./components/LoadingPage.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";
// import ShootingStar from "./components/shootingstar/ShootingStar.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AppSnackbarProvider } from "./components/AppSnackbarProvider/AppSnackbarProvider.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const StarsCanvas = lazy(() => import("./components/DayNightCircle"));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 34000); // simulate a 34-second loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className="block mx-auto overflow-x-hidden min-h-screen">
      <AppSnackbarProvider>
        <ThemeProvider>
          {/* <ShootingStar /> */}
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Clients />
          <Experience />
          <Contact />
          <Footer />
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </ThemeProvider>
      </AppSnackbarProvider>
    </main>
  );
};
export default App;
