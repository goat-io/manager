import React, { Component } from "react";
import cx from "classnames";

import TitleComponent2 from "./PageTitleExamples/Variation2";

class PageTitle extends Component {
  render() {
    let {
      enablePageTitleIcon,
      enablePageTitleSubheading,
      heading,
      icon,
      subheading
    } = this.props;

    return (
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div
              className={cx("page-title-icon", {
                "d-none": !enablePageTitleIcon
              })}
            >
              <i className={icon} />
            </div>
            <div className="page-title">
              {heading}
              <div
                className={cx("page-title-subheading", {
                  "d-none": !enablePageTitleSubheading
                })}
              >
                {subheading}
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <TitleComponent2 />
          </div>
        </div>
      </div>
    );
  }
}

export default PageTitle;
