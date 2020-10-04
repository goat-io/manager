import * as queryString from "query-string";

import React, { Component, Fragment, useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";

import AppHeader from "../../layout/Header";
import AppSidebar from "../../layout/SideBar";
import { Data } from "./components/Data";
import { Footer } from "../../layout/Footer";
import { Form } from "./components/Form";
import { Form as FormAPI } from "../../api/Form";
import { FormBuilder } from "./components/FormBuilder/FormBuilder";
import { FormTypes } from "./components/FormTypes";
import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";
import { FormioForm } from "@goatlab/fluent/dist/Helpers/Formio/types/FormioForm";
import { FormioStringForm } from "@goatlab/fluent/dist/Helpers/Formio/types/FormioStringForm";
import PageTitle from "../../layout/Main/PageTitle";
import SwaggerAPI from "./components/Swagger";
import Tabs from "react-responsive-tabs";
import { defaultForm } from "./components/FormBuilder/defaultForm";
import { setPlugin } from "./components/FormBuilder/plugin/setPlugin";
import { useResourceStore } from "./stores/form/useResourceStore";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resource: resourceStore.editingResource,
    setFormState: resourceStore.setEditingResource
  }));
};

interface IgetTabs {
  id?: string;
  path: string;
  form: FormioForm;
}
interface ITabContent {
  title: string;
  content: Component;
}

const getTabsArray = ({ path, id, form }: IgetTabs) => {
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
  if (id) {
    tabsContent.push({
      title: "API",
      content: <SwaggerAPI path={path} />
    });
  }
  return tabsContent;
};

const getTabs = ({ path, id, form }: IgetTabs) => {
  const tabsContent = getTabsArray({ path, id, form });

  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index
  }));
};

interface urlParams {
  id: string;
}
const ResourceBuilder = observer(() => {
  const history = useHistory();
  let { id } = useParams<urlParams>();
  const { setFormState, resource } = useFromStores();
  const defaultEditForm = Formio.getter(defaultForm as FormioStringForm);
  const [form, setForm] = useState(defaultEditForm);
  const path = (resource && resource.path) || "";
  const title = (resource && resource.title) || "";
  const { tab } = queryString.parse(history.location.search);
  const [selectedTab, setSelectedTab] = useState(0);

  // Form change
  useEffect(() => {
    if (!id) {
      setFormState(defaultForm);
      setForm(defaultEditForm);
      return;
    }

    const getForm = async (id: string) => {
      const formSchema: any = await FormAPI.findById(id);
      setPlugin(formSchema.path, FormAPI);
      setForm(Formio.getter(formSchema));
      setFormState(formSchema);
    };

    getForm(id);
    // eslint-disable-next-line
  }, [id]);

  // Tab change
  useEffect(() => {
    if (!tab) {
      setSelectedTab(0);
      return;
    }
    const tabsContent = getTabsArray({ path, id, form });
    let selected = tabsContent.findIndex(t => t.title === tab);
    setSelectedTab(selected);
    // eslint-disable-next-line
  }, [tab]);

  if (!resource) {
    setFormState(defaultForm);
    return null;
  }

  const changeUrl = (tabNumber: number) => {
    const tabsContent = getTabsArray({ path, id, form });
    const tab = tabsContent[tabNumber];
    history.push(`?tab=${tab.title}`);
    setSelectedTab(tabNumber);
  };

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
                    items={getTabs({ id, path, form })}
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
