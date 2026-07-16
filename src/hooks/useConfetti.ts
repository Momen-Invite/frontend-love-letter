"use client";

import { useCallback } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  r: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  size: number;
  shape: "circle" | "square" | "triangle" | "star";
  opacity: number;
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  piece: ConfettiPiece
): void {
  ctx.save();
  ctx.translate(piece.x, piece.y);
  ctx.rotate((piece.rotation * Math.PI) / 180);
  ctx.globalAlpha = piece.opacity;
  ctx.fillStyle = piece.color;

  const s = piece.size;

  switch (piece.shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "square":
      ctx.fillRect(-s / 2, -s / 2, s, s);
      break;
    case "triangle":
      ctx.beginPath();
      ctx.moveTo(0, -s / 2);
      ctx.lineTo(-s / 2, s / 2);
      ctx.lineTo(s / 2, s / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case "star": {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const method = i === 0 ? "moveTo" : "lineTo";
        ctx[method](
          Math.cos(angle) * s / 2,
          Math.sin(angle) * s / 2
        );
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

export function useConfetti() {
  const fire = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "#d4899a",
      "#a84f65",
      "#c9a96e",
      "#f0d4dc",
      "#ff6b9d",
      "#ffd700",
      "#ff85a2",
      "#ffb6c1",
      "#dda0dd",
      "#f4a460",
    ];
    const shapes: ConfettiPiece["shape"][] = [
      "circle",
      "square",
      "triangle",
      "star",
    ];

    const pieces: ConfettiPiece[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height * 0.5 - 20,
      r: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      speedX: (Math.random() - 0.5) * 6,
      speedY: Math.random() * 3 + 2,
      size: Math.random() * 10 + 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 1,
    }));

    let frameCount = 0;
    const maxFrames = 200;

    function animate() {
      if (!ctx) return;
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const piece of pieces) {
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.speedY += 0.05; // gravity
        piece.rotation += piece.rotationSpeed;
        piece.speedX *= 0.99;

        if (frameCount > maxFrames * 0.6) {
          piece.opacity -= 0.02;
        }

        if (piece.opacity > 0 && piece.y < canvas.height + 50) {
          alive = true;
          drawShape(ctx, piece);
        }
      }

      if (alive && frameCount < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }

    animate();
  }, []);

  return fire;
}
