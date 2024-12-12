<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />

  <div v-if="convenios.length">
    <div class="convenios-menu" id="id1">
      <h1>LISTA DE CONVENIOS ({{ totalConvenios }})</h1>
    </div>

    <div class="convenios-search">
      
      <input type="text" placeholder="buscar..." v-model="busqueda" @input="buscar" style="margin-right: 5px;"/>
      
      <input type="text" placeholder="segundo criterio..." v-if="boton" v-model="busquedados" @input="buscar"/>
    </div>

    <div class="container">
      <div class="item" v-for="convenio in resultados" :key="convenio.numero">
        <ConvenioCard
          :convenioTitle="convenio.numero"
          :convenioContent="convenio.descripcion"
          :state="convenio.estado"
        />
      </div>
    </div>
  </div>

  <div v-else>
    <div class="d-flex gap-2 justify-content-center py-5">
      <button class="btn btn-primary" type="button" disabled="">
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span role="status"
          ><font style="vertical-align: inherit"
            ><font style="vertical-align: inherit">
              Cargando Convenios...</font
            ></font
          ></span
        >
      </button>
    </div>
  </div>
</template>

<script>
import ConvenioCard from "./ConvenioCard.vue";
import axios from "axios";

export default {
  components: {
    ConvenioCard,
  },
  data() {
    return {
      convenios: [],
      totalConvenios: 0,
      totalFechas: [],
      prueba: 0,
      prendido: "prendido",
      busqueda: "",
      busquedados:"",
      resultados: [],
      boton:false
    };
  },
  mounted() {
    this.fetchConvenios();
    this.fetchCantidadConvenios();
    this.fetchFechasConvenios();
    this.buscar();
  },
  computed: {
    /*filteredConvenios() {
      return this.convenios.filter(convenio => {
        const numeroComoCadena = String(convenio.numero);
        return !this.searchInput || numeroComoCadena === this.searchInput;
      });
    }*/
  },
  methods: {
    fetchConvenios() {
      axios
        .get("http://localhost:3000/convenios")
        .then((response) => {
          this.convenios = response.data;
          this.resultados = response.data;
          //this.resultados=this.convenios;
          console.log(this.convenios);
        })
        .catch((error) => {
          console.error("Error en retornar convenios:", error);
        });
    },
    buscar() {
      // Aquí realiza la búsqueda
      // Si el primer criterio esta vacio
      if (this.busqueda == "") {
        this.boton=false;
        this.busquedados="";
        this.limpiarBusqueda();

      } else { // entra aqui si el primer criterio tiene datos
        this.resultados=[];
        this.boton=true;

        // si el segundo criterio esta vacio
        if(this.busquedados == ""){
        axios
          .get(`http://localhost:3000/busqueda?busqueda=${this.busqueda}`)
          .then((response) => {
            this.resultados = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
        }else{
          //alert("segundo campo");
          //this.busquedados="";
          axios
          .get(`http://localhost:3000/busqueda?busqueda=${this.busquedados}`)
          .then((response) => {
            this.resultados = response.data;

          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
    },
    buscarConvenios(id) {
      axios
        .get(`http://localhost:3000/convenios/${id}`)
        .then((response) => {
          this.convenios = response.data;
        })
        .catch((error) => {
          console.error("Error fetching convenios:", error);
        });
    },
    fetchCantidadConvenios() {
      axios
        .get("http://localhost:3000/cantidad")
        .then((response) => {
          //const { count } = response.data[0];
          this.totalConvenios = response.data[0]["COUNT(*)"];
        })
        .catch((error) => {
          console.error("Error al obtener el total de convenios:", error);
        });
    },
    fetchFechasConvenios() {
      axios
        .get("http://localhost:3000/fechas")
        .then((response) => {
          //const { count } = response.data[0];
          this.totalFechas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener el total de convenios:", error);
        });
    },
    fetchFechasConvenios6() {
      axios
        .get("http://localhost:3000/estadisticas")
        .then((response) => {
          const { totalultimoanio } = response.data[0]; // Acceder a "totalultimoanio"
          this.prueba = totalultimoanio;
        })
        .catch((error) => {
          console.error("Error al obtener el total de convenios:", error);
        });
    },
    limpiarBusqueda(){
      this.resultados=[];
      //this.fetchConvenios();
      axios
          .get(`http://localhost:3000/convenios`)
          .then((response) => {
            this.resultados = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    }
  },
};
</script>

<style scoped>
.btn-grafica-busqueda{
  background-color: #494963;
  border: none;
  margin-right: 3px;
}
.container {
  background-color: #494963;
  border-radius: 0px 0px 10px 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.item {
  width: 100%;
  padding: 20px;
  text-align: left;
}
.modal-overlay {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.658);
}
.modal {
  display: none;
  /* Ocultamos el modal por defecto */
  position: fixed;
  width: 400px;
  height: 400px;

  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ff0000;
  padding: 20px;
  z-index: 1000;
  /* Asegura que el modal esté por encima de otros elementos */
}
.modal1 {
  position: relative;
  width: 50%;
  height: 50vh;
  color: #17202a;
  background-color: aliceblue;
  text-align: center;
  top: 25%;
  left: 25%;
  border-radius: 20px;
  font-family: "Inter", sans-serif;
}
.btnmodal {
  position: relative;
  background-color: aquamarine;
  bottom: 0;
  border-radius: 10px;
}
.convenios-menu {
  width: 100%;
  height: 10vh;
  padding: 5px;
  background: linear-gradient(to right, #ff5020, #ff7e10, #ffa311, #ffb411);
  color: #494963;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
}
.convenios-search {
  width: 100%;
  height: 8vh;
  background-color: #494963;
  border-radius: 0px 0px 10px 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.c-search {
  width: 500px;
}
</style>