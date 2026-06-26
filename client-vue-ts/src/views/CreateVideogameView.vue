<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useVideogamesStore } from "../stores/videogamesStore";
import { createVideogame } from "../services/videogamesService";
import type { CreateVideogamePayload } from "../types/videogame";

type FormErrors = Partial<Record<keyof CreateVideogamePayload, string>>;

const router = useRouter();
const store = useVideogamesStore();

const submitting = ref<boolean>(false);
const submitError = ref<string | null>(null);

const form = reactive<CreateVideogamePayload>({
  name: "",
  description: "",
  platforms: "",
  image: "",
  released: "",
  rating: 0,
  genres: [],
});

const errors = reactive<FormErrors>({});

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof FormErrors];
  });
};

const validateForm = (): boolean => {
  clearErrors();

  if (form.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }

  if (form.description.trim().length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  }

  if (!form.platforms.trim()) {
    errors.platforms = "Tenés que ingresar al menos una plataforma";
  }

  if (form.image && !form.image.startsWith("http")) {
    errors.image = "La imagen debe ser una URL válida";
  }

  if (form.rating < 0 || form.rating > 5) {
    errors.rating = "El rating debe estar entre 0 y 5";
  }

  if (form.genres.length === 0) {
    errors.genres = "Seleccioná al menos un género";
  }

  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    submitting.value = true;
    submitError.value = null;

    await createVideogame({
      name: form.name.trim(),
      description: form.description.trim(),
      platforms: form.platforms.trim(),
      image: form.image.trim(),
      released: form.released,
      rating: Number(form.rating),
      genres: form.genres,
    });

    await store.fetchVideogames();

    router.push("/home");
  } catch (error) {
    submitError.value = "No se pudo crear el videojuego";
    console.error(error);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  if (store.genres.length === 0) {
    store.fetchGenres();
  }
});
</script>

<template>
  <main class="create">
    <RouterLink class="back-link" to="/home">
      Volver
    </RouterLink>

    <h1>Crear videojuego</h1>

    <form class="create-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input id="name" v-model="form.name" type="text" />
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea id="description" v-model="form.description"></textarea>
        <small v-if="errors.description">{{ errors.description }}</small>
      </div>

      <div class="form-group">
        <label for="platforms">Plataformas</label>
        <input
          id="platforms"
          v-model="form.platforms"
          type="text"
          placeholder="PC, PlayStation, Xbox"
        />
        <small v-if="errors.platforms">{{ errors.platforms }}</small>
      </div>

      <div class="form-group">
        <label for="image">Imagen URL</label>
        <input
          id="image"
          v-model="form.image"
          type="text"
          placeholder="https://..."
        />
        <small v-if="errors.image">{{ errors.image }}</small>
      </div>

      <div class="form-group">
        <label for="released">Fecha de lanzamiento</label>
        <input id="released" v-model="form.released" type="date" />
      </div>

      <div class="form-group">
        <label for="rating">Rating</label>
        <input
          id="rating"
          v-model.number="form.rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
        />
        <small v-if="errors.rating">{{ errors.rating }}</small>
      </div>

      <fieldset class="genres-fieldset">
        <legend>Géneros</legend>

        <label
          v-for="genre in store.genres"
          :key="genre.id ?? genre.name"
          class="genre-option"
        >
          <input
            v-model="form.genres"
            type="checkbox"
            :value="genre.name"
          />
          {{ genre.name }}
        </label>

        <small v-if="errors.genres">{{ errors.genres }}</small>
      </fieldset>

      <p v-if="submitError" class="submit-error">
        {{ submitError }}
      </p>

      <button type="submit" :disabled="submitting">
        {{ submitting ? "Creando..." : "Crear videojuego" }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.create {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: inherit;
}

.create-form {
  display: grid;
  gap: 18px;
}

.form-group {
  display: grid;
  gap: 6px;
}

.form-group input,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group textarea {
  min-height: 140px;
  resize: vertical;
}

small {
  color: crimson;
}

.genres-fieldset {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.genres-fieldset legend {
  padding: 0 8px;
  font-weight: bold;
}

.genre-option {
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eee;
  cursor: pointer;
}

.submit-error {
  color: crimson;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
