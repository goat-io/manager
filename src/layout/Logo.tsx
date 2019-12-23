import React from "react";
import Hamburger from "react-hamburgers";
import AppMobileMenu from "./MobileMenu";
import { observer, useObserver } from "mobx-react";
import { useThemeStore } from "../modules/UI/stores/theme/useThemeStore";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    drawerOpen: themeStore.drawerOpen,
    toggleDrawer: themeStore.toggleDrawer
  }));
};

const HeaderLogo = observer(() => {
  const { drawerOpen, toggleDrawer } = useThemeData();

  return (
    <>
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div onClick={toggleDrawer}>
            <Hamburger active={drawerOpen} type="elastic" />
          </div>
        </div>
      </div>
      <AppMobileMenu />
    </>
  );
});

export default HeaderLogo;
