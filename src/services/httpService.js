import axios from "axios";
import logger from "./loggerService";
import { toast } from "react-toastify";

//Global set of common header for all request
function setTokenHeader(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

//Global management of unexpected error
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setTokenHeader
};
