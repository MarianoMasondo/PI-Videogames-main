<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVideogames } from "../services/videogamesService";
import type { Videogame } from "../types/videogame";

const videogames = ref<Videogame[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const loadVideogames = async () => {
  try {
    loading.value = true;
    error.value = null;

    const data = await getVideogames();

    videogames.value = data;

    console.log("Videojuegos recibidos:", data);
  } catch (err) {
    error.value = "No se pudieron cargar los videojuegos";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadVideogames();
});
</script>

<template>
  <main>
    <h1>Videojuegos</h1>

    <p v-if="loading">Cargando videojuegos...</p>

    <p v-if="error">
      {{ error }}
    </p>

    <p v-if="!loading && !error">
      Cantidad de videojuegos: {{ videogames.length }}
    </p>

    <section>
      <article
        v-for="game in videogames"
        :key="game.id"
      >
        <h2>{{ game.name }}</h2>

        <img
          v-if="game.image || game.background_image"
          :src="game.image || game.background_image"
          :alt="game.name"
          width="200"
        />

        <p>Rating: {{ game.rating ?? "Sin rating" }}</p>
      </article>
    </section>
  </main>
</template>
