<script setup lang="ts">
import { onMounted } from 'vue'
import { useVideogamesStore } from '../stores/videogamesStore'
import VideogameCard from '../components/VideogameCard.vue'
import SearchBar from '../components/SearchBar.vue'
import FiltersBar from '../components/FiltersBar.vue'
import { RouterLink } from 'vue-router'

const store = useVideogamesStore()

const handleSearch = (name: string) => {
  store.searchByName(name)
}

const handleReset = () => {
  store.resetVideogames()
}

onMounted(() => {
  store.fetchVideogames()
  store.fetchGenres()
})
</script>

<template>
  <main class="home">
    <h1>Videojuegos</h1>

    <RouterLink class="create-link" to="/create"> Crear videojuego </RouterLink>

    <SearchBar @search="handleSearch" @reset="handleReset" />

    <FiltersBar
      :genres="store.genres"
      @filter-genre="store.filterByGenre"
      @filter-origin="store.filterByOrigin"
      @order-name="store.orderByName"
      @order-rating="store.orderByRating"
      @reset="handleReset"
    />

    <p v-if="store.loading">Cargando videojuegos...</p>

    <p v-if="store.error">
      {{ store.error }}
    </p>

    <p v-if="!store.loading && !store.error">
      Cantidad de videojuegos: {{ store.videogames.length }}
    </p>

    <section class="videogames-grid">
      <VideogameCard v-for="game in store.videogames" :key="game.id" :game="game" />
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

.create-link {
  display: inline-block;
  margin: 12px 0 20px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #222;
  color: white;
  text-decoration: none;
}
</style>
