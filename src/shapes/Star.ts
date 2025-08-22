import { Shape } from "./Shape";

export class Star extends Shape {
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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    const spikes = 5;
    const outerRadius = this.radius;
    const innerRadius = this.radius * 0.4;

    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
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
    const outerRadius = this.radius;
    const innerRadius = this.radius * 0.4;
    return (5 * outerRadius * innerRadius * Math.sin(Math.PI / 5)) / 2;
  }

  isClicked(mouseX: number, mouseY: number): boolean {
    const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    return distance <= this.radius;
  }
}
