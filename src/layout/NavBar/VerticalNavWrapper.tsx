/*eslint-disable */
import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import MetisMenu from "react-metismenu";
import { ComponentsNav } from "./NavItems";

import { observer, useObserver } from "mobx-react";
import { useResourceStore } from "../../modules/Forms/stores/form/useResourceStore";

const useResourceData = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    resources: resourceStore.resources,
    fetchResources: resourceStore.fetchResources,
  }));
};

interface navLink {
  label: string;
  to: string;
}
interface NavContainer {
  icon: string;
  label: string;
  content: navLink[];
}

const Nav = observer(() => {
  const { resources, fetchResources } = useResourceData();
  useEffect(() => {
    fetchResources();
  }, []);

  const elements: NavContainer[] = [
    {
      icon: "pe-7s-share",
      label: "Endpoints",
      content: [],
    },
  ];

  resources.forEach((resource, index: number) => {
    elements[0].content.push({
      label: resource.title || "",
      to: `#/forms/${resource.id}`,
    });
  });

  return (
    <Fragment>
      <h5 className="app-sidebar__heading">API</h5>
      <MetisMenu
        content={[
          {
            icon: "pe-7s-way",
            label: "Create endpoint",
            to: "#/forms",
          },
        ]}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      {elements[0].content.length > 0 && (
        <MetisMenu
          content={elements}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
      )}
      <h5 className="app-sidebar__heading">Authentication</h5>
      <MetisMenu
        content={[
          {
            icon: "pe-7s-users",
            label: "Sign-in providers",
            to: "#/authentication?tab=Providers",
          },
          {
            icon: "lnr-eye",
            label: "Roles",
            to: "#/authentication?tab=Roles",
          },
        ]}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">Databases</h5>
      <MetisMenu
        content={[
          {
            icon: "lnr-database",
            label: "Databases",
            to: "#/databases",
          },
          {
            icon: "pe-7s-gleam",
            label: "Cache",
            to: "#/databases",
          },
          {
            icon: "pe-7s-shuffle",
            label: "Message Queues",
            to: "#/databases",
          },
          {
            icon: "pe-7s-clock",
            label: "Jobs",
            to: "#/databases",
          },
        ]}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">Email</h5>
      <MetisMenu
        content={[
          {
            icon: "pe-7s-mail",
            label: "SMTP providers",
            to: "#/databases",
          },
        ]}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">UI Components</h5>
      <MetisMenu
        content={ComponentsNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">Environment</h5>
      <MetisMenu
        content={[
          {
            icon: "pe-7s-monitor",
            label: "Env variables",
            to: "#/environment",
          },
        ]}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
    </Fragment>
  );
});

export default withRouter(Nav);
