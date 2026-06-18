import { defineStore } from "pinia";
import type { Genre, Videogame } from "../types/videogame";
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
  },
});
