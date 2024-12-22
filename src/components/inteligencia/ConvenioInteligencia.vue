<template>
  <div class="inteligencia-container animate__animated animate__fadeInUp" id="idInteligencia">
    <div class="inteligencia-header">
      <h1>GEMINI AI</h1>
      <p>Total tokens usados: {{ totalTokensUsed }}</p>
    </div>

    <div class="inteligencia-form">
      <div class="form-group">
        <label for="nroconvenio">Número de Convenio</label>
        <input type="number" id="nroconvenio" v-model="prompt" placeholder="Ingresa el número de convenio"
          class="form-control" />
      </div>
      <div class="form-group">
        <label for="pregunta">Pregunta</label>
        <textarea id="pregunta" v-model="pregunta" placeholder="Ingresa tu pregunta" class="form-control" />
      </div>
      <button @click="handleGenerateText" class="btn">Realizar Consulta</button>
    </div>

    <div class="inteligencia-resultados" v-if="generatedText">
      <h5>{{ generatedText }}</h5>
    </div>
  </div>
</template>

<script>
import convenioService from "@/services/convenioService";
import aiClient from "@/services/aiClient";

export default {
  data() {
    return {
      prompt: "",
      pregunta: "",
      generatedText: "Esperando consulta...",
      totalTokensUsed: 0,
      arregloconvenios: [],
      prueba:""
    };
  },
  async mounted() {
    this.arregloconvenios = await convenioService.fetchConvenios();
  },
  methods: {
    async handleGenerateText() {
      if (!this.prompt || !this.pregunta) {
        alert("Por favor, llena todos los campos");
        return;
      }

      if (!this.arregloconvenios.some(convenio => convenio.numero === Number(this.prompt))) {
        this.generatedText = "Convenio no encontrado";
        alert("El convenio no está registrado en el sistema");
        return;
      }
      
      try {
        const pdf = await convenioService.getConvenioPDF(this.prompt);
        this.generatedText = await aiClient.generateResponse(pdf, this.pregunta);
        
      } catch (error) {
        this.generatedText = "Error al procesar la consulta";
      }
      
    },
  },
};
</script>

<style scoped>
.inteligencia-container {
  max-width: 100%;
  height: 70vh;
  margin: 20px auto;
  padding: 20px;
  background-color: #000000bc;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.inteligencia-header {
  text-align: center;
  margin-bottom: 20px;
}

.inteligencia-header h1 {
  font-size: 24px;
  color: #ffffff;
}

.inteligencia-form {
  margin-bottom: 20px;
  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
  place-items: center;
}

.form-group {
  margin-bottom: 15px;
  width: 80%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.btn {
  
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.inteligencia-resultados {
  text-align: center;
  padding: 10px;
  min-height: 20vh;
  background-color: #e9ecef;
  border-radius: 4px;
}

.inteligencia-resultados h5 {
  font-size: 16px;
  color: #495057;
}

.inteligencia-resultados h4 {
  font-size: 18px;
  color: #212529;
  font-weight: bold;
}
</style>
