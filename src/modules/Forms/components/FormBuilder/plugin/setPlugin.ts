import { Form } from "../../../../../api/Form";
import { loopbackGetPlugin } from "./requestPlugin";
import Formio from "formiojs/Formio";

export const setPlugin = async (path: string | undefined, model: any) => {
  let localForms = await Form.all();

  localForms = localForms.reduce((r: any, form: any) => {
    r[form.id] = form.path;
    return r;
  }, {});
  const plugin = loopbackGetPlugin(
    localForms,
    model,
    {},
    String(process.env.REACT_APP_FLUENT_BASE_URL),
    String(process.env.REACT_APP_FLUENT_BASE_URL)
  );

  Formio.setBaseUrl(String(process.env.REACT_APP_FLUENT_BASE_URL));
  Formio.registerPlugin(plugin, `moveCallsToLoopback_${path}`);
};
