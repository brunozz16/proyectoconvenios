<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet" />

  <div id="idConvenios">
    <div v-if="convenios.length">
      <header class="convenios-header">
        <h1>Convenios Disponibles</h1>
        <p>Total de convenios: <strong>{{ totalConvenios }}</strong></p>
      </header>

      <div class="convenios-search">
        <input type="text" class="search-input" placeholder="Buscar por primer criterio..." v-model="busqueda"
          @input="buscar" />
        <input v-if="boton" type="text" class="search-input" placeholder="Buscar por segundo criterio..."
          v-model="busquedados" @input="buscar" />
      </div>

      <section class="convenios-list">
        <div v-for="convenio in resultados" :key="convenio.numero" class="convenio-item">
          <ConvenioCard :convenioTitle="convenio.numero" :convenioContent="convenio.descripcion"
            :state="convenio.estado" />
        </div>
      </section>
    </div>

    <div v-else class="loading-container">
      <div class="spinner-wrapper">
        <span class="spinner"></span>
        <p>Cargando convenios, por favor espera...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ConvenioCard from "./ConvenioCard.vue";
import { fetchConvenios, fetchCantidadConvenios, buscarConvenios } from "@/services/convenioService";

export default {
  components: {
    ConvenioCard,
  },
  data() {
    return {
      convenios: [],
      totalConvenios: 0,
      busqueda: "",
      busquedados: "",
      resultados: [],
      boton: false,
    };
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      try {
        this.convenios = await fetchConvenios();
        this.resultados = [...this.convenios];
        this.totalConvenios = await fetchCantidadConvenios();
      } catch (error) {
        console.error("Error al inicializar datos:", error);
      }
    },
    async buscar() {
      if (!this.busqueda) {
        this.boton = false;
        this.busquedados = "";
        this.resultados = [...this.convenios];
        return;
      }

      this.boton = true;
      try {
        this.resultados = await buscarConvenios(this.busquedados || this.busqueda);
      } catch (error) {
        console.error("Error en búsqueda:", error);
      }
    },
  },
};
</script>


<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: #f7f7f7;
  margin: 0;
}

.convenios-header {
  text-align: center;
  background: linear-gradient(90deg, #ff7e10, #ffa311);
  padding: 20px;
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
}

.convenios-search {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.convenios-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
}

.convenio-item {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.convenio-item:hover {
  transform: translateY(-5px);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.spinner-wrapper {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #494963;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
