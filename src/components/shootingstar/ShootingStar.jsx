import { useRef, useEffect } from "react";

const ShootingStar = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = [];
    const MAX_STARS = 8;

    const colors = [
      "255,255,255", // white
      "170,200,255", // blue tint
      "255,240,200", // warm yellow
      "220,200,255"  // purple-ish
    ];

    let lastSpawn = Date.now();
    let spawnDelay = randomDelay();

    function randomDelay() {
      return 3000 + Math.random() * 10000; // 3–13 sec
    }

    const createStar = () => {
      if (stars.length >= MAX_STARS) return;

      const startX = Math.random() * width;
      const startY = -50;
      const angle = Math.random() * 0.4 + 0.3; // cinematic angle

      stars.push({
        x: startX,
        y: startY,
        speed: 6 + Math.random() * 12,
        angle,
        size: 1.5 + Math.random() * 2.5,
        length: 80 + Math.random() * 150,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        curve: (Math.random() - 0.5) * 0.006,
        sparkle: Math.random() > 0.75, // only some sparkle
      });
    };

    const drawStar = (star) => {
      star.angle += star.curve;
      star.x += star.speed * Math.cos(star.angle);
      star.y += star.speed * Math.sin(star.angle);

      star.opacity -= 0.01;
      star.length -= 0.8;

      const tailX = star.x - star.length * Math.cos(star.angle);
      const tailY = star.y - star.length * Math.sin(star.angle);

      const grad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
      grad.addColorStop(0, `rgba(${star.color},${star.opacity})`);
      grad.addColorStop(1, `rgba(${star.color},0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = star.size;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      ctx.fillStyle = `rgba(${star.color},${star.opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Sparkle effect at end of life
      if (star.sparkle && Math.random() > 0.96) {
        ctx.fillStyle = `rgba(${star.color},${star.opacity})`;
        ctx.beginPath();
        ctx.arc(
          star.x + Math.random() * 6 - 3,
          star.y + Math.random() * 6 - 3,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    };

    const render = () => {
      if (document.hidden) {
        requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastSpawn > spawnDelay) {
        createStar();
        lastSpawn = now;
        spawnDelay = randomDelay();
      }

      stars.forEach((star, i) => {
        drawStar(star);

        if (
          star.opacity <= 0 ||
          star.length <= 0 ||
          star.x > width + 100 ||
          star.y > height + 100
        ) {
          stars.splice(i, 1);
        }
      });

      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
        zIndex: -1, // ⭐ Behind everything
      }}
    />
  );
};

export default ShootingStar;
