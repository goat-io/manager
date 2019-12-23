import { types } from "mobx-state-tree";

export const Property = types.model("Property", {
  search: types.maybe(types.string)
});
