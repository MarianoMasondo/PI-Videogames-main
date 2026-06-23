import { defineStore } from "pinia";
import type { GameGenre, Genre, Videogame } from "../types/videogame";
import {
  getVideogames,
  getGenres,
  searchVideogamesByName,
} from "../services/videogamesService";

interface VideogamesState {
  videogames: Videogame[];
  allVideogames: Videogame[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const getGenreName = (genre: GameGenre): string => {
  if (typeof genre === "string") {
    return genre;
  }

  return genre.name;
};

export const useVideogamesStore = defineStore("videogames", {
  state: (): VideogamesState => ({
    videogames: [],
    allVideogames: [],
    genres: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchVideogames() {
      try {
        this.loading = true;
        this.error = null;

        const data = await getVideogames();

        this.videogames = data;
        this.allVideogames = data;
      } catch (error) {
        this.error = "No se pudieron cargar los videojuegos";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGenres() {
      try {
        const data = await getGenres();
        this.genres = data;
      } catch (error) {
        this.error = "No se pudieron cargar los géneros";
        console.error(error);
      }
    },

    async searchByName(name: string) {
      try {
        this.loading = true;
        this.error = null;

        const data = await searchVideogamesByName(name);

        this.videogames = data;
      } catch (error) {
        this.error = "No se encontró ese videojuego";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    resetVideogames() {
      this.videogames = this.allVideogames;
    },

    filterByGenre(genreName: string) {
      if (genreName === "all") {
        this.videogames = this.allVideogames;
        return;
      }

      this.videogames = this.allVideogames.filter((game) =>
        game.genres?.some((genre) => getGenreName(genre) === genreName),
      );
    },

    filterByOrigin(origin: string) {
      if (origin === "all") {
        this.videogames = this.allVideogames;
        return;
      }

      if (origin === "api") {
        this.videogames = this.allVideogames.filter(
          (game) => !game.createdInDb,
        );
        return;
      }

      if (origin === "db") {
        this.videogames = this.allVideogames.filter(
          (game) => game.createdInDb,
        );
      }
    },

    orderByName(order: "asc" | "desc") {
      this.videogames = [...this.videogames].sort((a, b) => {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    },

    orderByRating(order: "asc" | "desc") {
      this.videogames = [...this.videogames].sort((a, b) => {
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;

        return order === "asc" ? ratingA - ratingB : ratingB - ratingA;
      });
    },
  },
});
