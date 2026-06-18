<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  search: [value: string];
  reset: [];
}>();

const searchValue = ref<string>("");

let timeoutId: ReturnType<typeof setTimeout> | null = null;

watch(searchValue, (newValue) => {
  const value = newValue.trim();

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    if (value.length === 0) {
      emit("reset");
      return;
    }

    if (value.length >= 3) {
      emit("search", value);
    }
  }, 500);
});

const handleSubmit = () => {
  const value = searchValue.value.trim();

  if (!value) {
    emit("reset");
    return;
  }

  emit("search", value);
};

const handleReset = () => {
  searchValue.value = "";
  emit("reset");
};
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <input
      v-model="searchValue"
      type="text"
      placeholder="Buscar videojuego..."
      class="search-bar__input"
    />

    <button type="submit" class="search-bar__button">
      Buscar
    </button>

    <button
      type="button"
      class="search-bar__button"
      @click="handleReset"
    >
      Limpiar
    </button>
  </form>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 12px;
  margin: 24px 0;
}

.search-bar__input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-bar__button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
