<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getVideogameById } from "../services/videogamesService";
import type { Videogame, Platform } from "../types/videogame";

const route = useRoute();
const router = useRouter();

const videogame = ref<Videogame | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const getPlatformName = (platform: Platform | string): string => {
  if (typeof platform === "string") {
    return platform;
  }

  return platform.platform?.name || platform.name || "Sin plataforma";
};

const loadVideogame = async () => {
  try {
    loading.value = true;
    error.value = null;

    const idParam = route.params.id;

    if (typeof idParam !== "string") {
      throw new Error("ID inválido");
    }

    const data = await getVideogameById(idParam);
    videogame.value = data;
  } catch (err) {
    error.value = "No se pudo cargar el detalle del videojuego";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push("/");
};

onMounted(() => {
  loadVideogame();
});
</script>

<template>
  <main class="detail">
    <button class="back-button" @click="goBack">
      Volver
    </button>

    <p v-if="loading">Cargando detalle...</p>

    <p v-if="error">
      {{ error }}
    </p>

    <section v-if="videogame && !loading" class="detail-card">
      <img
        v-if="videogame.image || videogame.background_image"
        class="detail-image"
        :src="videogame.image || videogame.background_image"
        :alt="videogame.name"
      />

      <div class="detail-content">
        <h1>{{ videogame.name }}</h1>

        <p>
          <strong>ID:</strong> {{ videogame.id }}
        </p>

        <p>
          <strong>Rating:</strong> {{ videogame.rating ?? "Sin rating" }}
        </p>

        <p>
          <strong>Lanzamiento:</strong> {{ videogame.released || "Sin fecha" }}
        </p>

        <div v-if="videogame.genres?.length">
          <strong>Géneros:</strong>

          <span
            v-for="genre in videogame.genres"
            :key="genre.id"
            class="tag"
          >
            {{ genre.name }}
          </span>
        </div>

        <div v-if="videogame.platforms?.length">
          <strong>Plataformas:</strong>

          <span
            v-for="platform in videogame.platforms"
            :key="getPlatformName(platform)"
            class="tag"
          >
            {{ getPlatformName(platform) }}
          </span>
        </div>

        <p class="description">
          <strong>Descripción:</strong>
          {{ videogame.description || "Sin descripción" }}
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.detail {
  padding: 24px;
}

.back-button {
  margin-bottom: 24px;
  padding: 8px 16px;
  cursor: pointer;
}

.detail-card {
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.detail-image {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
}

.detail-content {
  padding: 24px;
}

.tag {
  display: inline-block;
  margin: 6px 6px 0 0;
  padding: 4px 8px;
  border-radius: 999px;
  background: #eee;
  font-size: 14px;
}

.description {
  margin-top: 20px;
  line-height: 1.6;
}
</style>
