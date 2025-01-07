   <template>
    <div class="search-bar">
      <i class="search-icon">🔍</i>
      <input
        type="text"
        placeholder="Search for a country..."
        v-model="searchText"
        class="search-input"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      search: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        searchText: this.search, 
      };
    },
    watch: {
    
      searchText(newValue) {
        this.$emit("update:search", newValue); 
      },
    },
  };
  </script>
  
  <style>
  .search-bar {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
  }
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: black;
  }
  .search-input::placeholder {
    color: gray;
    font-style: italic;
  }
  </style>
  