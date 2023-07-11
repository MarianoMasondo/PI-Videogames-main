import { ALL_GENRES, DETAIL_VIDEOGAMES, FILTER_GENRES, GET_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT_VIDEOGAMES_ASC_DESC, SORT_VIDEOGAMES_RATING } from "./types";

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
            let videoCopy= [...state.VideogamesCopy]
            return {
                ...state,
                Videogames: videoCopy.filter(game => game.name.toLowerCase().includes(action.payload.toLowerCase()))};

        case ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case FILTER_GENRES:
            const gamesCopy = state.VideogamesCopy;
            const gamesGenres =
                action.payload === "all"
                ? gamesCopy
                : gamesCopy.filter((game) => game.genre.includes(action.payload))
            return {
                ...state,
                Videogames: gamesGenres,
            }

        case SORT_VIDEOGAMES_ASC_DESC:
            let videogamesSort = [...state.Videogames];

            videogamesSort.sort((a, b) => {
            if (action.payload === "asc") {
                return a.name.localeCompare(b.name);
             } else {
                return b.name.localeCompare(a.name);
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