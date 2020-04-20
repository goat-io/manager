import React from "react";
import { themeContext } from "./context";

export const useThemeStore = () => React.useContext(themeContext);
