import { Submission } from "../../../../../api/Submission";
import { Form } from "../../../../../api/Form";
import { loopbackGetPlugin } from "./requestPlugin";
import Formio from "formiojs/Formio";

export const setPlugin = async (path: string | undefined) => {
  let localForms = await Form.remote().all();

  localForms = localForms.reduce((r: any, form: any) => {
    r[form._id] = form.path;
    return r;
  }, {});
  const plugin = loopbackGetPlugin(
    localForms,
    Submission,
    {},
    String(process.env.REACT_APP_FLUENT_BASE_URL),
    String(process.env.REACT_APP_FLUENT_BASE_URL)
  );

  Formio.setBaseUrl(String(process.env.REACT_APP_FLUENT_BASE_URL));
  Formio.registerPlugin(plugin, `moveCallsToLoopback_${path}`);
};
