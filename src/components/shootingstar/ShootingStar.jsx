import React, { useState, useEffect } from 'react';
import './ShootingStar.css'; // Include the CSS file

const ShootingStar = () => {
    const [showStar, setShowStar] = useState(false);

    useEffect(() => {
        // Function to show the star
        const triggerStar = () => {
            setShowStar(true);

            // Hide the star after 1 second (duration of the animation)
            setTimeout(() => setShowStar(false), 1000);
        };

        // Trigger the star every 10 seconds
        const interval = setInterval(triggerStar, 5000); // 10,000 ms = 10 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {showStar && <div className="shooting-star" />}
        </div>
    );
};

export default ShootingStar;
