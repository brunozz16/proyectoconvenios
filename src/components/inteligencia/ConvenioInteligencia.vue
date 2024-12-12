<template>
  <div class="inteligencia-container" id="id3">
    <div class="inteligencia-menu">
      <h1>GEMINI AI (INTELIGENCIA ARTIFICIAL)</h1>
      <p>Total tokens usados: {{ totalTokensUsed }}</p>
    </div>
    <div class="inteligencia-contenido">
      <input
        type="number"
        class="inteligencia-input-nro"
        id="nroconvenio"
        v-model="prompt"
        placeholder="Ingresa el número de convenio aquí"
        
      />
      <input
        type="text"
        class="inteligencia-input"
        v-model="pregunta"
        placeholder="Ingresa tu pregunta aquí"
      />
      <button class="inteligencia-boton-buscar" @click="handleGenerateText">
        Realizar consulta
      </button>
    </div>
    <div class="inteligencia-resultados" id="div-busqueda">
      <h5>{{ generatedText }}</h5>
      <h4>{{ textoAuxiliar }}</h4>
    </div>
  </div>
</template>

<style scoped>
.inteligencia-container {
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
}

.inteligencia-menu {
  width: 100%;
  height: 10vh;
  background: linear-gradient(to right, #ff5020, #ff7e10, #ffa311, #ffb411);
  color: #494963;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}

.inteligencia-contenido {
  width: 100%;
  height: 50vh;
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inteligencia-input {
  width: 50%;
  height: 8vh;
  margin-bottom: 10px;
}
.inteligencia-input-nro {
  width: 50%;
  height: 8vh;
  margin-bottom: 10px;
  border: 3px solid red;
}

.inteligencia-boton-buscar {
  background-color: chartreuse;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}

.inteligencia-boton-buscar:hover {
  background-color: #494963;
  color: aliceblue;
}

.inteligencia-resultados {
  margin-top: 20px;
  text-align: center;
}
</style>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

export default {
  data() {
    return {
      prompt: "",
      pregunta: "",
      generatedText: "Esperando consulta...",
      textoAuxiliar: "...",
      apiKey: "AIzaSyCNsQ9jlmRZolPtk6as5thYG84d8KrwPYI",
      totalTokensUsed: 0,
      arregloconvenios: [],
    };
  },
  mounted(){
    this.checkConvenio();
  },
  methods: {
    // Método para obtener convenios y buscar el PDF asociado
    async fetchLink() {
      try {
        const { data: convenios } = await axios.get("http://localhost:3000/listaconvenios");
        this.arregloconvenios = convenios.map(convenio => convenio.numero);

        const { data } = await axios.get(`http://localhost:3000/convenios/${this.prompt}`);
        const { pdf } = data[0];
        this.generatedText = "pdf: " + pdf;
      } catch (error) {
        console.error("Error al obtener el convenio:", error);
      }
    },

    // Método para generar texto usando la IA
    async generateTextUsingAI() {
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      try {
        const consulta = await model.generateContent(
          `Tengo este convenio: '${this.generatedText}'. Respóndeme a la siguiente pregunta: ${this.pregunta}`
        );
        this.generatedText = consulta.response.text();
      } catch (error) {
        console.error("Error al generar el texto:", error);
        this.generatedText = "Tokens agotados!";
      }
    },

    // Método principal para manejar la generación del texto
    async handleGenerateText() {
      if (this.prompt === "" || this.pregunta === "") {
        alert("Debes llenar los campos");
        return;
      }

      await this.fetchLink();
      const miElemento = document.getElementById('id3');
      const miNroConvenio = document.getElementById('nroconvenio')

      if (this.arregloconvenios.includes(this.prompt)) {
        this.textoAuxiliar = "";
        miNroConvenio.style.borderColor = 'green'
        miElemento.style.backgroundColor = 'green';
        await this.generateTextUsingAI();
      } else {
        this.textoAuxiliar = "";
        this.generatedText = "Convenio no encontrado";
        miElemento.style.backgroundColor = 'red';
        alert("debe asegurarse de que el convenio se encuentre cargado en el sistema")
      }
    },

    async checkConvenio(){
      if(this.prompt==12){
        alert("nro 12")
      }
      const miNroConvenio = document.getElementById('nroconvenio')

      if (this.arregloconvenios.includes(this.prompt)) {
        miNroConvenio.style.borderColor = 'green'
        
      } else {
        miNroConvenio.style.borderColor = 'red'
      }
    }
  },
};
</script>
