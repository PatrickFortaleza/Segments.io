export interface DonutTotals {
  totalNumber: number;
  totalPercentage: number;
}

export interface DonutValue {
  num: number;
  color: string;
  key: string;
  label: string;
}

export interface DonutState extends DonutValue {
  radius: number;
  circumference: number;
  percentage: number;
  rotate: number;
  initialStrokeDasharray: string;
  computedStrokeDasharray: string;
}

export interface DonutValuesHashmap {
  [id: string]: DonutState;
}