/*eslint-disable */
import React, { Fragment } from "react";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast, Slide } from "react-toastify";

import { useResourceStore } from "../../../modules/Forms/stores/form/useResourceStore";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    update: resourceStore.updateResource,
    create: resourceStore.createResource,
    fetch: resourceStore.fetchResources,
    del: resourceStore.deleteResource,
  }));
};

const TitleComponent2 = () => {
  const { update, create, fetch, del } = useFromStores();
  let { id } = useParams();

  const updateOrCreate = async () => {
    if (id) {
      await update();
    } else {
      await create();
    }

    const toastId = toast("Restarting server...", {
      transition: Slide,
      closeButton: true,
      autoClose: 15000,
      position: "bottom-center",
      type: "success",
      onClose: async () => {
        await fetch();
      },
    });
  };

  const deleteForm = async () => {
    if (id) {
      await del();
    }

    const toastId = toast("Restarting server...", {
      transition: Slide,
      closeButton: true,
      autoClose: 15000,
      position: "bottom-center",
      type: "success",
      onClose: async () => {
        await fetch();
      },
    });
  };

  return (
    <Fragment>
      <Button
        className="btn-shadow mr-3"
        onClick={updateOrCreate}
        color="primary"
        id="Tooltip-123"
      >
        <FontAwesomeIcon icon={faSave} />
      </Button>

      <Button
        className="btn-shadow mr-3"
        onClick={deleteForm}
        color="red"
        id="Tooltip-123"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Fragment>
  );
};

export default TitleComponent2;
