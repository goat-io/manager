import React, { Fragment } from "react";
import AppHeader from "../../layout/Header";
import AppSidebar from "../../layout/SideBar";
import PageTitle from "../../layout/Main/PageTitle";
import { useParams } from "react-router-dom";
import Tabs from "react-responsive-tabs";
import SwaggerAPI from "./components/Swagger";
import { observer, useObserver } from "mobx-react";
import { FormBuilder } from "./components/FormBuilder/FormBuilder";
import { useResourceStore } from "./stores/form/useResourceStore";
import { FormTypes } from "./components/FormTypes";
import { Form } from "./components/Form";
const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource
  }));
};

const ResourceBuilder = observer(() => {
  let { _id } = useParams();
  const { resource } = useFromStores();

  const path = (resource && resource.path) || "";
  const title = (resource && resource.title) || "";

  const tabsContent = [
    {
      title: "Form",
      content: <FormBuilder _id={_id} />
    },
    {
      title: "Use",
      content: <Form />
    },
    {
      title: "Types",
      content: <FormTypes />
    },
    {
      title: "Access",
      content: null
    }
  ];

  if (_id) {
    tabsContent.push({
      title: "API",
      content: <SwaggerAPI path={path} />
    });
  }

  function getTabs() {
    return tabsContent.map((tab, index) => ({
      title: tab.title,
      getContent: () => tab.content,
      key: index
    }));
  }

  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Fragment>
              <PageTitle
                heading={title}
                subheading="Edit your API"
                icon="pe-7s-news-paper icon-gradient bg-sunny-morning"
                enablePageTitleIcon={true}
              />
              <div className="col-md-12">
                <div className="col-md-12 font-weight-normal">
                  <Tabs
                    tabsWrapperClass="body-tabs body-tabs-layout"
                    transform={false}
                    showInkBar={true}
                    items={getTabs()}
                  />
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default ResourceBuilder;
