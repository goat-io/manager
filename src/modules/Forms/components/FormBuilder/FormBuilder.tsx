import { Form } from "@goatlab/goatjs";
import { useObserver, observer } from "mobx-react";
import { FormBuilder as FormioBuilder } from "react-formio";
import React, { Fragment, useEffect, useState } from "react";
import { PathManager } from "./PathManager";
import { defaultForm } from "./defaultForm";
import { setPlugin } from "./plugin/setPlugin";
import { ResourceType } from "../../stores/form/types/Resource";
import { useResourceStore } from "../../stores/form/useResourceStore";

const useFromStores = () => {
  const { resourceStore } = useResourceStore();
  return useObserver(() => ({
    setFormState: resourceStore.setEditingResource,
    resource: resourceStore.editingResource
  }));
};

export default interface FormBuilderTypes {
  _id: string | undefined;
}

// String to Form
const formGetter = (form: any) => {
  let editForm = JSON.parse(JSON.stringify(form));

  if (editForm.components) {
    editForm.components = JSON.parse(editForm.components);
  }
  return editForm;
};

// Form to String
const formSetter = (form: any) => {
  let editForm = JSON.parse(JSON.stringify(form));

  if (editForm.components) {
    editForm.components = JSON.stringify(editForm.components);
  }
  return editForm;
};

export const FormBuilder = observer(({ _id }: FormBuilderTypes) => {
  const { setFormState, resource } = useFromStores();
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!_id) {
      setFormState(defaultForm);
      setForm(defaultForm);
      return;
    }

    const getForm = async (_id: string) => {
      const formSchema = await Form.find({ _id });
      setPlugin(formSchema.path);
      setForm(formSchema);
    };

    getForm(_id);
  }, [_id, setFormState, setForm]);

  const updateFormState = (schema: ResourceType) => {
    const newSchema = JSON.parse(JSON.stringify(schema));

    if (resource) {
      newSchema.path = resource.path;
      newSchema.title = resource.title;
      newSchema.name = resource.name;
      newSchema.type = resource.type;
    }
    setFormState(formSetter(newSchema));
  };

  if (!resource) {
    setFormState(defaultForm);
    return null;
  }

  let editForm = formGetter(form);

  return (
    <Fragment>
      <PathManager />
      <FormioBuilder form={editForm} onChange={updateFormState} />
    </Fragment>
  );
});
