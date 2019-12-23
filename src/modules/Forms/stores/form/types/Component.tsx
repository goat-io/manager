import { types, Instance } from "mobx-state-tree";
import { Validation } from "./Validation";
import { Condition } from "./Condition";
import { Data, Values } from "./Data";
import { Template } from "./Template";
import { Property } from "./Property";

export const Component: any = types.model("Component", {
  id: types.maybe(types.union(types.string, types.null)),
  dataSrc: types.maybe(types.string),
  valueProperty: types.maybe(types.string),
  refreshOn: types.maybe(types.string),
  filter: types.maybe(types.string),
  authenticate: types.maybe(types.boolean),
  autofocus: types.maybe(types.boolean),
  input: types.maybe(types.boolean),
  lockKey: types.maybe(types.boolean),
  inDataGrid: types.maybe(types.boolean),
  tree: types.maybe(types.boolean),
  block: types.maybe(types.boolean),
  tableView: types.maybe(types.boolean),
  inputType: types.maybe(types.string),
  inputMask: types.maybe(types.string),
  disableOnInvalid: types.maybe(types.boolean),
  mask: types.maybe(types.boolean),
  label: types.maybe(types.string),
  key: types.maybe(types.string),
  placeholder: types.maybe(types.string),
  prefix: types.maybe(types.string),
  suffix: types.maybe(types.string),
  multiple: types.maybe(types.boolean),
  defaultValue: types.maybe(
    types.union(
      types.string,
      types.null,
      types.number,
      types.boolean,
      types.array(types.string),
      types.array(types.number),
      types.array(types.boolean),
      types.array(types.null),
      Values,
      types.array(Values)
    )
  ),
  protected: types.maybe(types.boolean),
  unique: types.maybe(types.boolean),
  persistent: types.maybe(types.boolean),
  hidden: types.maybe(types.boolean),
  clearOnHide: types.maybe(types.boolean),
  spellcheck: types.maybe(types.boolean),
  validate: types.maybe(Validation),
  conditional: types.maybe(Condition),
  type: types.maybe(types.string),
  labelPosition: types.maybe(types.string),
  inputFormat: types.maybe(types.string),
  tags: types.union(types.array(types.string), types.string, types.undefined),
  size: types.maybe(types.string),
  leftIcon: types.maybe(types.string),
  rightIcon: types.maybe(types.string),
  theme: types.maybe(types.string),
  action: types.maybe(types.string),
  tabindex: types.maybe(types.string),
  calculateValue: types.maybe(types.string),
  addAnotherPosition: types.maybe(types.string),
  source: types.maybe(types.string),
  shortcut: types.maybe(types.string),
  template: types.maybe(types.string),
  searchField: types.maybe(types.string),
  reference: types.maybe(types.boolean),
  limit: types.maybe(types.union(types.string, types.number)),
  rows: types.maybe(types.number),
  wysiwyg: types.maybe(types.boolean),
  data: types.maybe(Data),
  components: types.maybe(types.array(types.late(() => Component))),
  templates: types.maybe(Template),
  properties: types.maybe(Property),
  values: types.maybe(
    types.union(
      types.string,
      types.null,
      types.number,
      types.boolean,
      types.array(types.string),
      types.array(types.number),
      types.array(types.boolean),
      types.array(types.null),
      Values,
      types.array(Values)
    )
  )
});
export type ComponentType = Instance<typeof Component>;
