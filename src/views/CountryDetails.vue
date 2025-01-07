<template>
    <div>
      <NavBar />
      <div class="page-container">
        <button class="back-button" @click="goBack">
          ⬅ Back
        </button>
        <div class="container">
          <div v-if="error" class="error">{{ error }}</div>
          <div v-else-if="!country" class="loading">Loading...</div>
          <div v-else class="details-container">
            <img :src="country.flags.png" :alt="country.name.common" class="flag" />
            <div class="info">
              <h2 class="name">{{ country.name.common }}</h2>
              <div class="info-groups">
              <div class="info-group-a">
                <p><strong>Native Name:</strong> {{ nativeName }}</p>
                <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
                <p><strong>Region:</strong> {{ country.region }}</p>
                <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
                <p><strong>Capital:</strong> {{ capital }}</p>
              </div>
              <div class="info-group-b">
                <p><strong>Top Level Domain:</strong> {{ tld }}</p>
                <p><strong>Currencies:</strong> {{ currencies }}</p>
                <p><strong>Languages:</strong> {{ languages }}</p>
              </div>
            </div>
            <div style="display: inline-flex; align-items: center;">
                <p><strong>Border Countries:</strong></p>
                <div class="borders">
    
                  <button
                    v-for="(border, index) in country.borders"
                    :key="index"
                    class="border-button"
                    @click="goToCountry(border)"
                  >
                    {{ border }}
                  </button>
        
                  <span v-if="!country.borders || country.borders.length === 0">None</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { ref, onMounted ,computed} from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";


export default {
  components: { NavBar },
  setup() {

    const country = ref(null);
    const error = ref(null);
    const route = useRoute();
    const router = useRouter();

    const loadCountry = async () => {
      const code = route.params.code;
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        country.value = data[0];
        error.value = null;
      } catch (err) {
        console.error(err);
        error.value = "Could not fetch ";
      }
    };

    const goBack = () => router.back();
    const goToCountry = (code) => router.push(`/country/${code}`);

    const nativeName = computed(() =>
      country.value?.name?.nativeName
        ? Object.values(country.value.name.nativeName)[0].common
        : "NA"
    );
    const capital = computed(() =>
      country.value?.capital ? country.value.capital.join(", ") : "NA"
    );
    const tld = computed(() =>
      country.value?.tld ? country.value.tld.join(", ") : "NA"
    );
    const currencies = computed(() =>
      country.value?.currencies
        ? Object.values(country.value.currencies)
            .map((currency) => currency.name)
            .join(", ")
        : "NA"
    );
    const languages = computed(() =>
      country.value?.languages
        ? Object.values(country.value.languages).join(", ")
        : "NA"
    );

    onMounted(() => {
      loadCountry();
    });

    return {
  
      country,
      error,
      goBack,
      goToCountry,
    
      nativeName,
      capital,
      tld,
      currencies,
      languages,
    };
  },
};
</script>


<style>

.page-container {
  padding: 0 5%;
  width: 100%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button {
  padding: 10px 20px;
  border: none;
  background: #f3f3f3;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 20px;
}

.container {
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.details-container {
  display: flex;
  flex-direction: row;
  gap: 10%;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
}

.flag {
  width: 50%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 16px;
  padding: 20px;
  flex: 1; 
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-group-a, .info-group-b {
  flex-direction: row;
}

.info-groups {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.info p {
  margin-bottom: 17px;
}

.borders {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 10px;
  padding-bottom: 18px;
}

.border-button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background: #f3f3f3;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  font-weight: bold;
}

.loading {
  font-size: 18px;
  font-weight: bold;
}



/* Mobile*/
@media (max-width: 600px) {
  .details-container {
    flex-direction: column;
    gap: 20px; 
  }

  .flag {
    width: 100%;
    max-width: none;
    margin-bottom: 15px;
  }

  .info {
    font-size: 14px;
  }

  .info-groups {
    flex-direction: column;
    gap: 15px;
  }

  .info-group-a,
  .info-group-b {
    flex-direction: column;
  }

  .borders {
    justify-content: center;
    gap: 5px;
  }

  .border-button {
    font-size: 12px;
 
  }
}

/* Tab */

@media (min-width: 600px) and (max-width: 1024px) {
  .details-container {
    flex-direction: row;
    gap: 5%;
  }

  .flag {
    width: 40%;
  }

  .info {
    font-size: 16px;
  }

  .info-groups {
    flex-direction: column;
  }

  .info-group-a,
  .info-group-b {
    flex-direction: column;
  }

  .border-button {
    font-size: 14px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .details-container {
    flex-direction: row;
    gap: 10%;
  }

  .flag {
    width: 40%;
  }

  .info {
    font-size: 16px;
  }

  .info-groups {
    flex-direction: row;
    gap: 40px;
  }

  .border-button {
    font-size: 14px;
  }
}


</style>