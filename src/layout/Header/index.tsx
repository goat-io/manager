import React from "react";
import cx from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import HeaderLogo from "../Logo";
import SearchBox from "./Components/SearchBox";
// import UserBox from "./Components/UserBox";

import { useThemeStore } from "../../modules/UI/stores/theme/useThemeStore";
import { observer, useObserver } from "mobx-react";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    headerBackgroundColor: themeStore.headerBackgroundColor,
    enableMobileMenuSmall: themeStore.enableMobileMenuSmall,
    enableHeaderShadow: themeStore.enableHeaderShadow
  }));
};

const Header = observer(() => {
  let {
    headerBackgroundColor,
    enableMobileMenuSmall,
    enableHeaderShadow
  } = useThemeData();

  return (
    <>
      <ReactCSSTransitionGroup
        component="div"
        className={cx("app-header", headerBackgroundColor, {
          "header-shadow": enableHeaderShadow
        })}
        transitionName="HeaderAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <HeaderLogo />

        <div
          className={cx("app-header__content", {
            "header-mobile-open": enableMobileMenuSmall
          })}
        >
          <div className="app-header-left">
            <SearchBox />
          </div>
          <div className="app-header-right">{/*<UserBox />*/}</div>
        </div>
      </ReactCSSTransitionGroup>
    </>
  );
});

export default Header;
