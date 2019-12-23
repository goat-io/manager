import React from "react";
import { ThemeStore } from "./ThemeStore";

export const themeContext = React.createContext({
  themeStore: ThemeStore.create()
});
