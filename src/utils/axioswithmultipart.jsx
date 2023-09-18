import axios from "axios";

export const axiosWithMultipart = axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "multipart/form-data",
  },

  //   baseURL: "https://appfordev.com",
});
