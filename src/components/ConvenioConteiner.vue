<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <PaginaInicio />
    
    <div class="modal-overlay" v-if="showModal">
            <div class="animate__animated animate__backInLeft modal1">
                <div class="modalx1"><h1>Convenio 3009</h1></div>
                <div class="modalx2"></div>
                <div class="modalx3"><button class="btnmodal" @click="showModal = false">cerrar</button></div>
            </div>
    </div>
    <ConexionSQL/>
    <ConvenioGrafico/>
    
   

    <div class="container">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle with-lightning">
    <div class="lightning"></div>
  </div>
</div>
    
</template>

<script>

//import ConvenioCard from "./main/ConvenioCard.vue";
import ConvenioGrafico from "./stadistics/ConvenioGrafico.vue";
import PaginaInicio from "./main/PaginaInicio.vue";
//import ConvenioBusqueda from "./main/ConvenioBusqueda.vue";
//import TituloConvenio from "./main/TituloConvenio.vue";
import ConexionSQL from "./main/ConexionQSL.vue";

//import ConvenioInteligencia from "./inteligencia/ConvenioInteligencia.vue";
//import ConvenioInsertar from "./main/ConvenioInsertar.vue";

export default {
    name: "ConvenioConteiner",
    data() {
        return {
            showModal: false
        };
    },
    components: {
        //ConvenioCard,
        ConvenioGrafico,
        PaginaInicio,
        //ConvenioBusqueda,
        //TituloConvenio,
        ConexionSQL,
        //ConvenioInteligencia,
        //ConvenioInsertar
    }
};
</script>

<style scoped>
.conteiner_conv {
    padding: 10px;
    background-color: #17202A;
    color: aliceblue;
    border-radius: 5px;
    border: 1px solid black;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-family: 'Inter', sans-serif;
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
  display: none; /* Ocultamos el modal por defecto */
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
    color: #17202A;
    background-color: aliceblue;
    text-align: center;
    top: 25%;
    left: 25%;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
}
.btnmodal{
    position: relative;
    background-color: aquamarine;
    bottom: 0;
    border-radius: 10px;
}
</style>