import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import './Placed.css';

const Placed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🎉 Two bursts from left & right
    const duration = 1.5 * 1000;
    const animationEnd = Date.now() + duration;

    const defaults = { startVelocity: 90, spread: 100, ticks: 60, zIndex: 1000 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Left side burst
      confetti({
        ...defaults,
        particleCount: 20,
        origin: { x: 0, y: 1 }, // bottom-left
        angle: randomInRange(60, 90)
      });

      // Right side burst
      confetti({
        ...defaults,
        particleCount: 20,
        origin: { x: 1, y: 1 }, // bottom-right
        angle: randomInRange(90, 120)
      });
    }, 200);
  }, []);

  return (
    <div className="placed">
      <h1>🎉 Yeah! Your order has been placed successfully!</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Placed;
