import { Fluent } from "@goatlab/fluent";
import { Loopback } from "@goatlab/fluent/dist/Providers/Loopback/LoopbackConnector";

const BackendConnector = {
  baseUrl: String(process.env.REACT_APP_FLUENT_BASE_URL),
  connector: Loopback,
  default: true,
  name: "backend"
};

new Fluent().config({
  LOCAL_CONNECTORS: [],
  MERGE_CONNECTORS: [],
  REMOTE_CONNECTORS: [BackendConnector]
});

export const config = async () => {
  /*
    const { config, translations } = await GOAT.start({
    appConf: initialConfig
  });
  */
};
