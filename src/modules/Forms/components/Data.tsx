import React from "react";
import { Row, Col, Card } from "reactstrap";
import { SearchBox } from "../../../layout/Header/Components/SearchBox";
import { useObserver } from "mobx-react";
import { useResourceStore } from "../stores/form/useResourceStore";
import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource
  }));
};

export const Data = () => {
  const { resource } = useFromStores();
  if (!resource) {
    return <></>;
  }
  const Form = Formio.getter(resource);
  const columns = Formio.tableViewLabels(Form);

  return (
    <Row>
      <Col md="12">
        <Card className="main-card mb-3">
          <div className="card-header">
            {Form.title}
            <div className="btn-actions-pane-right">
              <SearchBox active={false} />
            </div>
          </div>
          <div className="table-responsive">
            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  {columns.map(columnName => {
                    return (
                      <th className="text-center" key={columnName}>
                        {columnName}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div className="d-block text-center card-footer">
            <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
              <i className="pe-7s-trash btn-icon-wrapper"> </i>
            </button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
