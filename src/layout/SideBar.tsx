import React from "react";
import cx from "classnames";
import Nav from "./NavBar/VerticalNavWrapper";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PerfectScrollbar from "react-perfect-scrollbar";
import HeaderLogo from "./Logo";
import { useThemeStore } from "../modules/UI/stores/theme/useThemeStore";
import { observer, useObserver } from "mobx-react";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    backgroundColor: themeStore.backgroundColor,
    enableBackgroundImage: themeStore.enableBackgroundImage,
    toggleMobileSidebar: themeStore.toggleMobileSidebar,
    enableSidebarShadow: themeStore.enableSidebarShadow,
    backgroundImage: themeStore.backgroundImage,
    backgroundImageOpacity: themeStore.backgroundImageOpacity
  }));
};

const AppSidebar = observer(() => {
  let {
    toggleMobileSidebar,
    backgroundColor,
    enableSidebarShadow,
    backgroundImageOpacity
  } = useThemeData();

  return (
    <>
      <div className="sidebar-mobile-overlay" onClick={toggleMobileSidebar} />
      <ReactCSSTransitionGroup
        component="div"
        className={cx("app-sidebar", backgroundColor, {
          "sidebar-shadow": enableSidebarShadow
        })}
        transitionName="SidebarAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <HeaderLogo />
        <PerfectScrollbar>
          <div className="app-sidebar__inner">
            <Nav />
          </div>
        </PerfectScrollbar>
        <div className={cx("app-sidebar-bg", backgroundImageOpacity)}></div>
      </ReactCSSTransitionGroup>
    </>
  );
});

export default AppSidebar;
