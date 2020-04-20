import React from "react";
import { resourceContext } from "./context";

export const useResourceStore = () => React.useContext(resourceContext);
