<template>
  <!-- Importación de Bootstrap en el index.html para evitar recarga innecesaria -->
  <div class="estadisticas-container" id="idEstadisticas">
    <header class="estadisticas-header">
      <h1>ESTADÍSTICAS</h1>
    </header>

    <section class="estadisticas-opciones d-flex gap-3 justify-content-center">
      <CartaTextual mensaje="Convenios Totales" :dato="conveniosTotales" color="#4A69BD" />
      <CartaTextual mensaje="Convenios Último Año" :dato="conveniosUltimoAnio" color="#F7DC6F" />
      <CartaTextual mensaje="Convenios Este Año" :dato="conveniosEsteAnio" color="#2ECC71" />
      <CartaTextual mensaje="Convenios Último Mes" :dato="conveniosUltimoMes" color="#6495ED" />
    </section>

    <section class="estadisticas-graficos d-flex gap-3">
      <!-- Gráfico de Línea -->
      <div class="card p-3 flex-grow-1">
        <div class="card-grafico">
          <GraficoLinea />
        </div>
        <div class="card-body">
          <h4 class="card-title fw-bold">Histórico de Convenios</h4>
          <p class="card-text">
            El siguiente gráfico muestra la evolución temporal de los convenios registrados en nuestra base de datos.
          </p>
          <a href="#" class="btn btn-primary btn-lg">Más datos</a>
        </div>
      </div>

      <!-- Gráfico de Torta -->
      <div class="card p-3 flex-grow-1">
        <div class="card-grafico">
          <GraficoTorta />
        </div>
        <div class="card-body">
          <h4 class="card-title fw-bold">Convenios Vigentes</h4>
          <p class="card-text">
            Este gráfico clasifica los convenios en vigentes, no vigentes y sin verificar.
          </p>
          <a href="#" class="btn btn-primary btn-lg">Más datos</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import GraficoTorta from "../stadistics/GraficoTorta.vue";
import GraficoLinea from "../stadistics/GraficoLinea.vue";
import CartaTextual from "../stadistics/CartaTextual.vue";
import axios from "axios";

export default {
  components: {
    GraficoTorta,
    GraficoLinea,
    CartaTextual,
  },
  data() {
    return {
      conveniosTotales: 0,
      conveniosUltimoAnio: 0,
      conveniosEsteAnio: 0,
      conveniosUltimoMes: 0,
    };
  },
  mounted() {
    this.fetchEstadisticas();
  },
  methods: {
    async fetchEstadisticas() {
      try {
        const response = await axios.get("http://localhost:3000/estadisticas");
        const {
          total,
          totalultimoanio,
          totalanioactual,
          totalultimomes,
        } = response.data[0];
        this.conveniosTotales = total;
        this.conveniosUltimoAnio = totalultimoanio;
        this.conveniosEsteAnio = totalanioactual;
        this.conveniosUltimoMes = totalultimomes;
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilo general */
.estadisticas-container {
  height: 100vh;
  background-color: #15151d;
  padding: 20px;
}

/* Header */
.estadisticas-header {
  background: linear-gradient(to right, #ff5020, #ff7e10, #ffa311, #ffb411);
  color: #494963;
  text-align: center;
  padding: 20px 0;
  font-family: "Inter", sans-serif;
  border: 2px solid #000;
}

/* Opciones de estadísticas */
.estadisticas-opciones {
  padding: 20px 0;
}

/* Tarjetas de gráficos */
.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.card-grafico {
  width: 100%;
  height: 300px;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
  color: #555;
}

.btn {
  margin-top: 10px;
}
</style>
