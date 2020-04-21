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
  // const tableColumns = Formio.tableViewLabels(Form);

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
                  <th>Name</th>
                  <th className="text-center">City</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center text-muted">#345</td>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img
                              width={40}
                              className="rounded-circle"
                              src={""}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">John Doe</div>
                          <div className="widget-subheading opacity-7">
                            Web Developer
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">Madrid</td>
                  <td className="text-center">
                    <div className="badge badge-warning">Pending</div>
                  </td>
                  <td className="text-center">
                    <button type="button" className="btn btn-primary btn-sm">
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-muted">#347</td>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img
                              width={40}
                              className="rounded-circle"
                              src={""}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Ruben Tillman</div>
                          <div className="widget-subheading opacity-7">
                            Etiam sit amet orci eget
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">Berlin</td>
                  <td className="text-center">
                    <div className="badge badge-success">Completed</div>
                  </td>
                  <td className="text-center">
                    <button type="button" className="btn btn-primary btn-sm">
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-muted">#321</td>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img
                              width={40}
                              className="rounded-circle"
                              src={""}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Elliot Huber</div>
                          <div className="widget-subheading opacity-7">
                            Lorem ipsum dolor sic
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">London</td>
                  <td className="text-center">
                    <div className="badge badge-danger">In Progress</div>
                  </td>
                  <td className="text-center">
                    <button type="button" className="btn btn-primary btn-sm">
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="text-center text-muted">#55</td>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img
                              width={40}
                              className="rounded-circle"
                              src={""}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Vinnie Wagstaff</div>
                          <div className="widget-subheading opacity-7">
                            UI Designer
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">Amsterdam</td>
                  <td className="text-center">
                    <div className="badge badge-info">On Hold</div>
                  </td>
                  <td className="text-center">
                    <button type="button" className="btn btn-primary btn-sm">
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-block text-center card-footer">
            <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
              <i className="pe-7s-trash btn-icon-wrapper"> </i>
            </button>
            <button className="btn-wide btn btn-success">Save</button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
