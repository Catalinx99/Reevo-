import { Shape } from "./Shape";

export class ShapeManager {
  shapes: Shape[] = [];

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  removeShape(shape: Shape) {
    this.shapes = this.shapes.filter((s) => s !== shape);
  }

  updateShapes() {
    this.shapes.forEach((s) => s.update());
  }

  drawShapes(ctx: CanvasRenderingContext2D) {
    this.shapes.forEach((s) => s.draw(ctx));
  }

  getTotalArea(): number {
    return this.shapes.reduce((sum, s) => sum + s.getArea(), 0);
  }
}
