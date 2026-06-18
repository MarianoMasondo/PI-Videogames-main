<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Videogame } from "../types/videogame";

defineProps<{
  game: Videogame;
}>();
</script>

<template>
  <RouterLink
    class="videogame-card"
    :to="`/videogames/${game.id}`"
  >
    <img
      v-if="game.image || game.background_image"
      class="videogame-card__image"
      :src="game.image || game.background_image"
      :alt="game.name"
    />

    <div class="videogame-card__content">
      <h2>{{ game.name }}</h2>

      <p>
        Rating: {{ game.rating ?? "Sin rating" }}
      </p>

      <div v-if="game.genres?.length">
        <span
          v-for="genre in game.genres"
          :key="genre.id"
          class="videogame-card__genre"
        >
          {{ genre.name }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.videogame-card {
  display: block;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  color: inherit;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.videogame-card:hover {
  transform: translateY(-4px);
}

.videogame-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.videogame-card__content {
  padding: 16px;
}

.videogame-card__genre {
  display: inline-block;
  margin: 4px 4px 0 0;
  padding: 4px 8px;
  border-radius: 999px;
  background: #eee;
  font-size: 14px;
}
</style>
