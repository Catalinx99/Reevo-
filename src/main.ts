import "./style.css";

import { Circle } from "./shapes/Circle";
import { Square } from "./shapes/Square";
import { Triangle } from "./shapes/Triangle";
import { Pentagon } from "./shapes/Pentagon";
import { Hexagon } from "./shapes/Hexagon";
import { Ellipse } from "./shapes/Ellipse";
import { Star } from "./shapes/Star";
import { ShapeManager } from "./shapes/ShapeManager";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const shapeManager = new ShapeManager();
let gravity = 2;
let shapesPerSecond = 1;
let lastShapeTime = 0;

// Set up canvas masking
ctx.save();

shapeManager.addShape(new Circle(100, 100, "red", gravity, 20));

function animate(currentTime: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.clip();

  shapeManager.updateShapes();
  shapeManager.drawShapes(ctx);

  ctx.restore();

  document.getElementById("numShapes")!.textContent =
    shapeManager.shapes.length.toString();
  document.getElementById("totalArea")!.textContent = shapeManager
    .getTotalArea()
    .toFixed(0);

  if (currentTime - lastShapeTime >= 1000 / shapesPerSecond) {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = -50; // Start above canvas
    shapeManager.addShape(getRandomShape(x, y, gravity));
    lastShapeTime = currentTime;
  }

  requestAnimationFrame(animate);
}

animate(0);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomShape(x: number, y: number, gravity: number) {
  const shapeType = Math.floor(Math.random() * 7);
  const size = 20 + Math.random() * 20;
  const color = getRandomColor();

  switch (shapeType) {
    case 0:
      return new Triangle(x, y, color, gravity, size); // 3 sides
    case 1:
      return new Square(x, y, color, gravity, size); // 4 sides
    case 2:
      return new Pentagon(x, y, color, gravity, size); // 5 sides
    case 3:
      return new Hexagon(x, y, color, gravity, size); // 6 sides
    case 4:
      return new Circle(x, y, color, gravity, size / 2); // Circle
    case 5:
      return new Ellipse(x, y, color, gravity, size / 2, size / 3); // Ellipse
    case 6:
      return new Star(x, y, color, gravity, size / 2); // Star
    default:
      return new Circle(x, y, color, gravity, size / 2);
  }
}

function handlePointerEvent(clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = (clientX - rect.left) * scaleX;
  const mouseY = (clientY - rect.top) * scaleY;

  const shapeClicked = shapeManager.shapes.find((shape) =>
    shape.isClicked(mouseX, mouseY)
  );

  if (shapeClicked) {
    shapeManager.removeShape(shapeClicked);
  } else {
    shapeManager.addShape(getRandomShape(mouseX, mouseY, gravity));
  }
}

canvas.addEventListener("click", (e) => {
  handlePointerEvent(e.clientX, e.clientY);
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  handlePointerEvent(touch.clientX, touch.clientY);
});

document.getElementById("decreaseFreq")?.addEventListener("click", () => {
  if (shapesPerSecond > 0.1) {
    shapesPerSecond = Math.max(0.1, shapesPerSecond - 0.1);
    document.getElementById("freqValue")!.textContent =
      shapesPerSecond.toFixed(1);
  }
});

document.getElementById("increaseFreq")?.addEventListener("click", () => {
  if (shapesPerSecond < 10) {
    shapesPerSecond = Math.min(10, shapesPerSecond + 0.1);
    document.getElementById("freqValue")!.textContent =
      shapesPerSecond.toFixed(1);
  }
});

document.getElementById("decreaseGrav")?.addEventListener("click", () => {
  if (gravity > 0.1) {
    gravity = Math.max(0.1, gravity - 0.1);
    document.getElementById("gravValue")!.textContent = gravity.toFixed(1);
    shapeManager.shapes.forEach((shape) => (shape.gravity = gravity));
  }
});

