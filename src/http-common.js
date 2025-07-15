import axios from "axios";

export default axios.create({
  baseURL: "https://acs-mb-test.apolloglobal.net",
  headers: {
    "Content-type": "application/json",
  },
});
