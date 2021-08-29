import axios from "axios";
import { BACKEND_URL } from "../constants/core.constant";

const instance = axios.create({
  baseURL: BACKEND_URL,
});

export default instance;
