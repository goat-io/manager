import React from "react";
import { ResourceStore } from "./ResourceStore";

export const resourceContext = React.createContext({
  resourceStore: ResourceStore.create()
});
