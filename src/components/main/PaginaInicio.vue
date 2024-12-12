<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <div class="principal" id="principal">
    <div class="leftprincipal">
      <div class="topdiv animate__animated animate__slideInLeft">
        <div class="logo animate__animated animate__delay-1s animate__flipInX">
          <img :src="myImage" alt="Mi imagen" />
        </div>
      </div>
      <div class="centerdiv animate__animated animate__slideInLeft">
        <a class="cards animate__animated" href="#id1">
          <h3>Convenios</h3>
        </a>
        <a class="cards2 animate__animated" href="#id2">
          <h3>Estadísticas</h3>
        </a>
      </div>
      <div class="bottomdiv animate__animated animate__fadeInUp">
        <p>Documentación</p>
      </div>
    </div>
    <div class="rightprincipal">
      <div class="rightdiv animate__animated animate__slideInRight">
        <a href="#id4"
          ><button class="right-button">Insertar Convenio</button></a
        >
        <button class="right-button">Borrar Convenio</button>
        <button class="right-button">Editar Convenio</button>
      </div>
    </div>
  </div>

  <a href="#principal"> 
    <div class="flotante-principal"><i class="fas fa-home"></i></div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      myImage: require("../../assets/logoprovincia.png"),
    };
  },
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
  margin: 10px;
  padding: 15px 30px;
  background-color: #15151d;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
}
.right-button:hover {
  margin: 10px;
  padding: 15px 30px;
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
  background-size: cover; /* Adjust background size as needed */
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
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.centerdiv .cards2 h3 {
  margin-top: 60%;
  text-decoration: none;
  color: #111;
}

.centerdiv .cards:hover {
  transform: scale(1.05);
  border: 4px solid green;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.centerdiv .cards2:hover {
  transform: scale(1.05);
  border: 4px solid green;
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
</style>