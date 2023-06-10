import axios from "axios";
import { getToken } from "./tokenStorage";

export const authGet = (url) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const authPost = (url, data) => {
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
