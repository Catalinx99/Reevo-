import { Shape } from "./Shape";

export class Circle extends Shape {
  radius: number;

  constructor(
    x: number,
    y: number,
    color: string,
    gravity: number,
    radius: number
  ) {
    super(x, y, color, gravity);
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  // aici înlocuiești metoda isClicked din Shape
  isClicked(mouseX: number, mouseY: number): boolean {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
}
