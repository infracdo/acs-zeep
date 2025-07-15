import axios from "axios";

export default axios.create({
  baseURL: "https://acs-mb-test.apolloglobal.net",
  headers: {
    "Content-type": "application/json",
  },
  // baseURL: "http://localhost:7547",
  // headers: {
  //   "Content-type": "application/json",
  // },
});
