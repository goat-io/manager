import { Card, CardBody, CardTitle, Row } from "reactstrap";
import React, { Fragment } from "react";
import { observer, useObserver } from "mobx-react";

import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";
import { Form as FormioForm } from "react-formio";
import { FormioStringForm } from "@goatlab/fluent/dist/Helpers/Formio/types/FormioStringForm";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { useResourceStore } from "../stores/form/useResourceStore";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource
  }));
};

export const Form = observer(() => {
  const { resource } = useFromStores();
  if (!resource) {
    return <></>;
  }

  const Form = Formio.getter(resource as FormioStringForm);

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
            <CardTitle>{Form.title}</CardTitle>
            <Row>
              <div className="formioForm">
                <FormioForm form={Form} onSubmit={console.log} width="100%" />
              </div>
            </Row>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
});
