<script setup lang="ts">
import type { Genre } from "../types/videogame";

defineProps<{
  genres: Genre[];
}>();

const emit = defineEmits<{
  filterGenre: [genreName: string];
  filterOrigin: [origin: string];
  orderName: [order: "asc" | "desc"];
  orderRating: [order: "asc" | "desc"];
  reset: [];
}>();
</script>

<template>
  <section class="filters-bar">
    <select @change="emit('filterGenre', ($event.target as HTMLSelectElement).value)">
      <option value="all">Todos los géneros</option>

      <option
        v-for="genre in genres"
        :key="genre.id ?? genre.name"
        :value="genre.name"
      >
        {{ genre.name }}
      </option>
    </select>

    <select @change="emit('filterOrigin', ($event.target as HTMLSelectElement).value)">
      <option value="all">Todos los orígenes</option>
      <option value="api">API</option>
      <option value="db">Base de datos</option>
    </select>

    <select @change="emit('orderName', ($event.target as HTMLSelectElement).value as 'asc' | 'desc')">
      <option disabled selected>Ordenar por nombre</option>
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>

    <select @change="emit('orderRating', ($event.target as HTMLSelectElement).value as 'asc' | 'desc')">
      <option disabled selected>Ordenar por rating</option>
      <option value="desc">Mayor rating</option>
      <option value="asc">Menor rating</option>
    </select>

    <button type="button" @click="emit('reset')">
      Reset
    </button>
  </section>
</template>

<style scoped>
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
}

.filters-bar select,
.filters-bar button {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
</style>
