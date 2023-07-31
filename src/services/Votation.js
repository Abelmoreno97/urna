const baseURL = "http://localhost:3001";
export default {
  getAll: () => fetch(baseURL + "/voting").then((res) => res.json()),
  getAllTitles: () => fetch(baseURL + "/voting/titles").then((res) => res.json()),
};
