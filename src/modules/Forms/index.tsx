import React, { Fragment, useEffect, useState } from "react";
import AppHeader from "../../layout/Header";
import AppSidebar from "../../layout/SideBar";
import PageTitle from "../../layout/Main/PageTitle";
import { useParams, useHistory } from "react-router-dom";
import Tabs from "react-responsive-tabs";
import SwaggerAPI from "./components/Swagger";
import { observer, useObserver } from "mobx-react";
import { FormBuilder } from "./components/FormBuilder/FormBuilder";
import { useResourceStore } from "./stores/form/useResourceStore";
import { FormTypes } from "./components/FormTypes";
import { Form } from "./components/Form";
import { Data } from "./components/Data";
import { Form as FormAPI } from "../../api/Form";
import { Footer } from "../../layout/Footer";
import * as queryString from "query-string";
import { defaultForm } from "./components/FormBuilder/defaultForm";
import { setPlugin } from "./components/FormBuilder/plugin/setPlugin";
import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource,
    setFormState: resourceStore.setEditingResource
  }));
};

const ResourceBuilder = observer(() => {
  const history = useHistory();
  let { _id } = useParams();
  const { setFormState, resource } = useFromStores();
  const defaultEditForm = Formio.getter(defaultForm);
  const [form, setForm] = useState(defaultEditForm);
  const path = (resource && resource.path) || "";
  const title = (resource && resource.title) || "";
  const { tab } = queryString.parse(history.location.search);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabsContent = [
    {
      title: "Form",
      content: <FormBuilder form={form} />
    },
    {
      title: "Use",
      content: <Form />
    },
    {
      title: "Data",
      content: <Data />
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

  useEffect(() => {
    if (!_id) {
      setFormState(defaultForm);
      setForm(defaultEditForm);
      return;
    }

    const getForm = async (_id: string) => {
      const formSchema: any = await FormAPI.remote().findById(_id);
      setPlugin(formSchema.path);
      setForm(Formio.getter(formSchema));
      setFormState(formSchema);
    };

    getForm(_id);
    // eslint-disable-next-line
  }, [_id]);

  useEffect(() => {
    if (!tab) {
      setSelectedTab(0);
      return;
    }
    let selected = tabsContent.findIndex(t => t.title === tab);
    setSelectedTab(selected);
    // eslint-disable-next-line
  }, [tab]);

  if (_id) {
    tabsContent.push({
      title: "API",
      content: <SwaggerAPI path={path} />
    });
  }

  if (!resource) {
    setFormState(defaultForm);
    return null;
  }

  console.log("form", form);

  const changeUrl = (tabNumber: number) => {
    const tab = tabsContent[tabNumber];
    history.push(`?tab=${tab.title}`);
    setSelectedTab(tabNumber);
  };

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
                    onChange={changeUrl}
                    selectedTabKey={selectedTab}
                  />
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
});

export default ResourceBuilder;
