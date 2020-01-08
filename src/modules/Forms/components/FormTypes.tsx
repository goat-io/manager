import React, { Fragment } from "react";
import { Col, Row, Card, CardBody, CardTitle } from "reactstrap";
import { useResourceStore } from "../stores/form/useResourceStore";
import { useObserver, observer } from "mobx-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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

/*
<Card className="main-card mb-3">
        <CardBody>
          <CardTitle>Types</CardTitle>
          <Row>
            <Col md={6}>Hello</Col>
            <Col md={6}>Hello</Col>
          </Row>
        </CardBody>
      </Card>
      */
export const FormTypes = observer(() => {
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
            <CardTitle>Types</CardTitle>
            <Row>
              <Col md={6}>Hello</Col>
              <Col md={6}>Hello</Col>
            </Row>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
});
