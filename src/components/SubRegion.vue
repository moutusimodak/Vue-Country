<template>
    <div v-if="region && subregions.length > 0" class="subregion-container">
      <select v-model="subregion" @change="updateSubregion" class="subregion-select">
        <option value="" disabled selected>Filter by Subregion</option>
        <option v-for="sub in subregions" :key="sub" :value="sub">
            {{ sub }}
        </option>
      </select>
    </div>
  </template>

  <script>
  export default {
    props: {
      region: String,
      modelValue: String,
      subregions: Array,
      theme: String
    },
    data(){
        return{
            subregion:this.modelValue
        }
    },
    methods: {
      updateSubregion(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  };
  </script>
  
  <style>
 
  @media (min-width: 768px) {
    .subregion-container {
      width: 16.66%;
      margin-bottom: 0;
    }
  }
  
  .subregion-select {
 
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: black;
    font-size: 14px;
    outline: none;
  }

  </style>
  