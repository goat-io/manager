import { types } from "mobx-state-tree";

export const Template = types.model("Template", {
  header: types.maybe(types.string),
  row: types.maybe(types.string),
  footer: types.maybe(types.string)
});
