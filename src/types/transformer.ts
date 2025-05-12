import type {
  ParseAbiItem,
  AbiEvent,
  AbiEventParameterToPrimitiveType,
  AbiParameter,
} from "viem";

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type IsCallable<T> = T extends (...args: any[]) => any ? true : false;

type IsPlainObject<T> = T extends object
  ? IsCallable<T> extends true
    ? false
    : T extends readonly any[] // arrays and tuples
      ? false
      : true
  : false;

export type LeafPaths<T, D extends number = 5> = [D] extends [never]
  ? never
  : {
      [K in keyof T & string]: IsPlainObject<T[K]> extends true
        ? `${K}.${LeafPaths<T[K], Prev[D]>}`
        : K;
    }[keyof T & string];

type FieldTransform<TValue, TItem> = (args: {
  value: TValue;
  item: TItem;
}) => any;

type DeepTransformMap<T extends readonly AbiParameter[], TContext> = {
  [P in T[number] as P extends { name: string }
    ? P["name"]
    : never]: P extends {
    type: `${string}[]`;
    components: readonly AbiParameter[];
  }
    ? DeepTransformMap<P["components"], TContext>
    : P extends { type: "tuple"; components: readonly AbiParameter[] }
      ? DeepTransformMap<P["components"], TContext>
      : FieldTransform<AbiEventParameterToPrimitiveType<P>, any>;
};

export type EventTransformSchema<TEvent extends AbiEvent> = {
  [P in TEvent["inputs"][number] as P["name"] extends string
    ? P["name"]
    : never]: P extends {
    type: `${string}[]`;
    components: readonly AbiParameter[];
  }
    ? DeepTransformMap<P["components"], EventTransformSchema<TEvent>>
    : P extends { type: "tuple"; components: readonly AbiParameter[] }
      ? DeepTransformMap<P["components"], EventTransformSchema<TEvent>>
      : FieldTransform<
          AbiEventParameterToPrimitiveType<P>,
          EventTransformSchema<TEvent>
        >;
};

export type ExtractEvent<T extends string> =
  ParseAbiItem<T> extends infer R ? (R extends AbiEvent ? R : never) : never;
