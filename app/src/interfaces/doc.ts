export interface Doc<T> {
  _id: string;
  type: string;
  data: T;
}
