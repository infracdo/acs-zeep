import axios from "axios";


export default axios.create({
  baseURL: "http://192.168.43.108:7547",
  headers: {
    "Content-type": "application/json",
  }
});
