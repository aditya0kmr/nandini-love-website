/**
 * Sparkle and confetti effects for dream drops and celebrations
 */

export function createSparkles(x: number, y: number, count = 20) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("div");
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 2 + Math.random() * 4;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    const size = 4 + Math.random() * 6;
    const duration = 0.6 + Math.random() * 0.4;

    sparkle.style.position = "absolute";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    sparkle.style.borderRadius = "50%";
    sparkle.style.backgroundColor = "#ff9a9e";
    sparkle.style.boxShadow = "0 0 10px #ff4b8b";
    sparkle.style.animation = `sparkleFloat ${duration}s ease-out forwards`;
    sparkle.style.setProperty("--tx", vx * 80 + "px");
    sparkle.style.setProperty("--ty", vy * 80 + "px");

    container.appendChild(sparkle);
  }

  setTimeout(() => {
    container.remove();
  }, 1200);
}

// Heart particles
export function createHearts(x: number, y: number, count = 15) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const velocity = 1.5 + Math.random() * 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 0.5; // bias upward
    const duration = 1 + Math.random() * 0.5;

    heart.innerHTML = "❤";
    heart.style.position = "absolute";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = "20px";
    heart.style.opacity = "1";
    heart.style.animation = `heartFloat ${duration}s ease-in forwards`;
    heart.style.setProperty("--tx", vx * 60 + "px");
    heart.style.setProperty("--ty", vy * 100 + "px");

    container.appendChild(heart);
  }

  setTimeout(() => {
    container.remove();
  }, 1600);
}

// Create CSS animations dynamically
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes sparkleFloat {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(0);
        opacity: 0;
      }
    }
    @keyframes heartFloat {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(0.3);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
