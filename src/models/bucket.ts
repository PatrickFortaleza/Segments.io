export interface Bucket {
  label: string;
  id: string;
  rules: Array<any>; // define any after rule data has been defined
  itemInZone: boolean;
  conditionLogic: string;
}

export interface BucketWithType extends Bucket {
  type: string;
  index: number;
}

export interface BucketContainer {
  includes: Array<Bucket>;
  excludes: Array<Bucket>;
}
