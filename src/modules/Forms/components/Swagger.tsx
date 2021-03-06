import "swagger-ui-react/swagger-ui.css";

import React, { useEffect, useState } from "react";

import SwaggerUI from "swagger-ui-react";
import axios from "axios";
import to from "await-to-js";

interface SwaggerApiTypes {
  path: string;
  openApiUrl?: string;
}

const SwaggerAPI = ({ path, openApiUrl }: SwaggerApiTypes) => {
  const url =
    openApiUrl ||
    `${String(process.env.REACT_APP_FLUENT_BASE_URL)}/explorer/json`;

  const [spec, setSpec] = useState({
    components: { requestBodies: {}, schemas: {} },
    info: { title: "", version: "" },
    openapi: "",
    paths: {},
    servers: [],
    tags: [],
  });

  useEffect(() => {
    const getSpec = async () => {
      const [error, result] = await to(axios.get(url));
      if (error || !result) {
        return;
      }
      let newSpec = {
        ...JSON.parse(JSON.stringify(result.data)),
      };

      const apiPaths: any = {};

      Object.keys(newSpec.paths).forEach((apiPath) => {
        if (apiPath.includes(`${path}`)) {
          apiPaths[apiPath] = newSpec.paths[apiPath];
        }
      });

      newSpec.paths = apiPaths;
      newSpec.tags = [{ name: path }];

      /*
      newSpec.components.requestBodies = {
        [path]: newSpec.components.requestBodies[path]
      };
      
      newSpec.components.schemas = {
        [path]: newSpec.components.schemas[path]
      };

       */

      setSpec(newSpec);
    };
    getSpec();
  }, [path, url]);

  if (spec.openapi === "" || !path || path === "") {
    return <></>;
  }
  return <SwaggerUI spec={spec} docExpansion="list" />;
};
export default SwaggerAPI;
