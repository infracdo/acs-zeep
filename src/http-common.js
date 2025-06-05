import axios from "axios";

export default axios.create({
  baseURL: "https://zeep-be-test.apollo.com",
  headers: {
    "Content-type": "application/json",
  },
  // baseURL: "http://localhost:7547",
  // headers: {
  //   "Content-type": "application/json",
  // },
});
