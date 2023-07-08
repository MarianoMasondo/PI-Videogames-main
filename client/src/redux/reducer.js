import { ALL_GENRE, DETAIL_VIDEOGAMES, FILTER_GENRE, GET_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT_VIDEOGAMES_ASC_DESC, SORT_VIDEOGAMES_RATING } from "./types";

const initialState = {
    Videogames: [],
    VideogamesCopy: [],
    DetailGame: [],
    SearchGames: [],
    FilteredGenres: [],
    genres: [],
    AllVideogames: [],
    genre: "",
};

const  reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return { 
                ...state,                 
                Videogames: action.payload,
                VideogamesCopy: action.payload};
        case DETAIL_VIDEOGAMES:
            return { 
                ...state, 
                DetailGame: action.payload};

        case SEARCH_VIDEOGAMES:
            return {
                ...state, 
                Videogames: action.payload};

        case ALL_GENRE:
            return {
                ...state,
                genres: action.payload
            }

        case FILTER_GENRE:
            const VideogamesCopy = state.VideogamesCopy;
            const gamesGenres =
                action.payload === "all"
                ? VideogamesCopy
                : VideogamesCopy.filter((game) => {
          if (game.genre && game.genre.includes(action.payload)) {
            return true;
            }
            return false;
        });
            return {
                ...state,
                Videogames: gamesGenres,
            }

        case SORT_VIDEOGAMES_ASC_DESC:
            let videogamesSort = [...state.Videogames]; // Crear una copia del array de videojuegos
  
            videogamesSort.sort((a, b) => {
            if (action.payload === "asc") {
                return a.name.localeCompare(b.name); // Ordenar alfabéticamente ascendente
             } else {
                return b.name.localeCompare(a.name); // Ordenar alfabéticamente descendente
                }
            });

                return {
                    ...state,
                 Videogames: videogamesSort
                };

        case SORT_VIDEOGAMES_RATING:
            let videogamesSortRating = action.payload === "best"
              ? [...state.Videogames].sort((a, b) => b.rating - a.rating)
              : [...state.Videogames].sort((a, b) => a.rating - b.rating);
            return {
              ...state,
              Videogames: videogamesSortRating
          };
          
            

        default:
            return {...state};
    }
};

export default reducer;