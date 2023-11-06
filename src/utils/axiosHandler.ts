import axios, { AxiosPromise } from "axios";
import { BASE_URL } from "./constants";
interface axiosHandler {
  (route: string, param?: string, body?: object | []): AxiosPromise;
}
export const getRequest: axiosHandler = async (route, param) => {
  let url: string;
  if (param) url = `${BASE_URL}/${route}/${param}`;
  else url = `${BASE_URL}/${route}`;
  return axios.get(url);
};

export const patchRequest: axiosHandler = (route, param, body) => {
  let url: string;
  if (param) url = `${BASE_URL}/${route}/${param}`;
  else url = `${BASE_URL}/${route}`;
  return axios.patch(url, body);
};

export const postRequest: axiosHandler = (route, param, body) => {
  let url: string;
  if (param) url = `${BASE_URL}/${route}/${param}`;
  else url = `${BASE_URL}/${route}`;
  return axios.post(url, body);
};

export const putRequest: axiosHandler = (route, param, body) => {
  let url: string;
  if (param) url = `${BASE_URL}/${route}/${param}`;
  else url = `${BASE_URL}/${route}`;
  return axios.put(url, body);
};

export const deleteRequest: axiosHandler = (route, param) => {
  let url: string;
  if (param) url = `${BASE_URL}/${route}/${param}`;
  else url = `${BASE_URL}/${route}`;
  return axios.delete(url);
};
