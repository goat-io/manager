export const loopbackGetPlugin = (
  localForms: any,
  Submission: any,
  currentValue: any,
  backendUrl: string,
  loopbackUrl: string
) => ({
  priority: 0,
  preRequest: async (request: any) => {
    if (!(request.method === "GET") || !request.url.includes(backendUrl)) {
      return undefined;
    }
  },
  request: () => {
    console.log("request");
  },
  preStaticRequest: () => {
    console.log("preStaticRequest");
  },
  staticRequest: async (request: any) => {
    if (!(request.method === "GET") || !request.url.includes(backendUrl)) {
      return undefined;
    }

    let { url } = request;

    if (url.includes("form?type=resource&limit=4294967295&select=_id,title")) {
      const result = await Submission({ path: "/forms" })
        .remote({ connectorName: "loopback" })
        .limit(99999)
        .select("_id, title")
        .get();
      return result;
    }

    if (
      url.includes("form") &&
      !url.includes("&filter") &&
      !url.includes("submission")
    ) {
      let id = url.split("/").pop();
      const result = await Submission({ path: "forms" })
        .remote({ connectorName: "loopback" })
        .where("_id", "=", id)
        .first();

      console.log("result", result);

      return result;
    }

    const formPath =
      localForms[
        url.substring(
          url.lastIndexOf("/form/") + 6,
          url.lastIndexOf("/submission")
        )
      ];

    const filter = url.includes("&filter")
      ? decodeURIComponent(
          url.substring(url.lastIndexOf("&filter=") + 8, url.length)
        )
      : "{}";

    let searchString = undefined;
    let where = undefined;

    if (url.includes("&where")) {
      const lastIndex =
        filter === "{}" ? url.length : url.lastIndexOf("&filter=");
      searchString = decodeURIComponent(
        url.substring(url.lastIndexOf("__regex") + 8, lastIndex)
      );

      where = decodeURIComponent(
        url.substring(url.lastIndexOf("&where") + 6, url.lastIndexOf("__regex"))
      ).replace("=", "");
    } else if (url.includes("__regex")) {
      const startIndex = url.lastIndexOf("&");
      const lastIndex = url.lastIndexOf("=");

      searchString = decodeURIComponent(
        url.substring(lastIndex + 1, url.length)
      );

      const searchKey = decodeURIComponent(
        url.substring(startIndex + 1, url.indexOf("__regex"))
      );

      where = `{"${searchKey}": {"like": {{input}}, "options": "si" }}`;
    }

    const lbQueryUrl: any = {
      base: loopbackUrl,
      path: formPath,
      formField: formPath,
      limit: Number(
        url.substring(url.lastIndexOf("?limit=") + 7, url.lastIndexOf("&skip"))
      ),
      filter,
      where,
      searchString
    };

    // Make the field searchable
    if (lbQueryUrl.searchString && lbQueryUrl.where) {
      lbQueryUrl.where = lbQueryUrl.where.replace(
        /{{input}}/g,
        `"${lbQueryUrl.searchString}"`
      );
    }

    try {
      if (lbQueryUrl.filter) {
        lbQueryUrl.filter = lbQueryUrl.filter
          ? JSON.parse(lbQueryUrl.filter)
          : undefined;
      }
    } catch (error) {
      console.error(
        "Could not parse FILTER one of your resource queries: ",
        formPath,
        url
      );
      return undefined;
    }
    try {
      if (lbQueryUrl.where) {
        lbQueryUrl.where = lbQueryUrl.where
          ? JSON.parse(lbQueryUrl.where)
          : undefined;
        lbQueryUrl.filter.where = lbQueryUrl.where;
      } else {
        currentValue = currentValue[lbQueryUrl.formField];
        if (currentValue) {
          lbQueryUrl.where = `{ _id: ${currentValue} }`;
          lbQueryUrl.filter.where = lbQueryUrl.where;
        }
      }
    } catch (error) {
      console.log(
        "Could not parse WHERE one of your resource queries: ",
        formPath,
        url
      );
      return undefined;
    }

    const result = await Submission({ path: lbQueryUrl.path })
      .remote({ connectorName: "loopback" })
      .raw(lbQueryUrl.filter)
      .populate(lbQueryUrl.filter.related)
      .get();

    return result;
  }
});
