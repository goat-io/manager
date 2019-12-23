import { GOAT } from "@goatlab/goatjs";
import initialConfig from "../../.goat/config";

export default async () => {
  // eslint-disable-next-line
  const { config, translations } = await GOAT.start({
    appConf: initialConfig
  });
};
