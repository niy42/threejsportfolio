import styles from "../styles/loading.module.css";
import {useEffect, useState} from "react";

const Loader = function ({ messageOne, messageTwo, messageThree, messageFour }) {
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

            <div className={`relative flex flex-col animate-pulse max-w-full ${styles.loadingText} space-y-8`}>
                <div>
                    {loadingOne && (
                        <h1>
                            {messageOne}
                        </h1>
                    )}
                    {loadingTwo && (
                        <h1>
                            {messageFour}
                        </h1>
                    )}
                    {loadingOne && (
                        <p>
                        {messageTwo}
                        </p>
                    )}
                    {loadingTwo && (
                        <p>
                            {messageThree}
                        </p>
                    )}

                </div>
                <div className="">
                    <div className="dot1 mov"></div>
                    <div className="dot1 mov"></div>
                    <div className="dot1 mov"></div>
                    <div className="dot1 mov"></div>
                    <div className="dot1 mov"></div>
                </div>
            </div>

        </div>
    );
}
export default Loader;