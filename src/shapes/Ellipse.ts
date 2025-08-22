import { Shape } from "./Shape";

export class Ellipse extends Shape {
  radiusX: number;
  radiusY: number;

  constructor(
    x: number,
    y: number,
    color: string,
    gravity: number,
    radiusX: number,
    radiusY: number
  ) {
    super(x, y, color, gravity);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  getArea(): number {
    return Math.PI * this.radiusX * this.radiusY;
  }

  isClicked(mouseX: number, mouseY: number): boolean {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    return (
      (dx * dx) / (this.radiusX * this.radiusX) +
        (dy * dy) / (this.radiusY * this.radiusY) <=
      1
    );
  }
}
