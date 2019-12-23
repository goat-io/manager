import { types, Instance } from "mobx-state-tree";

export const Condition = types.model("Condition", {
  show: types.union(types.string, types.boolean, types.null, types.undefined),
  when: types.union(types.string, types.boolean, types.null, types.undefined),
  eq: types.union(types.string, types.boolean, types.null, types.undefined)
});

export type ConditionType = Instance<typeof Condition>;
