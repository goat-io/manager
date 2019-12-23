import React from "react";
import Hamburger from "react-hamburgers";
import cx from "classnames";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import { useThemeStore } from "../modules/UI/stores/theme/useThemeStore";
import { observer, useObserver } from "mobx-react";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    mobile: themeStore.mobile,
    activeSecondaryMenuMobile: themeStore.activeSecondaryMenuMobile,
    toggleMobileSidebar: themeStore.toggleMobileSidebar,
    toggleSecondaryMenuMobile: themeStore.toggleSecondaryMenuMobile
  }));
};

const AppMobileMenu = observer(() => {
  const {
    mobile,
    activeSecondaryMenuMobile,
    toggleMobileSidebar,
    toggleSecondaryMenuMobile
  } = useThemeData();
  return (
    <>
      <div className="app-header__mobile-menu">
        <div onClick={toggleMobileSidebar}>
          <Hamburger
            active={mobile}
            type="elastic"
            onClick={toggleMobileSidebar}
          />
        </div>
      </div>
      <div className="app-header__menu">
        <span onClick={toggleMobileSidebar}>
          <Button
            size="sm"
            className={cx("btn-icon btn-icon-only", {
              active: activeSecondaryMenuMobile
            })}
            color="primary"
            onClick={toggleSecondaryMenuMobile}
          >
            <div className="btn-icon-wrapper">
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </Button>
        </span>
      </div>
    </>
  );
});

export default AppMobileMenu;
