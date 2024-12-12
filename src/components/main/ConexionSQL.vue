<template>
    <h1>Base de datos de convenios</h1>
    <div class="container">
      <input type="text" v-model="searchQuery" placeholder="Buscar convenio">
  
      <div class="item" v-for="convenio in filteredConvenios" :key="convenio.numero">
        <ConvenioCard :convenioTitle="convenio.numero" :convenioContent="convenio.descripcion" :state="convenio.estado" />
      </div>
  
      <div v-if="filteredConvenios.length === 0">
        <div class="item" v-for="convenio in convenios" :key="convenio.numero">
      <ConvenioCard :convenioTitle="convenio.numero" :convenioContent="convenio.descripcion" :state="convenio.estado" />
    </div>
      </div>
    </div>
  </template>
  
  <script>
  import ConvenioCard from "./ConvenioCard.vue";
  import axios from 'axios';
  
  export default {
    components: {
      ConvenioCard
    },
    data() {
      return {
        convenios: [],
        searchQuery: '',
      };
    },
    computed: {
      filteredConvenios() {
        if (!this.convenios.length) {
          console.warn('No hay convenios cargados');
          return [];
        }
  
        return this.convenios.filter(convenio => {
          if (!convenio.numero) {
            console.warn('Convenio sin número:', convenio);
            return false;
          }
  
          const searchTerm = this.searchQuery.toLowerCase();
          return convenio.numero.toLowerCase().includes(searchTerm) ||
                 convenio.descripcion?.toLowerCase().includes(searchTerm);
        });
      }
    },
    mounted() {
      this.fetchConvenios();
    },
    methods: {
      fetchConvenios() {
        axios.get('192.168.201.10:3000/convenios')
          .then(response => {
            this.convenios = response.data;
          })
          .catch(error => {
            console.error("Error al obtener los convenios:", error);
          });
      }
    }
  };
  </script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Tres columnas de igual ancho */
  gap: 5px;
  /* Espacio entre columnas */
}

.item {
  width: 100%;
  padding: 20px;
  text-align: center;
}
</style>
