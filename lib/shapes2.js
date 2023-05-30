class Triangle {
    constructor(base, height) {
      this.base = base;
      this.height = height;
    }
  
    getArea() {
      return 0.5 * this.base * this.height;
    }
  }
  
  class Circle {
    constructor(radius) {
      this.radius = radius;
    }
  
    getArea() {
      return Math.PI * Math.pow(this.radius, 2);
    }
  }
  
  class Square {
    constructor(side) {
      this.side = side;
    }
  
    getArea() {
      return Math.pow(this.side, 2);
    }
  }
  
  module.exports = {
    Triangle,
    Circle,
    Square
  };