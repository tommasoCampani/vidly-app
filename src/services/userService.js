import httpService from "./httpService";
import config from "../config/config.json";

const apiEndPoint = `${config.apiEndPoint}/users`;

const registerUser = user => {
  return httpService.post(apiEndPoint, {
    email: user.nickname,
    password: user.password,
    name: user.name
  });
};

export { registerUser };
