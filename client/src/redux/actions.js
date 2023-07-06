import axios from "axios";
import { GET_VIDEOGAMES, SEARCH_VIDEOGAMES, DETAIL_VIDEOGAMES } from "./types";

export function getVideogames(){
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/videogames`);
        const Videogames = apiData.data.slice(0, 100);
        dispatch({type: GET_VIDEOGAMES, 
            payload: Videogames});
    };
};

export function detailVideogames(id){
  return async function(dispatch){
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`)
    const DetailGames = apiData.data;
    dispatch({
      type: DETAIL_VIDEOGAMES,
      payload: DetailGames,
    })
  }
}

export function searchVideogames(name) {
    return async function (dispatch){
      const apiData = await axios.get(`http://localhost:3001/videogames/name?name=${name}`);
      const Videogames = apiData.data;
      dispatch({
        type: SEARCH_VIDEOGAMES,
        payload: Videogames,
      });
    };
  }