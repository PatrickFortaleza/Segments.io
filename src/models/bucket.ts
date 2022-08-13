import { dCondition } from "./condition";

export interface Bucket {
  id: number;
  type: string;
}

export interface BucketHashmap {
  [id: number]: Bucket;
}

export interface dBucket {
  [type: string]: Array<dCondition>;
}

export interface BucketRefs {
  [id: string]: any;
}
