<template>
  <div class="filter-select">
    <select v-model="selectedRegion" class="filter-dropdown">
      <option value="" disabled selected>Select a region</option>
      <option v-for="region in regions" :key="region" :value="region">
        {{ region }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    regions: {
      type: Array,
      default: () => [],
    },
    region: {
      type: String,
      default: "",
    },
  },
  emits: ["update:region"],
  computed: {
    selectedRegion: {
      get() {
        return this.region;
      },
      set(value) {
        this.$emit("update:region", value);
      },
    },
  },
};
</script>

<style>
.filter-select {
  width: 500px;
  padding: 8px;
}
.filter-dropdown {
  width: 100%;
  padding: 11px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  color: black;
  font-size: 14px;
  outline: none;

  cursor: pointer;
}
.filter-dropdown option {
  color: black;
}
</style>
