import axios from "axios";

const BASE_URL = " https://api.github.com";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/vnd.github+json",
  },
});
