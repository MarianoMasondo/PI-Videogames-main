import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";

export default function getVideogames (){
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/videogames`);
        const Videogames = apiData.data;
        dispatch({type: GET_VIDEOGAMES, 
            payload: Videogames});
    };
};