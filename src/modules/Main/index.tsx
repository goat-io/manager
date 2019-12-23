import React from "react";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import ResizeDetector from "react-resize-detector";
import AppMain from "../../layout/Main";

import { useThemeStore } from "../UI/stores/theme/useThemeStore";
import { observer, useObserver } from "mobx-react";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    colorScheme: themeStore.colorScheme,
    enableFixedHeader: themeStore.enableFixedHeader,
    enableFixedSidebar: themeStore.enableFixedSidebar,
    enableFixedFooter: themeStore.enableFixedFooter,
    enableClosedSidebar: themeStore.enableClosedSidebar,
    enableMobileMenu: themeStore.enableMobileMenu,
    closedSmallerSidebar: themeStore.closedSmallerSidebar
  }));
};

const Main = observer(() => {
  let {
    colorScheme,
    enableFixedHeader,
    enableFixedSidebar,
    enableFixedFooter,
    enableClosedSidebar,
    enableMobileMenu,
    closedSmallerSidebar
  } = useThemeData();

  return (
    <ResizeDetector
      handleWidth
      render={({ width }) => (
        <div
          className={cx(
            "app-container app-theme-" + colorScheme,
            { "fixed-header": enableFixedHeader },
            { "fixed-sidebar": enableFixedSidebar || width < 1250 },
            { "fixed-footer": enableFixedFooter },
            { "closed-sidebar": enableClosedSidebar || width < 1250 },
            {
              "closed-sidebar-mobile": closedSmallerSidebar || width < 1250
            },
            { "sidebar-mobile-open": enableMobileMenu }
          )}
        >
          <AppMain />
        </div>
      )}
    />
  );
});

export default withRouter(Main);
