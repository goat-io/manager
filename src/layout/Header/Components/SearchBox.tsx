import React, { Fragment, useState } from "react";
import cx from "classnames";

interface ISearchBox {
  active?: boolean;
}
export const SearchBox = ({ active }: ISearchBox) => {
  const [isActive, setIsActive] = useState(active || true);
  return (
    <Fragment>
      <div
        className={cx("search-wrapper", {
          active: isActive
        })}
      >
        <div className="input-holder">
          <input type="text" className="search-input" />
          <button
            onClick={() => setIsActive(!isActive)}
            className="search-icon"
          >
            <span />
          </button>
        </div>
        <button onClick={() => setIsActive(!isActive)} className="close" />
      </div>
    </Fragment>
  );
};
