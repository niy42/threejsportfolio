// components/LoadingPage.js

import { useEffect, useState } from "react";
import styles from "../styles/loading.module.css";
import LoadingDots from "./LoadingDots.jsx";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 15000); // simulate a 15-second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        // <div className={styles.loadingText}>
        <div>
          <div className="text-center px-4 space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Welcome to my portfolio!
            </h1>

            <p className="text-base sm:text-lg md:text-xl">
              We're about to embark on an exciting journey to my space.
            </p>

            <p className="text-sm sm:text-base md:text-lg">Hold tight...</p>
          </div>
          {/* Rocket Animation */}
          <div className={styles.rocket}>🚀</div>
        </div>
      ) : (
        <div>
          <LoadingDots
            messageOne={"Alright here we go!"}
            messageTwo={"How many stars are there in the skies?"}
            messageThree={"Ready for an immersive experience?"}
            messageFour={"We're almost there!"}
          />
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
