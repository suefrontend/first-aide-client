import axios from "axios";
import { getToken } from "./tokenStorage";

const API = process.env.API || "http://localhost:8000";

export const authGet = async (url) => {
  if (!url.startsWith("/")) url = `/${url}`;

  const fullUrl = `${API}${url}`;
  const token = await getToken();
  console.log("TOKEN", token);
  return axios.get(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const authPost = async (url, data) => {
  if (!url.startsWith("/")) url = `/${url}`;
  const fullUrl = `${API}${url}`;
  const token = await getToken();
  return axios.post(fullUrl, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authDelete = async (url, data) => {
  if (!url.startsWith("/")) url = `/${url}`;
  const fullUrl = `${API}${url}/${data}`;
  const token = await getToken();
  return axios.delete(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
