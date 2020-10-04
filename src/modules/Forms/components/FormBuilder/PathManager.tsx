import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
  CustomInput,
} from "reactstrap";
import { useResourceStore } from "../../stores/form/useResourceStore";
import { useObserver, observer } from "mobx-react";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource,
    setEditingResourceField: resourceStore.setEditingResourceField,
  }));
};

export const PathManager = observer(() => {
  const { resource, setEditingResourceField } = useFromStores();
  const [state, setState] = useState({
    title: "",
    name: "",
    path: "",
    display: "",
  });
  const update = JSON.stringify(resource);
  useEffect(() => {
    setState({
      title: (resource && resource.title) || "",
      name: (resource && resource.name) || "",
      path: (resource && resource.path) || "",
      display: (resource && resource.display) || "",
    });
  }, [update, resource]);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setEditingResourceField(name, value);
    setState({
      ...state,
      ...{
        [name]: value,
      },
    });
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
            <CardTitle>Form</CardTitle>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={state.title}
                      onChange={handleOnChange}
                      placeholder="Title of the form"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">(Class) Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={state.name}
                      placeholder="Name of the form"
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail11">Path</Label>
                    <Input
                      type="text"
                      name="path"
                      id="path"
                      value={state.path}
                      onChange={handleOnChange}
                      placeholder="Path of the form and API"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="display">Display as</Label>
                    <CustomInput
                      type="select"
                      id="display"
                      name="display"
                      value={state.display}
                      onChange={handleOnChange}
                    >
                      <option value="">Select...</option>
                      <option value="form">Form</option>
                      <option value="wizard">Wizard</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="display">Database connection</Label>
                    <CustomInput
                      type="select"
                      id="display"
                      name="display"
                      value={state.display}
                      onChange={handleOnChange}
                    >
                      <option value="">Select...</option>
                      <option value="form">MAIN_DATABASE</option>
                      <option value="wizard">SECOND_DATABASE</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
});
