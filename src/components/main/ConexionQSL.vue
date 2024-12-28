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
        <p>convenio seleccionado: {{ this.selectedConvenio }}</p>
      </header>

      <div class="convenios-search">
        <p style="color:greenyellow;">({{ resultados.length }})</p>
        <input type="text" class="search-input" placeholder="Buscar por primer criterio..." v-model="busqueda" @input="buscar" />
        <input v-if="boton" type="text" class="search-input" placeholder="Buscar por segundo criterio..."
          v-model="busquedados" @input="buscar" />
      </div>

      <section class="convenios-list">
        <div v-for="convenio in resultados" :key="convenio.numero" class="convenio-item">
          <ConvenioCard :convenioTitle="convenio.numero" :convenioContent="convenio.descripcion"
            :state="convenio.estado" @access="updateSelectedConvenio" />
        </div>
      </section>

    </div>

    <div class="modal-overlay" v-if="showModal">
    <div class="animate__animated animate__backInLeft modal1">
      <div class="modalx3"><button class="btnmodal" @click="showModal = false">x</button></div>
      <div class="modalx1">
        <h1>{{ selectedConvenio }}</h1>
      </div>
      <div class="modalx2">{{ textConvenio }}</div>
      
    </div>
  </div>

    <div v-if="convenios.length==0" class="loading-container">
      <div class="spinner-wrapper">
        <span class="spinner"></span>
        <p>Cargando convenios, por favor espera...</p>
      </div>
    </div>

  </div>
</template>

<script>
import ConvenioCard from "./ConvenioCard.vue";
import { fetchConvenios,fetchConvenioId, fetchCantidadConvenios, buscarConvenios } from "@/services/convenioService";

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
      selectedConvenio: null,
      textConvenio:"",
      showModal:false
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
    async updateSelectedConvenio(numero) {
      this.selectedConvenio = numero;
      this.showModal = true;
      this.textConvenio = await fetchConvenioId(numero);
      console.log('Convenio seleccionado:', numero); // Confirmación en consola
    }
  }
};
</script>


<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: #f7f7f7;
  margin: 0;
}
.modal-overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.912);
  
}
.modal1 {
  position: relative;
  width: 50%;
  height: 50vh;
  color: #17202A;
  background-color: aliceblue;
  text-align: center;
  top: 25%;
  left: 25%;
  border-radius: 0px;
  font-family: 'Inter', sans-serif;
  padding: 15px;
}
.modalx3{
width: 100%;
display: flex;
  justify-content: flex-end; /* Alinea los elementos al final (derecha) */

}
.btnmodal {
  /* Estilos para el botón */
  font-size: 2em; /* Aumenta el tamaño de la cruz */
  border: none;
  background: none;
  color: red;
  cursor: pointer;
  padding: 5px 10px; /* Ajusta el padding */
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
  align-items: center; /* Centra verticalmente */
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
  background-image: linear-gradient(to bottom, rgba(54, 54, 54, 0.509) 10%, #15151d 90%);
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
