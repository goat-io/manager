import { types, Instance } from "mobx-state-tree";
import { SubmissionAccess } from "./SubmissionAccess";

export const Resource = types.model("Resource", {
  id: types.maybe(types.string),
  type: types.maybe(types.string),
  tags: types.maybe(types.union(types.array(types.string), types.string)),
  components: types.union(types.string, types.undefined),
  title: types.maybe(types.string),
  display: types.maybe(types.string),
  action: types.maybe(types.string),
  name: types.maybe(types.string),
  path: types.maybe(types.string),
  machineName: types.maybe(types.string),
  created: types.maybe(types.string),
  modified: types.maybe(types.string),
  owner: types.union(types.maybe(types.string), types.null),
  deleted: types.maybe(types.union(types.number, types.undefined)),
  settings: types.union(types.maybe(types.number), types.null),
  properties: types.maybe(types.number),
  access: types.maybe(
    types.union(types.array(SubmissionAccess), types.array(types.string))
  ),
  submissionAccess: types.maybe(
    types.union(types.array(SubmissionAccess), types.array(types.string))
  ),
});

export type ResourceType = Instance<typeof Resource>;
