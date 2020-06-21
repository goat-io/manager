import React, { Fragment, useState, useEffect } from "react";
import AppSidebar from "../../layout/SideBar";
import AppHeader from "../../layout/Header";
import PageTitle from "../../layout/Main/PageTitle";
import { Footer } from "../../layout/Footer";
import Tabs from "react-responsive-tabs";
import { DatabaseEditor } from "./components/DatabaseEditor";
import * as queryString from "query-string";
import { useHistory } from "react-router-dom";

const getTabsArray = () => {
  return [
    {
      title: "Editor",
      content: <DatabaseEditor />,
    },
  ];
};

const getTabs = () => {
  const tabsContent = getTabsArray();

  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
};

const Database = () => {
  const history = useHistory();
  const { tab } = queryString.parse(history.location.search);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!tab) {
      setSelectedTab(0);
      return;
    }
    const tabsContent = getTabsArray();
    let selected = tabsContent.findIndex((t) => t.title === tab);
    setSelectedTab(selected);
    // eslint-disable-next-line
  }, [tab]);

  const changeUrl = (tabNumber: number) => {
    const tabsContent = getTabsArray();
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
                heading="Database"
                subheading="Edit your API"
                icon="pe-7s-monitor icon-gradient bg-sunny-morning"
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
};
export default Database;
