import React, { Fragment } from "react";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { useResourceStore } from "../stores/form/useResourceStore";
import { useObserver, observer } from "mobx-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Form as FormioForm } from "react-formio";
import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";

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
  const Form = Formio.getter(resource);
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
