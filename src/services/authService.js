import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import config from "../config/config.json";

const tokenKey = "token";
const apiEndPoint = `${config.apiEndPoint}/auth`;

const login = async (email, password) => {
  const { data: jwt } = await httpService.post(apiEndPoint, {
    email,
    password
  });

  localStorage.setItem(tokenKey, jwt);
};

const loginWithJwt = jwt => {
  localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getLoggedUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
};

export default { login, logout, getLoggedUser, loginWithJwt };
