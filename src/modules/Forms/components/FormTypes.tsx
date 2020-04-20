import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Card, CardBody, CardTitle } from "reactstrap";
import { useResourceStore } from "../stores/form/useResourceStore";
import { useObserver, observer } from "mobx-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";
import { Id } from "@goatlab/fluent/dist/Helpers/Id";
import {
  parse,
  SupportedFrameworks
} from "@goatlab/fluent/dist/Helpers/Formio/parser/parse";
import { FormioForm } from "@goatlab/fluent/dist/Helpers/Formio/types/FormioForm";
import { ListGroup, ListGroupItem } from "reactstrap";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-textmate";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource,
    resources: resourceStore.resources
  }));
};

export const FormTypes = observer(() => {
  const { resource, resources } = useFromStores();
  const [types, setTypes] = useState();
  const [file, setFile] = useState();

  if (!resource || !resources) {
    return <></>;
  }
  const Form: FormioForm = Formio.getter(resource);

  const selectTypeFile = (path: string) => {
    if (!types) {
      return;
    }
    const selectedFile = types.find((t: any) => t.path === path);
    setFile(selectedFile.file);
  };

  useEffect(() => {
    const parseForm = async () => {
      const parsedForms = await parse(Form, SupportedFrameworks.Loopback);
      const form = parsedForms.find(p => p.model.path === Form.path);
      if (form) {
        setTypes(form && form.types.reverse());
      }
    };
    parseForm();
    // eslint-disable-next-line
  }, [resource.path]);

  if (!types) {
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
            <CardTitle>Types</CardTitle>
            <Row>
              <Col md={6}>
                <ListGroup>
                  {types.map((type: any, index: number) => (
                    <ListGroupItem
                      tag="button"
                      action
                      key={type.path}
                      onClick={() => {
                        selectTypeFile(type.path);
                      }}
                    >
                      {type.path.split("/").pop()}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col md={6}>
                <AceEditor
                  key={Id.uuid()}
                  mode="typescript"
                  theme="textmate"
                  value={file || types[0].file}
                  onChange={() => {}}
                  name={Id.uuid()}
                  editorProps={{ $blockScrolling: true }}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
});