document.getElementById("increaseGrav")?.addEventListener("click", () => {
  if (gravity < 20) {
    gravity = Math.min(20, gravity + 0.1);
    document.getElementById("gravValue")!.textContent = gravity.toFixed(1);
    shapeManager.shapes.forEach((shape) => (shape.gravity = gravity));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const freqElement = document.getElementById("freqValue");
  const gravElement = document.getElementById("gravValue");

  if (freqElement) freqElement.textContent = shapesPerSecond.toFixed(1);
  if (gravElement) gravElement.textContent = gravity.toFixed(1);
});

const freqElement = document.getElementById("freqValue");
const gravElement = document.getElementById("gravValue");

if (freqElement) freqElement.textContent = shapesPerSecond.toFixed(1);
if (gravElement) gravElement.textContent = gravity.toFixed(1);

let holdInterval: number | null = null;
let holdTimeout: number | null = null;

function startHold(action: () => void) {
  action();

  holdTimeout = window.setTimeout(() => {
    holdInterval = window.setInterval(action, 100);
  }, 500);
}

function stopHold() {
  if (holdTimeout) {
    clearTimeout(holdTimeout);
    holdTimeout = null;
  }
  if (holdInterval) {
    clearInterval(holdInterval);
    holdInterval = null;
  }
}

const decreaseFreqBtn = document.getElementById("decreaseFreq");
const increaseFreqBtn = document.getElementById("increaseFreq");
const decreaseGravBtn = document.getElementById("decreaseGrav");
const increaseGravBtn = document.getElementById("increaseGrav");

decreaseFreqBtn?.addEventListener("mousedown", () => {
  startHold(() => {
    if (shapesPerSecond > 0.1) {
      shapesPerSecond = Math.max(0.1, shapesPerSecond - 0.1);
      document.getElementById("freqValue")!.textContent =
        shapesPerSecond.toFixed(1);
    }
  });
});

decreaseFreqBtn?.addEventListener("mouseup", stopHold);
decreaseFreqBtn?.addEventListener("mouseleave", stopHold);

decreaseFreqBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startHold(() => {
    if (shapesPerSecond > 0.1) {
      shapesPerSecond = Math.max(0.1, shapesPerSecond - 0.1);
      document.getElementById("freqValue")!.textContent =
        shapesPerSecond.toFixed(1);
    }
  });
});

decreaseFreqBtn?.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopHold();
});

increaseFreqBtn?.addEventListener("mousedown", () => {
  startHold(() => {
    if (shapesPerSecond < 10) {
      shapesPerSecond = Math.min(10, shapesPerSecond + 0.1);
      document.getElementById("freqValue")!.textContent =
        shapesPerSecond.toFixed(1);
    }
  });
});

increaseFreqBtn?.addEventListener("mouseup", stopHold);
increaseFreqBtn?.addEventListener("mouseleave", stopHold);

increaseFreqBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startHold(() => {
    if (shapesPerSecond < 10) {
      shapesPerSecond = Math.min(10, shapesPerSecond + 0.1);
      document.getElementById("freqValue")!.textContent =
        shapesPerSecond.toFixed(1);
    }
  });
});

increaseFreqBtn?.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopHold();
});

// Decrease gravity
decreaseGravBtn?.addEventListener("mousedown", () => {
  startHold(() => {
    if (gravity > 0.1) {
      gravity = Math.max(0.1, gravity - 0.1);
      document.getElementById("gravValue")!.textContent = gravity.toFixed(1);
      shapeManager.shapes.forEach((shape) => (shape.gravity = gravity));
    }
  });
});

decreaseGravBtn?.addEventListener("mouseup", stopHold);
decreaseGravBtn?.addEventListener("mouseleave", stopHold);

decreaseGravBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startHold(() => {
    if (gravity > 0.1) {
      gravity = Math.max(0.1, gravity - 0.1);
      document.getElementById("gravValue")!.textContent = gravity.toFixed(1);
      shapeManager.shapes.forEach((shape) => (shape.gravity = gravity));
    }
  });
});

decreaseGravBtn?.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopHold();
});

// Increase gravity
increaseGravBtn?.addEventListener("mousedown", () => {
  startHold(() => {
    if (gravity < 20) {
      gravity = Math.min(20, gravity + 0.1);
      document.getElementById("gravValue")!.textContent = gravity.toFixed(1);
      shapeManager.shapes.forEach((shape) => (shape.gravity = gravity));
    }
  });
});

increaseGravBtn?.addEventListener("mouseup", stopHold);
increaseGravBtn?.addEventListener("mouseleave", stopHold);

increaseGravBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startHold(() => {
    if (gravity < 20) {
      gravity = Math.min(20, gravity + 0.1);
      document.getElementById("gravValue")!.textContent = gravity.toFixed(1);
      shapeManager.shapes.forEach((shape) => (shape.gravity = gravity));
    }
  });
});

increaseGravBtn?.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopHold();
});

const themeToggle = document.getElementById("themeToggle") as HTMLInputElement;
const body = document.body;

const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  body.setAttribute("data-theme", "light");
  themeToggle.checked = true;
}

themeToggle?.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  }
});
