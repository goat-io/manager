import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Row } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Env } from "../../../api/Env";
import { IDataElement } from "@goatlab/fluent/dist/Providers/types";
import EditableLabel from "react-inline-editing";
import { toast, Slide } from "react-toastify";

export const DatabaseEditor = () => {
  const [envVariables, setEnvVariables] = useState<IDataElement>({});

  useEffect(() => {
    const getVariables = async () => {
      const variables = await Env.first();
      setEnvVariables(variables);
    };
    if (Object.keys(envVariables).length === 0) {
      getVariables();
    }
  }, [envVariables]);

  if (Object.keys(envVariables).length === 0) {
    return <></>;
  }

  const handleFocusOut = async (text: string, variableName: string) => {
    console.log("Left editor with text: " + text + variableName);
    if (envVariables[variableName] !== text) {
      const updatedValue = {
        ...envVariables,
        ...{ [variableName]: text },
      };

      const result = await Env.updateById("123", updatedValue);
      setEnvVariables(result);
      toast("The environment variable was updated", {
        transition: Slide,
        closeButton: true,
        autoClose: 2000,
        position: "top-right",
        type: "success",
      });
    }
  };

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
            <CardTitle>Environment Variables</CardTitle>
            <Row>
              <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(envVariables).map((variableName) => {
                      return (
                        <tr key={variableName}>
                          <td className="text-left">{variableName}</td>
                          <td className="text-left">
                            <EditableLabel
                              text={envVariables[variableName] || variableName}
                              labelClassName="myLabelClass"
                              inputClassName="myInputClass"
                              inputWidth="100%"
                              inputHeight="25px"
                              labelFontWeight="bold"
                              onFocusOut={(text: string) =>
                                handleFocusOut(text, variableName)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Row>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};
