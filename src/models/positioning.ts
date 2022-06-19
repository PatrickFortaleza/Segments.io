// import { MouseEvent } from "react";

export interface Coordinates {
  x: number;
  y: number;
}

export interface RectCoordinates {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface DragTransition {
  dragging: boolean;
  transitioning: boolean;
}
