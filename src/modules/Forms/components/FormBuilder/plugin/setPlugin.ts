import { Form, Submission } from "@goatlab/goatjs";
import { loopbackGetPlugin } from "./requestPlugin";
import Formio from "formiojs/Formio";

export const setPlugin = async (path: string | undefined) => {
  let localForms = await Form.local().get();
  localForms = localForms.reduce((r: any, form: any) => {
    r[form.data._id] = form.data.path;
    return r;
  }, {});
  const plugin = loopbackGetPlugin(
    localForms,
    Submission,
    {},
    "http://127.0.0.1:3000/api",
    "http://127.0.0.1:3000/api"
  );
  Formio.setBaseUrl("http://127.0.0.1:3000/api");
  Formio.registerPlugin(plugin, `moveCallsToLoopback_${path}`);
};
