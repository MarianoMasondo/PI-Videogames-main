import axios from "axios";
import {
  GET_VIDEOGAMES,
  SEARCH_VIDEOGAMES,
  DETAIL_VIDEOGAMES,
  ALL_GENRES,
  SORT_VIDEOGAMES_ASC_DESC,
  SORT_VIDEOGAMES_RATING,
  FILTER_GENRES,
  FILTER_APIDB,
} from "./types";

export function getVideogames() {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames`);
    const Videogames = apiData.data;
    dispatch({ type: GET_VIDEOGAMES, payload: Videogames });
  };
}

export function detailVideogames(id) {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const DetailGames = apiData.data;
    dispatch({
      type: DETAIL_VIDEOGAMES,
      payload: DetailGames,
    });
  };
}

export function searchVideogames(name) {
  return {
    type: SEARCH_VIDEOGAMES,
    payload: name,
  };
}

export const filterGenre = (payload) => {
  return {
    type: FILTER_GENRES,
    payload,
  };
};
export const filterApiDb = (payload) => {
  return {
    type: FILTER_APIDB,
    payload,
  };
};

export const allGenres = () => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get("http://localhost:3001/genres");
      const genres = apiData.data;
      dispatch({
        type: ALL_GENRES,
        payload: genres,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderVideogames = (payload) => {
  return {
    type: SORT_VIDEOGAMES_ASC_DESC,
    payload,
  };
};

export const orderVideogamesRating = (payload) => {
  return {
    type: SORT_VIDEOGAMES_RATING,
    payload,
  };
};
