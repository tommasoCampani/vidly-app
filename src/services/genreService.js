import httpService from "./httpService";
import config from "../config/config.json";

const apiEndPoint = `${config.apiEndPoint}/genres`;

const getGenres = () => {
  return httpService.get(apiEndPoint);
};

export { getGenres };
