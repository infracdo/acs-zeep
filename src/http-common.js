import axios from "axios";

export default axios.create({
  baseURL: "http://"+window.location.hostname+":7547",
  headers: {
    "Content-type": "application/json",
  }
});
