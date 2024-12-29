import React, { useEffect, useState } from 'react';
import './ShootingStars.css'; // Include the CSS file

const ShootingStars = () => {
    const [stars, setStars] = useState([]);

    const createStar = () => {
        const newStar = {
            id: Date.now(),
            top: `${Math.random() * 100}%`, // Random position from top
            left: `${Math.random() * 100}%`, // Random position from left
            duration: Math.random() * 2 + 2 + 's', // Random animation duration between 2 and 4 seconds
        };

        setStars((prevStars) => [...prevStars, newStar]);
    };

    useEffect(() => {
        // Create a new star every second
        const interval = setInterval(createStar, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="shooting-star-container">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        top: star.top,
                        left: star.left,
                        animationDuration: star.duration,
                    }}
                />
            ))}
        </div>
    );
};

export default ShootingStars;
