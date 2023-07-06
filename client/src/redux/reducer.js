import { DETAIL_VIDEOGAMES, GET_VIDEOGAMES, SEARCH_VIDEOGAMES } from "./types";

const initialState = {
    Videogames: [],
    DetailGame: [],
    SearchGames: [],
    genres: [],
};

const  reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return { ...state, Videogames: action.payload};
        case DETAIL_VIDEOGAMES:
            return { ...state, DetailGame: action.payload};
        case SEARCH_VIDEOGAMES:
            return {...state, Videogames: action.payload};
        default:
            return {...state};
    }
};

export default reducer;