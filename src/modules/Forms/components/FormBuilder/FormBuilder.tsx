import { useObserver, observer } from "mobx-react";
import { FormBuilder as FormioBuilder } from "react-formio";
import React, { Fragment } from "react";
import { PathManager } from "./PathManager";

import { ResourceType } from "../../stores/form/types/Resource";
import { useResourceStore } from "../../stores/form/useResourceStore";
import { FormioForm } from "@goatlab/fluent/dist/Helpers/Formio/types/FormioForm";
import { Formio } from "@goatlab/fluent/dist/Helpers/Formio";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    setFormState: resourceStore.setEditingResource,
    resource: resourceStore.editingResource
  }));
};

export default interface FormBuilderTypes {
  form: FormioForm;
}

export const FormBuilder = observer(({ form }: FormBuilderTypes) => {
  if (!form) {
    return <></>;
  }
  const { setFormState, resource } = useFromStores();

  const updateFormState = (schema: ResourceType) => {
    const newSchema = JSON.parse(JSON.stringify(schema)) as FormioForm;

    if (resource) {
      newSchema.path = resource.path;
      newSchema.title = resource.title;
      newSchema.name = resource.name;
      newSchema.type = resource.type;
    }

    const form = Formio.setter(newSchema) as ResourceType;

    setFormState(form);
  };

  const editForm = JSON.parse(JSON.stringify(form));

  return (
    <Fragment>
      <PathManager />
      <FormioBuilder form={editForm} onChange={updateFormState} />
    </Fragment>
  );
});
