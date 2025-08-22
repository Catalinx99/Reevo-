export abstract class Shape {
  x: number;
  y: number;
  color: string;
  gravity: number;

  constructor(x: number, y: number, color: string, gravity: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.gravity = gravity;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract getArea(): number;

  update() {
    this.y += this.gravity;
  }

  isClicked(mouseX: number, mouseY: number): boolean {
    return (
      mouseX >= this.x - 20 &&
      mouseX <= this.x + 20 &&
      mouseY >= this.y - 20 &&
      mouseY <= this.y + 20
    );
  }
}
