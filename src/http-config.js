import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_ZEEP_PROVISIONING_URL,
  headers: {
    "Content-type": "application/json",
  },
});
