<template>
  <div class="inteligencia-container" id="idInteligencia">
    <div class="inteligencia-header">
      <h1>GEMINI AI</h1>
      <p>Total tokens usados: {{ totalTokensUsed }}</p>
    </div>

    <div class="inteligencia-form">
      <div class="form-group">
        <label for="nroconvenio">Número de Convenio</label>
        <input
          type="number"
          id="nroconvenio"
          v-model="prompt"
          placeholder="Ingresa el número de convenio"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="pregunta">Pregunta</label>
        <input
          type="text"
          id="pregunta"
          v-model="pregunta"
          placeholder="Ingresa tu pregunta"
          class="form-control"
        />
      </div>
      <button @click="handleGenerateText" class="btn btn-primary">
        Realizar Consulta
      </button>
    </div>

    <div class="inteligencia-resultados" v-if="generatedText || textoAuxiliar">
      <h5>{{ generatedText }}</h5>
      <h4>{{ textoAuxiliar }}</h4>
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
      textoAuxiliar: "...",
      totalTokensUsed: 0,
      arregloconvenios: [],
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

      if (!this.arregloconvenios.includes(Number(this.prompt))) {
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
  max-width: 50%;
  height: 50vh;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
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
  color: #343a40;
}

.inteligencia-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
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
  display: block;
  width: 100%;
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
