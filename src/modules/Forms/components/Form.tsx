import React, { Fragment } from "react";
import { Col, Row, Card, CardBody, CardTitle } from "reactstrap";
import { useResourceStore } from "../stores/form/useResourceStore";
import { useObserver, observer } from "mobx-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Form as FormioForm } from "react-formio";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource
  }));
};

// String to Form
const formGetter = (form: any) => {
  let editForm = JSON.parse(JSON.stringify(form));

  if (editForm.components) {
    editForm.components = JSON.parse(editForm.components);
  }
  return editForm;
};

export const Form = observer(() => {
  const { resource } = useFromStores();
  const Form = formGetter(resource);
  console.log("Form", Form);

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
