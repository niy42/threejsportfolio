import styles from "../styles/loading.module.css";
import { useEffect, useState } from "react";

const Loader = function ({
  messageOne,
  messageTwo,
  messageThree,
  messageFour,
}) {
  const [loadingOne, setIsLoadingOne] = useState(true);
  const [loadingTwo, setIsLoadingTwo] = useState(false);

  useEffect(() => {
    const firstMessage = setTimeout(() => {
      setIsLoadingOne(false);
      setIsLoadingTwo(true);
    }, 8000); // Hides first message after 8 seconds and shows second message after 2 seconds

    return () => clearInterval(firstMessage);
  }, []);

  return (
    <div className="relative text-center mt-auto mb-auto">
      <div
        className={`relative flex flex-col animate-pulse max-w-full space-y-4`}
      >
        {loadingOne && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            {messageOne}
          </h1>
        )}
        {loadingTwo && (
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {messageFour}
          </h1>
        )}

        {loadingOne && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2">
            {messageTwo}
          </p>
        )}
        {loadingTwo && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2">
            {messageThree}
          </p>
        )}
        <div className="mt-4">
          <div className="dot1 mov"></div>
          <div className="dot1 mov"></div>
          <div className="dot1 mov"></div>
          <div className="dot1 mov"></div>
          <div className="dot1 mov"></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
