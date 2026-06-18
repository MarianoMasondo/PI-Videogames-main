<script setup lang="ts">
import { onMounted } from "vue";
import { useVideogamesStore } from "../stores/videogamesStore";
import VideogameCard from "../components/VideogameCard.vue";

const store = useVideogamesStore();

onMounted(() => {
  store.fetchVideogames();
  store.fetchGenres();
});
</script>

<template>
  <main class="home">
    <h1>Videojuegos</h1>

    <p v-if="store.loading">Cargando videojuegos...</p>

    <p v-if="store.error">
      {{ store.error }}
    </p>

    <p v-if="!store.loading && !store.error">
      Cantidad de videojuegos: {{ store.videogames.length }}
    </p>

    <section class="videogames-grid">
      <VideogameCard
        v-for="game in store.videogames"
        :key="game.id"
        :game="game"
      />
    </section>
  </main>
</template>

<style scoped>
.home {
  padding: 24px;
}

.videogames-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}
</style>
