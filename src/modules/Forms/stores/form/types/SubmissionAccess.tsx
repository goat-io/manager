import { types, Instance } from "mobx-state-tree";

export const SubmissionAccess = types.model("SubmissionAccess", {
  roles: types.optional(types.array(types.string), []),
  type: types.string
});

export type SubmissionAccessType = Instance<typeof SubmissionAccess>;
