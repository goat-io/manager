import { types, Instance } from "mobx-state-tree";

export const Validation = types.model("Validation", {
  required: types.maybe(types.boolean),
  minLength: types.maybe(types.string),
  maxLength: types.maybe(types.string),
  pattern: types.maybe(types.string),
  custom: types.maybe(types.string),
  customPrivate: types.maybe(types.boolean)
});

export type ValidationType = Instance<typeof Validation>;
