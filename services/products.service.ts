import axios from "./axios";

export const listProducts = () => axios.get("/products");
