import { ResourceType } from "../../stores/form/types/Resource";

export const defaultForm: ResourceType = {
  _id: "",
  title: "",
  name: "",
  path: "",
  type: "resource",
  display: "form",
  machineName: "",
  action: "",
  tags: [""],
  deleted: 0,
  access: [],
  submissionAccess: [],
  owner: "",
  components: [],
  settings: 0,
  properties: 0,
  created: "",
  modified: ""
};
