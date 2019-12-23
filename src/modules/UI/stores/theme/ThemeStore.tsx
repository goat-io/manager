import { types } from "mobx-state-tree";

export const ThemeStore = types
  .model("ThemeStore", {
    drawerOpen: false,
    active: false,
    mobile: false,
    mobileSmall: true,
    activeSecondaryMenuMobile: true,
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false,
    enableClosedSidebar: false,
    enableFixedHeader: true,
    enableFixedFooter: true,
    enableFixedSidebar: true,
    colorScheme: "white",
    enableMobileMenu: false,
    closedSmallerSidebar: false,
    backgroundColor: "bg-royal sidebar-text-light",
    headerBackgroundColor: "bg-royal header-text-light",
    enableMobileMenuSmall: "",
    enableBackgroundImage: true,
    enableHeaderShadow: true,
    enableSidebarShadow: true,
    backgroundImage: "",
    backgroundImageOpacity: "opacity-06",
    enablePageTitleIcon: true,
    enablePageTitleSubheading: true,
    enablePageTabsAlt: false
  })
  .actions(self => ({
    toggleDrawer() {
      self.drawerOpen = !self.drawerOpen;
      self.enableClosedSidebar = !self.enableClosedSidebar;
    },
    toggleMobileSidebar() {
      self.mobile = !self.mobile;
    },
    toggleMobileSmall() {
      self.mobileSmall = !self.mobileSmall;
    },
    toggleSecondaryMenuMobile() {
      self.activeSecondaryMenuMobile = !self.activeSecondaryMenuMobile;
    }
  }));
