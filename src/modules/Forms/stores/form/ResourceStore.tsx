import { types, flow, getSnapshot } from "mobx-state-tree";
import { Resource, ResourceType } from "./types/Resource";
import { Form } from "@goatlab/goatjs";

export const ResourceStore = types
  .model("ResourceStore", {
    resources: types.array(Resource),
    editingResource: types.maybe(Resource)
  })
  .actions(self => ({
    getResource(path: string): ResourceType | undefined {
      return self.resources.find(r => r.path === path);
    },
    setEditingResource(resource: ResourceType): void {
      self.editingResource = resource;
    },
    setEditingResourceField(field: string, value: any): void {
      const snap: any = getSnapshot(self);
      if (!snap || !snap.editingResource) {
        return;
      }

      const edited: ResourceType = {
        ...snap.editingResource,
        ...{ [field]: value }
      };
      self.editingResource = edited;
    },
    fetchResources: flow(function* fetchProjects() {
      try {
        self.resources = yield Form.get();
      } catch (error) {
        console.error("Failed to fetch resources", error);
      }
    }),
    updateResource: flow(function* updateResource() {
      try {
        const fullStore = getSnapshot(self);
        const resource = JSON.parse(
          JSON.stringify(fullStore.editingResource, (key, value) => {
            return value === null ? undefined : value;
          })
        );
        /*const updated =*/ yield Form.update(resource);
        // console.log(updated);
        // self.editingResource = updated;
      } catch (error) {
        console.error("Failed to save", error);
      }
    }),
    createResource: flow(function* updateResource() {
      try {
        const fullStore = getSnapshot(self);
        const resource = JSON.parse(
          JSON.stringify(fullStore.editingResource, (key, value) => {
            return value === null ? undefined : value;
          })
        );
        delete resource._id;
        delete resource.created;
        delete resource.modified;
        self.editingResource = yield Form.insert(resource);
      } catch (error) {
        console.error("Failed to save", error);
      }
    }),
    deleteResource: flow(function* updateResource() {
      try {
        const fullStore = getSnapshot(self);
        const resource = JSON.parse(JSON.stringify(fullStore.editingResource));
        yield Form.delete(resource._id);
      } catch (error) {
        console.error("Failed to delete", error);
      }
    })
  }));
