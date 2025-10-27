export interface T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TotalCounter {
  total?: number;
}

export interface CommonInput {
  page: number;
  limit: number;
}
