import { Fluent } from "@goatlab/fluent";

export const Form = Fluent.model("Form", {
  remote: {
    path: "form",
    pullForm: true
  }
});
