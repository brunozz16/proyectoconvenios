<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
    integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div class="principal" id="principal">
    <div class="leftprincipal">
      <div class="topdiv animate__animated animate__slideInLeft">
        <div class="logo animate__animated animate__delay-1s animate__flipInX">
          <img :src="myImage" alt="Mi imagen" />
        </div>
      </div>


      <div class="centerdiv animate__animated animate__slideInLeft">
        <div v-if="showContent==='Inicio'" class="displayInicio">
          <a class="cards animate__animated" href="#idConvenios">
            <h3>Convenios</h3>
          </a>
          <a class="cards2 animate__animated" href="#idEstadisticas">
            <h3>Estadísticas</h3>
          </a>
        </div>
        <div v-else-if="showContent==='Insert'" class="displayInicioIa">
          <ConvenioInsertar />
        </div>
        <div v-else-if="showContent==='Inteligencia'" class="displayInicioIa">
          <ConvenioInteligencia />
        </div>
      </div>


      <div class="bottomdiv animate__animated animate__fadeInUp">
        <p>Documentación</p>
      </div>
    </div>
    <div class="rightprincipal">
      <div class="rightdiv animate__animated animate__slideInRight">

        <a v-if="showContent!='Inicio'" class="right-button" id="button-ia" @click="toggleInicioContent"><i class="fa-solid fa-house" style="margin-right: 5px;"></i>Pagina de inicio</a>
        <a v-if="showContent!='Insert'" class="right-button" @click="toggleInsertContent"><i class="fa-solid fa-file-import" style="margin-right: 5px;" ></i> Gestionar Convenios</a>
        <a v-if="showContent!='Inteligencia'" class="right-button" id="button-ia" @click="toggleInteligenciaContent"><i class="fa-solid fa-brain" style="margin-right: 5px;"></i>Inteligencia Artificial</a>
      
      </div>
    </div>
  </div>

  <a href="#principal">
    <div class="flotante-principal"><i class="fas fa-home"></i></div>
  </a>
</template>

<script>
import ConvenioInteligencia from "../inteligencia/ConvenioInteligencia.vue";
import ConvenioInsertar from "../main/ConvenioInsertar.vue";

export default {
  data() {
    return {
      myImage: require("../../assets/logoprovincia.png"),
      showContent: 'Inicio', // Variable de control
    };
  },
  methods: {
    toggleInteligenciaContent() {
      this.showContent = 'Inteligencia';
    },
    toggleInsertContent() {
      this.showContent = 'Insert';
    },
    toggleInicioContent() {
      this.showContent = 'Inicio';
    }
  },
  components: {
    ConvenioInteligencia,
    ConvenioInsertar
  }
};
</script>

<style scope>
.flotante-principal {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 10000;
}

.principal {
  margin: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  color: aliceblue;
  display: flex;
  font-family: "Inter", sans-serif;
}

.leftprincipal {
  width: 80vw;
  height: 100vh;
}

.rightprincipal {
  width: 20vw;
  height: 100vh;
}

.right-button {
  width: 90%;
  margin: 10px;
  text-decoration: none;
  padding: 15px 15px;
  background-color: #15151d;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  /* Habilita Flexbox */
  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
}

.right-button:hover {
  margin: 10px;
  background-color: white;
  color: #15151d;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
}

.topdiv {
  width: 80vw;
  height: 8vh;
  background-color: #15151d;
}

.logo {
  height: 8vh;
  width: 8vh;
  padding: 1%;
}

.logo img {
  width: 100%;
}

.centerdiv {
  width: 80vw;
  height: 84vh;
  display: flex;
  background-color: #111;
  background-image: url("../../assets/puente.png");
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  padding: 60px;
}

.centerdiv .cards {
  width: 250px;
  height: 250px;
  margin: 2%;
  border-radius: 300px;
  background-color: rgb(255, 255, 255);
  animation: none;
  animation: zoomInDown;
  transition: transform 0.3s ease-in-out;
  animation-duration: 2s;
  background-image: url("../../assets/contrato.gif");
  /* Otras propiedades de fondo (opcional): */
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
  /* Centra la imagen */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.centerdiv .cards h3 {
  margin-top: 60%;
  text-decoration: none;
  color: #111;
}

.centerdiv .cards2 {
  width: 250px;
  height: 250px;
  margin: 2%;
  border-radius: 300px;
  background-color: rgb(255, 255, 255);
  animation: none;
  animation: zoomInDown;
  transition: transform 0.3s ease-in-out;
  animation-duration: 2s;
  background-image: url("../../assets/grafico-de-linea.gif");
  /* Otras propiedades de fondo (opcional): */
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
  /* Centra la imagen */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.centerdiv .cards2 h3 {
  margin-top: 60%;
  text-decoration: none;
  color: #111;
}

.centerdiv .cards:hover {
  transform: scale(1.05);
  box-shadow: inset 0 0 40px rgba(0, 255, 0, 0.65);
}

.centerdiv .cards2:hover {
  transform: scale(1.05);
  box-shadow: inset 0 0 40px rgba(0, 255, 0, 0.65);
}

.rightdiv {
  background-color: #15151d;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.bottomdiv {
  width: 100%;
  height: 8vh;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #15151d;
  color: white;
}

.centerdiv .displayInicio {
  width: 100%;
  display: flex;
  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
}

.centerdiv .displayInicioIa {
  width: 100%;

  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
}
</style>