/*eslint-disable */
import React, { Fragment } from "react";

export class Footer extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="app-footer">
          <div className="app-footer__inner">
            <div className="app-footer-left"></div>
            <div className="app-footer-right">
              <ul className="nav">
                <li className="nav-item">
                  <a href="https://docs.goatlab.io" className="nav-link">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Footer;
