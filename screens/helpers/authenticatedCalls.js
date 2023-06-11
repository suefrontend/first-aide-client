import axios from "axios";
import { getToken } from "./tokenStorage";

export const authGet = async (url) => {
  const token = await getToken();
  console.log("TOKEN", token);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const authPost = async (url, data) => {
  const token = await getToken();
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
