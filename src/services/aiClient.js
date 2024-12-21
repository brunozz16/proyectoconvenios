// services/aiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCNsQ9jlmRZolPtk6as5thYG84d8KrwPYI";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default {
  async generateResponse(convenioText, pregunta) {
    try {
      const consulta = await model.generateContent(
        `Tengo este convenio: '${convenioText}'. Respóndeme a la siguiente pregunta: ${pregunta}`
      );
      return consulta.response.text();
    } catch (error) {
      console.error("Error al generar respuesta con IA:", error);
      throw new Error("No se pudo generar la respuesta");
    }
  },
};
