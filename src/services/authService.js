import httpService from "./httpService";
import config from "../config/config.json";

const apiEndPoint = `${config.apiEndPoint}/auth`;

const login = (email, password) => {
  return httpService.post(apiEndPoint, { email, password });
};

export { login };
