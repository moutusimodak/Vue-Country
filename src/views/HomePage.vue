<template>
  <div class="homepage">
    <NavBar />
    <div class="content">
      <div class="controls">
        <SearchBar v-model:search="search" />
        <FilterSelect v-model:region="region" :regions="regions" />
        <SubRegion 
          v-if="region"
          v-model:modelValue="subregion"
          :region="region"
          :subregions="filteredSubregions"
          
        />
        <SortCountry 
          v-model:modelValue="sortCountry"
          
        />
      </div>
      <div class="grid">
        <CountryCard
          v-for="country in filteredCountries"
          :key="country.cca3"
          :country="country"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import FilterSelect from "../components/FilterSelect.vue";
import SubRegion from "../components/SubRegion.vue";
import SortCountry from "../components/SortCountry.vue";
import CountryCard from "../components/CountryCard.vue";

export default {
  components: { NavBar, SearchBar, FilterSelect,SubRegion, SortCountry,CountryCard },
  setup() {
    const search = ref("");
    const region = ref("");
    const subregion = ref("");
    const countries = ref([]);
    const regions = ref([]);
    const sortCountry = ref("");

    onMounted(async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        countries.value = data;
        regions.value = [...new Set(data.map((country) => country.region))];
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      }
    });

    const filteredCountries = computed(() => {
      return countries.value.filter((country) => {
        const matchesSearch = search.value
          ? country.name.common
              .toLowerCase()
              .includes(search.value.toLowerCase())
          : true;
        const matchesRegion = region.value
          ? country.region === region.value
          : true;
        
        const matchesSubregion = subregion.value
          ? country.subregion === subregion.value
          : true;  
        return matchesSearch && matchesRegion && matchesSubregion;
      });
    });

    const filteredSubregions = computed(() => {
      const regionCountries = countries.value.filter(
        (country) => country.region === region.value
      );
      return [...new Set(regionCountries.map((country) => country.subregion))];
    });

    const sortedFilteredCountries = computed(() => {
      const sorted = [...filteredCountries.value];
      if (sortCountry.value === "populationAsc") {
        return sorted.sort((a, b) => a.population - b.population);
      }
      if (sortCountry.value === "populationDsc") {
        return sorted.sort((a, b) => b.population - a.population);
      }
      if (sortCountry.value === "areaAsc") {
        return sorted.sort((a, b) => a.area - b.area);
      }
      if (sortCountry.value === "areaDsc") {
        return sorted.sort((a, b) => b.area - a.area);
      }
      return sorted;
    });

    return {
      search,
      region,
      subregion,
      countries,
      regions,
      filteredCountries : sortedFilteredCountries,
      filteredSubregions,
      sortCountry
    };
  },
};
</script>

<style>
.content {
  padding-top: 80px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  gap: 16px;
}
@media (min-width: 768px) {
  .controls {
    flex-direction: row;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
 