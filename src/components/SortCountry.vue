<template>
    <div class="select-container">
      <select 
        v-model="sortCountry" 
        @change="updateSortCountry" 
        class="select-box" 
      >
        <option value="">Sort by</option>
        <option value="populationAsc">Population (Ascending)</option>
        <option value="populationDsc">Population (Descending)</option>
        <option value="areaAsc">Area (Ascending)</option>
        <option value="areaDsc">Area (Descending)</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
      
    },
    data(){
        return{
            sortCountry:this.modelValue
        }
    },
    methods: {
      updateSortCountry(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  };
  </script>
  
  <style>

  .select-box {
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: black;
    font-size: 14px;
    outline: none;
  }

  @media (min-width: 768px) {
    .select-container {
      width: 16.66%; 
      margin-bottom: 0;
    }
  }
  </style>
  