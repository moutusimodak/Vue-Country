<template>
  <router-link :to="`/country/${country.cca3}`" class="card">
    <img
      :src="country.flags.png"
      :alt="country.name.common"
      class="card-image"
    />
    <h3 class="card-title">{{ country.name.common }}</h3>
    <p><b>Population:</b> {{ country.population.toLocaleString() }}</p>
    <p><b>Region:</b> {{ country.region }}</p>
    <p><b>Capital:</b> {{ country.capital }}</p>
  </router-link>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* Light Mode  */
.card {
  display: block;
  padding: 16px;
  background-color: white;
  color: black;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: transform 0.2s, background-color 0.2s, color 0.2s;
}


.card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.card-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}

/* Dark Mode  */
body.dark-mode .card {
  background-color: #333;
  color: white;
}
</style>
