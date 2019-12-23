import { types, Instance } from "mobx-state-tree";

export const Values = types.model("Values", {
  value: types.maybe(
    types.union(types.string, types.array(types.string), types.boolean)
  ),
  label: types.maybe(
    types.union(types.string, types.array(types.string), types.boolean)
  )
});

export type ValuesType = Instance<typeof Values>;

export const Headers = types.model("Headers", {
  value: types.maybe(types.string),
  key: types.maybe(types.string)
});
export type HeadersType = Instance<typeof Headers>;

export const Data = types.model("DataType", {
  json: types.maybe(types.string),
  url: types.maybe(types.string),
  resource: types.maybe(types.string),
  custom: types.maybe(types.string),
  values: types.array(Values),
  headers: types.array(Headers)
});
