import httpService from "./httpService";
import config from "../config/config.json";

const apiEndPoint = `${config.apiEndPoint}/movies`;

function getMovieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

function insertMovie(movie) {
  return httpService.post(apiEndPoint, movie);
}

function updateMovie(movie) {
  const body = { ...movie };
  delete body._id;
  return httpService.put(getMovieUrl(movie._id), body);
}

export function getMovies() {
  return httpService.get(apiEndPoint);
}

export function getMovie(id) {
  return httpService.get(getMovieUrl(id));
}

export function saveMovie(movie) {
  if (!movie._id) {
    return insertMovie(movie);
  } else {
    return updateMovie(movie);
  }
}

export function deleteMovie(id) {
  return httpService.delete(getMovieUrl(id));
}
