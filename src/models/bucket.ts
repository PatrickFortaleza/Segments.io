export interface Bucket {
  label: string;
  id: string;
  rules: Array<any>; // define any after rule data has been defined
  ref: HTMLElement | null;
  itemInZone: boolean;
}

export interface BucketContainer {
  includes: Array<Bucket>;
  excludes: Array<Bucket>;
}
