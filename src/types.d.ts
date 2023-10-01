declare type Partition<T> = {
  [P in keyof T]?: Partition<T[P]>;
};

declare type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
