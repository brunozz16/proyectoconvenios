<template>
  <center>
    <div class="insertar-convenio animate__animated animate__fadeInUp" id="id4">
      <form @submit.prevent="submitForm" class="formulario">
        <h4>CARGAR UN NUEVO CONVENIO</h4>
        <div class="campo">
          <input type="number" v-model="numero" class="campo-entrada" id="numero"
            placeholder="Ingrese el número del convenio">
          <select v-model="normalegal" class="campo-entrada" id="normalegal">
            <option value="" disabled selected>Seleccione la norma legal</option>
            <option value="CONVENIO">CONVENIO</option>
            <option value="CONVENIO INTERNACIONAL">CONVENIO INTERNACIONAL</option>
          </select>
        </div>

        <div class="campo">
          <textarea v-model="descripcion" class="campo-entrada" id="descripcion" rows="4"
            placeholder="Ingrese una descripción del convenio"></textarea>
        </div>
        
        <div class="campo">
          <input type="date" v-model="fecha" class="campo-entrada" id="fecha" placeholder="Seleccione la fecha">
          <select v-model="estado" class="campo-entrada" id="estado">
            <option value="" disabled selected>Seleccione el estado</option>
            <option value="prendido">prendido</option>
            <option value="apagado">apagado</option>
          </select>
        </div>

        <div class="campo">
          <input type="text" v-model="enlace" class="campo-entrada" id="enlace"
            placeholder="Ingrese la URL del convenio (opcional)">
        </div>
        <div class="campo">

          <textarea v-model="resumen" class="campo-entrada" id="resumen" rows="4"
            placeholder="Ingrese un resumen del convenio (opcional)"></textarea>
        </div>
        <div class="campo">

          <input type="text" v-model="pdf" class="campo-entrada" id="pdf"
            placeholder="Ingrese la URL del PDF del convenio (opcional)">
        </div>

        <button type="submit" class="boton-enviar">Enviar</button>
      </form>
    </div>
  </center>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      numero: '',
      normalegal: '',
      descripcion: '',
      fecha: '',
      enlace: '',
      resumen: '',
      pdf: '',
      estado: '',
    };
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:3000/insertar', {
        numero: this.numero,
        normalegal: this.normalegal,
        descripcion: this.descripcion,
        fecha: this.fecha,
        enlace: this.enlace,
        resumen: this.resumen,
        pdf: this.pdf,
        estado: this.estado,
      })
        .then(response => {
          console.log(response);
          alert('Convenio añadido exitosamente!'); // Informative success message
        })
        .catch(error => {
          console.error(error);
          alert('Ocurrió un error al añadir el convenio.'); // Informative error message
        });
    }
  }
};
</script>

<style scoped>
.insertar-convenio {
  width: 100%;
  height: 80vh;
  padding: 2rem;
  background-color: #000000ae;
  /* Fondo claro para mejor contraste */
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  /* Fuente legible y común */
}

.formulario {
  width: 100%;
  height: 80vh;
  /* max-width: 500px; Ancho máximo para mejor visualización */
  background-color: #ffffff00;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.campo {
  margin-bottom: 1rem;
  display: flex;
  gap: 10px;
}

.campo label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.campo-entrada {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;
}

.campo-entrada:focus {
  border-color: #007bff;
  outline: none;
}

.boton-enviar {
  background-color: #007bff;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-weight: bold;
}

.boton-enviar:hover {
  background-color: #0056b3;
}

/* Estilos adicionales para mejorar la apariencia */
.cabecera {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* Responsividad */
@media (max-width: 768px) {
  .formulario {
    max-width: 90%;
  }
}
</style>