import { LoopbackConnector } from "@goatlab/fluent/dist/Providers/Loopback/LoopbackConnector";

export const Env = new LoopbackConnector({
  baseEndPoint: `${String(process.env.REACT_APP_FLUENT_BASE_URL)}/env`,
});
