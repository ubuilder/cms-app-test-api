
export function cms_api(
  {
    baseUrl,
    // fetch,
    token,
  } = {
    token: "",
    baseUrl: "http://localhost:5173/api",
  }
) {
  async function call(route, data = {}) {
    // TODO: {data} vs data

    const url = baseUrl + route;
    const body = JSON.stringify(data);
    const headers = {
      "content-type": "application/json",
    };

    if (token && token !== "undefined") {
      headers["Authorization"] = `bearer ${token}`;
    }

    console.log("calling fetch ", url, "body: ", body, "headers: ", headers);

    try {
      const res = (await fetch(url, {
        method: "POST",
        body,
        headers,
      }).then((res) => res.json())) ;

      console.log(`[${res.status}]: ${res.message}.`);

      return res ?? {};
    } catch (err) {
      console.log(err.message);
      console.log(err);
      return {
        status: 500,
        message: err.message,
        data: null
      }
    }
  }

  return {
    async login({ username, password }) {
      const result = await call("/auth/login", { username, password });
      if (result.data) {
        token = result.data.token;
      }
      return result;
    },
    async register({ username, password, name, email }) {
      await call("/auth/register", { username, password, name, email });
      const result = await call("/auth/login", { username, password });

      token = result.data?.token;
      return result;
    },
    async logout() {
      const result = await call("/auth/logout");
      // token = result.data.token
      token = "";
      return result;
    },

    async getUser() {
      const res = await call("/auth/getUser");
      console.log("after get User", res);
      return res;
    },
    async getPages(filters = {}) {
      return call("/pages/getPages", filters);
    },
    async createPage({ title, slug }) {
      return call("/pages/createPage", { title, slug });
    },
    async getPage(id) {
      return call("/pages/getPages", { where: { id } }).then(
        (res) => res.data?.data[0]
      );
    },
    async updatePage({id, data}) {
      return call("/pages/updatePage", {id, data}).then(res => res.data)
    },
    async removePage(id) {
      return call("/pages/removePage", {id}).then(res => res.data)

    },
    async createTable({name, icon, fields = []}) {
      return call("/content/createTable", {name, icon, fields}).then(res => res.data);
    },
    async updateTable({id, data}) {
      return call("/content/updateTable", {id, data}).then(res => res.data);
    },
    async getTables(filters = {}) {
      return call("/content/getTables", filters);
    },
    async getTableBySlug(slug) {
      return call("/content/getTables", { where: { slug } }).then(
        (res) => res.data?.data[0]
      );
    },

    async getTable(id) {
      return call("/content/getTables", { where: { id } }).then(
        (res) => res.data?.data[0]
      );
    },
    async removeTable(id) {
      return call("/content/removeTable", {id}).then(res => res.data)
    },
    async insertData(params) {
      return call("/data/insertData", params).then(res => res.data)
    },
    async updateData(params) {
      return call("/data/insertData", params).then(res => res.data)
    },
    async removeData(params) {
      return call("/data/removeData", params).then(res => res.data)
    },
      async getData(params) {
      return call("/data/getData", params).then(res => res.data)
    },
  };
}
