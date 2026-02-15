"use client";

import { useEffect, useRef } from "react";
import "./login.css";

export default function LoginPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;
    const squareSize = 80;

    let grid: {
      x: number;
      y: number;
      alpha: number;
      fading: boolean;
      lastTouched: number;
    }[] = [];

    // 🔹 Initialize grid
    function initGrid() {
      grid = [];
      for (let x = 0; x < width; x += squareSize) {
        for (let y = 0; y < height; y += squareSize) {
          grid.push({ x, y, alpha: 0, fading: false, lastTouched: 0 });
        }
      }
    }

    // 🔹 High DPI Canvas Resize
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);

      initGrid();
    }

    // 🔹 Find cell under mouse
    function getCellAt(x: number, y: number) {
      const cellX = Math.floor(x / squareSize) * squareSize;
      const cellY = Math.floor(y / squareSize) * squareSize;
      return grid.find((c) => c.x === cellX && c.y === cellY);
    }

    // 🔹 Mouse move
    function handleMouseMove(e: MouseEvent) {
      const cell = getCellAt(e.clientX, e.clientY);
      if (cell && cell.alpha === 0) {
        cell.alpha = 1;
        cell.lastTouched = Date.now();
        cell.fading = false;
      }
    }

    // 🔹 Draw the grid
    function drawGrid() {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      grid.forEach((cell) => {
        if (cell.alpha > 0 && !cell.fading && now - cell.lastTouched > 500) {
          cell.fading = true;
        }

        if (cell.fading) {
          cell.alpha -= 0.02;
          if (cell.alpha <= 0) {
            cell.alpha = 0;
            cell.fading = false;
          }
        }

        if (cell.alpha > 0) {
          const cx = cell.x + squareSize / 2;
          const cy = cell.y + squareSize / 2;

          const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, squareSize);
          gradient.addColorStop(0, `rgba(0,255,204,${cell.alpha})`);
          gradient.addColorStop(1, `rgba(0,255,204,0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.3;
          ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, squareSize - 1, squareSize - 1);
        }
      });

      requestAnimationFrame(drawGrid);
    }

    // 🔹 Initial setup
    resizeCanvas();
    drawGrid();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="login-container">
      <canvas ref={canvasRef}></canvas>
    

      <div className="login-box">
        <h2>Login</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </div>
    </div>
  );
}
