import axios from "axios";

const instance = axios.create({
  baseURL: "https://bugerbuilder-2c321.firebaseio.com/",
});

export default instance;
