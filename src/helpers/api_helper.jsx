import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { params: config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  if (data instanceof FormData) {
    return axiosApi
      .post(url, data, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: config.onUploadProgress,
      })
      .then((response) => response.data);
  }

  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function bulkDelete(url, data, config = {}) {
  if (data instanceof FormData) {
    return axiosApi
      .post(url, data, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  }

  // Default behavior for JSON data
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  // Check if data is FormData
  if (data instanceof FormData) {
    return axiosApi
      .patch(url, data, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  }
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  // Check if data is FormData
  if (data instanceof FormData) {
    return axiosApi
      .put(url, data, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  }
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
