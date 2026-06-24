<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="landing">
    <section class="landing__content">
      <h1>PI Videogames</h1>

      <p>
        Aplicación fullstack de videojuegos reconstruida con Vue 3,
        TypeScript, Pinia y Vite.
      </p>

      <RouterLink class="landing__button" to="/home">
        Entrar
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
  color: white;
}

.landing__content {
  max-width: 720px;
  text-align: center;
}

.landing h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  margin-bottom: 16px;
}

.landing p {
  font-size: 1.25rem;
  margin-bottom: 32px;
}

.landing__button {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 999px;
  background: white;
  color: #111;
  text-decoration: none;
  font-weight: bold;
}
</style>
