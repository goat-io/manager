import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Env } from "../../../api/Env";
import { IDataElement } from "@goatlab/fluent/dist/Providers/types";
import { toast, Slide } from "react-toastify";

export const SignInProviders = () => {
  const [envVariables, setEnvVariables] = useState<IDataElement>({});
  const [useJwt, setUseJwt] = useState(false);
  const [useFirebase, setUseFirebase] = useState(false);

  useEffect(() => {
    const getVariables = async () => {
      const variables = await Env.first();
      setEnvVariables(variables);
      setUseJwt(Boolean(variables["AUTH_USE_JWT"]) || false);
      setUseFirebase(Boolean(variables["AUTH_USE_FIREBASE"]) || false);
    };
    if (Object.keys(envVariables).length === 0) {
      getVariables();
    }
  }, [envVariables]);

  const handleToggle = async (value: boolean, variable: string) => {
    console.log("the value", value, variable);
    const variables = await Env.updateById("123", { [variable]: value });
    setEnvVariables(variables);
    setUseJwt(Boolean(variables["AUTH_USE_JWT"]) || false);
    setUseFirebase(Boolean(variables["AUTH_USE_FIREBASE"]) || false);

    toast("The Authentication method has been updated.", {
      transition: Slide,
      closeButton: true,
      autoClose: 2000,
      position: "top-right",
      type: "success",
    });
  };

  if (Object.keys(envVariables).length === 0) {
    return <></>;
  }

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Card className="main-card mb-3">
          <CardBody>
            <CardTitle>Sign-in Providers</CardTitle>
            <div className="table-responsive">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">Custom JWT</td>
                    <td className="text-center">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked={useJwt}
                          onChange={() => {
                            handleToggle(!useJwt, "AUTH_USE_JWT");
                          }}
                          id="useJWT"
                          readOnly
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="useJWT"
                        >
                          {useJwt ? "Enabled" : "Disabled"}
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Firebase</td>
                    <td className="text-center">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked={useFirebase}
                          onChange={() => {
                            handleToggle(!useFirebase, "AUTH_USE_FIREBASE");
                          }}
                          id="useFirebase"
                          readOnly
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="useFirebase"
                        >
                          {useFirebase ? "Enabled" : "Disabled"}
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};
