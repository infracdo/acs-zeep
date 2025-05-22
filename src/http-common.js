import axios from "axios";

export default axios.create({
  baseURL: "https://acs-be-sbx.apollo.com.ph",
  headers: {
    "Content-type": "application/json",
  },
  // baseURL: "http://localhost:7547",
  // headers: {
  //   "Content-type": "application/json",
  // },
});
