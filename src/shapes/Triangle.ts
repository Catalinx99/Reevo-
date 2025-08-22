import { Shape } from "./Shape";

export class Triangle extends Shape {
  size: number;

  constructor(
    x: number,
    y: number,
    color: string,
    gravity: number,
    size: number
  ) {
    super(x, y, color, gravity);
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size / 2);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
    ctx.closePath();
    ctx.fill();
  }

  getArea(): number {
    return (Math.sqrt(3) / 4) * this.size * this.size;
  }

  isClicked(mouseX: number, mouseY: number): boolean {
    return (
      mouseX >= this.x - this.size / 2 &&
      mouseX <= this.x + this.size / 2 &&
      mouseY >= this.y - this.size / 2 &&
      mouseY <= this.y + this.size / 2
    );
  }
}
