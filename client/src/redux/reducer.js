import { GET_VIDEOGAMES } from "./actions";

const initialState = {
    Videogames: [],
    allVideogames: [],
    genres: [],
};

const  reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return { ...state, Videogames: action.payload};
        default:
            return {...state};
    }
};

export default reducer;