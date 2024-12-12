<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link  
 href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <div class="card_conv">
    <div class="state_conv" :style="{ backgroundColor: stateColor }"></div>
    <h3>{{ convenioTitle }}</h3>
    <p>{{ convenioContent }}</p>
    <button @click="showModal = true" class="btn_conv" >ACCEDER</button>
  </div>

  <div class="modal-overlay" v-if="showModal">
    <div class="animate__animated animate__backInLeft modal1">
      <div class="modalx1">
        <h1>{{ convenioTitle }}</h1>
      </div>
      <div class="modalx2">{{ convenioContent }}</div>
      <div class="modalx3"><button class="btnmodal" @click="showModal = false">CERRAR</button></div>
    </div>
  </div>

</template>

<script>
import { ref, computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    convenioTitle: {
      type: String,
      default: "vacio"
    },
    convenioContent: {
      type: String,
      default: "vacio"
    },
    state: {
      type: String,
      default: "prendido"
    }
  },
  setup(props) {
    // CONSTANTES
    const stateOptions = {
      prendido: "green",
      apagado: "red"
    };
    const showModal = ref(false);
    // FUNCIONES
    const stateColor = computed(() => stateOptions[props.state] || "red");

    return {
      stateColor,
      showModal
    };
  }
});
</script>

<style scoped>
.card_conv {
  padding: 10px;
  background-color: #212F3C;
  color: aliceblue;
  border-radius: 10px;
  border: 1px solid black;
  margin: 15px;
  font-family: 'Inter', sans-serif;
}

.card_conv:hover {
  background-color: rgb(121, 121, 121);
  color: #212F3C;
}

.state_conv {
  width: 100%;
  height: 4px;
  background-color: black;
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
  color: #17202A;
  background-color: aliceblue;
  text-align: center;
  top: 25%;
  left: 25%;
  border-radius: 0px;
  font-family: 'Inter', sans-serif;
  padding: 15px;
}

.btnmodal {
  position: relative;
  background-color: rgb(241, 101, 101);
  bottom: 0;
  padding: 10px;
  border-radius: 0px;
}
.btn_conv{
  background-color:  #58d68d ;
  padding: 10px;
  border: none;
}
</style>