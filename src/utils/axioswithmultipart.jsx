import axios from "axios";

export const axiosWithMultipart = axios.create({
  // baseURL: "http://localhost",
  baseURL: "https://appfordev.com/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
