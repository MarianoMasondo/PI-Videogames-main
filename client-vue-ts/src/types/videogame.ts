export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  platform?: {
    id: number;
    name: string;
  };
  name?: string;
}

export interface Videogame {
  id: string | number;
  name: string;
  description?: string;
  platforms?: Platform[] | string[];
  image?: string;
  background_image?: string;
  released?: string;
  rating?: number;
  genres?: Genre[];
  createdInDb?: boolean;
}

export interface CreateVideogamePayload {
  name: string;
  description: string;
  platforms: string[];
  image: string;
  released: string;
  rating: number;
  genres: number[];
}
