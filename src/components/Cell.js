class Cell {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.visited = false;
  }

  show() {
    const x = this.x * mazeConfig.cube_size;
    const z = this.z * mazeConfig.cube_size;
  }
}

export default Cell;
