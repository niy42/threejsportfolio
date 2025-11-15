import { useRef, useEffect } from "react";

const ShootingStar = () => {
  const canvasRef = useRef();
  const spawnTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = [];

    const createStar = () => {
      // Spawn from top edge for a more "shooting" feel (random x, y=0)
      const startX = Math.random() * width;
      const startY = 0;
      const length = 150 + Math.random() * 100;
      const speed = 10 + Math.random() * 5;
      const angle = Math.random() * 0.2 + Math.PI / 4; // slightly slanted downward
      const size = 2 + Math.random() * 2; // bright head size
      stars.push({ startX, startY, length, speed, angle, size, opacity: 1 });
    };

    const spawnStarWithDelay = () => {
      createStar();
      // Schedule next spawn after 5-15 seconds (not immediate, fewer stars)
      spawnTimeoutRef.current = setTimeout(spawnStarWithDelay, (5000 + Math.random() * 10000));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star, i) => {
        let { startX, startY, length, speed, angle, size, opacity } = star;

        // Calculate tail end position (back along the direction of travel)
        const tailX = startX - length * Math.cos(angle);
        const tailY = startY - length * Math.sin(angle);

        // Create gradient tail (fading from head to tail)
        const grad = ctx.createLinearGradient(startX, startY, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        // Draw tail
        ctx.strokeStyle = grad;
        ctx.lineWidth = size;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Draw bright head
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.beginPath();
        ctx.arc(startX, startY, size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Update position (move head forward)
        star.startX += speed * Math.cos(angle);
        star.startY += speed * Math.sin(angle);
        star.opacity -= 0.02;
        star.length -= 1; // Gradually shorten tail as it fades

        // Remove faded or off-screen stars
        if (star.opacity <= 0 || star.length <= 0 || star.startX > width + 50 || star.startY > height + 50) {
          stars.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    // Initial spawn after a delay (not immediate)
    spawnTimeoutRef.current = setTimeout(spawnStarWithDelay, 15000);

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default ShootingStar;