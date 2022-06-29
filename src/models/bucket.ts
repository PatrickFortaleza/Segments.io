export interface Bucket {
  id: number;
  type: string;
}

export interface BucketHashmap {
  [id: number]: Bucket;
}
