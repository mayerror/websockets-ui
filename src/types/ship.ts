class Ship {
  position: { x: number; y: number };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";

  constructor(
    position = { x: 0, y: 0 },
    direction = true,
    length = 1,
    type: "small" | "medium" | "large" | "huge" = "small"
  ) {
    this.position = position;
    this.direction = direction;
    this.length = length;
    this.type = type;
  }
}

export default Ship;
