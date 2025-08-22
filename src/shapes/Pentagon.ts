import { Shape } from "./Shape";

export class Pentagon extends Shape {
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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    const sides = 5;
    const radius = this.size / 2;

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = this.x + radius * Math.cos(angle);
      const y = this.y + radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fill();
  }

  getArea(): number {
    const radius = this.size / 2;
    return (5 * radius * radius * Math.sin((2 * Math.PI) / 5)) / 2;
  }

  isClicked(mouseX: number, mouseY: number): boolean {
    const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    return distance <= this.size / 2;
  }
}
