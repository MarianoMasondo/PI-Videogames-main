import axios from "axios";
import type {
  Videogame,
  Genre,
  CreateVideogamePayload,
} from "../types/videogame";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const getVideogames = async (): Promise<Videogame[]> => {
  const response = await axios.get<Videogame[]>(`${API_URL}/videogames`);
  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await axios.get<Genre[]>(`${API_URL}/genres`);
  return response.data;
};

export const getVideogameById = async (
  id: string | number
): Promise<Videogame> => {
  const response = await axios.get<Videogame>(`${API_URL}/videogames/${id}`);
  return response.data;
};

export const searchVideogamesByName = async (
  name: string
): Promise<Videogame[]> => {
  const response = await axios.get<Videogame[]>(
    `${API_URL}/videogames/name?name=${name}`
  );

  return response.data;
};

export const createVideogame = async (
  payload: CreateVideogamePayload
): Promise<Videogame> => {
  const response = await axios.post<Videogame>(
    `${API_URL}/videogames`,
    payload
  );

  return response.data;
};
