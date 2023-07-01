import { GET_VIDEOGAMES, SEARCH_VIDEOGAMES } from "./types";

const initialState = {
    Videogames: [],
    allVideogames: [],
    genres: [],
};

const  reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return { ...state, Videogames: action.payload};
        case SEARCH_VIDEOGAMES:
            return {...state, Videogames: action.payload}
        default:
            return state;
    }
};

export default reducer;