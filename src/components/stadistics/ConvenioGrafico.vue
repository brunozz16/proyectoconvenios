<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

  <div class="estadisticas-conteiner">
    <div class="estadisticas-menu" id="id2">
      <h1>ESTADÍSTICAS</h1>
    </div>
    <div class="estadisticas-opciones d-flex gap-3">

      <CartaTextual mensaje="Convenios totales" :dato="conveniosTotales" :color="' #4A69BD'" />
      <CartaTextual mensaje="Convenios del último año" :dato="conveniosUltimosAnio" :color="' #f7dc6f'" />
      <CartaTextual mensaje="Convenios de este año" :dato="conveniosUltimoMes" :color="'#2ecc71'" />
      <CartaTextual mensaje="Convenios de este mes" :dato="conveniosUltimaSemana" :color="'#6495ED'" />
      
      

    </div>
    <div class="estadisticas-graficos d-flex justify-content-between gap-3">

      <div class="card p-3">
        <div class="card-grafico">
          <GraficoLinea />
        </div>
        <div class="card-body">
          <h4 class="card-title fw-bold">Histórico de convenios</h4>
          <p class="card-text">El siguiente gráfico presenta una representación visual de la evolución en el tiempo de
            los convenios cargados en nuestra base de datos. A través de este análisis, se podrá observar el crecimiento
            o disminución de los acuerdos establecidos a lo largo de los años.</p>
          <a href="#" class="btn btn-primary btn-lg">Más datos</a>
        </div>
      </div>

      <div class="card p-3">
        <div class="card-grafico">
          <GraficoTorta />
        </div>
        <div class="card-body">
          <h4 class="card-title fw-bold fs-4">Convenios actualmente vigentes</h4><h4 style="color: red">(MANTENIMIENTO)</h4>
          <p class="card-text">El gráfico a continuación presenta una clasificación de los convenios registrados,
            desglosándolos en convenios vigentes, no vigentes y aquellos cuya información no ha sido verificada. Esta
            representación visual permite identificar el estado actual de cada acuerdo.</p>
          <a href="#" class="btn btn-primary btn-lg">Más datos</a>
        </div>
      </div>

    </div>
    
  </div>
</template>

<style scoped>
.card-grafico {
  width: 100%;
}
.estadisticas-conteiner {
  background-color: #494963;
}

.card-torta {
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;

}

.estadisticas-menu {
  height: 10vh;

  padding: 30px;
  background: linear-gradient(to right, #FF5020, #FF7E10, #FFA311, #FFB411);
  color:#494963;
  font-family: 'Inter';
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
}

.estadisticas-graficos {
  width: 100%;
  display: flex;
  background-color: #333333;
}

.card {
  width: 50%;
  justify-content: center;
  align-items: center;
}

.estadisticas-opciones {
  width: 100%;
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>

<script>
import GraficoTorta from "../stadistics/GraficoTorta.vue"
import GraficoLinea from "../stadistics/GraficoLinea.vue"
import CartaTextual from "../stadistics/CartaTextual.vue"
import axios from 'axios';

export default {
  components: {
    GraficoTorta, GraficoLinea, CartaTextual
  },
  data() {
    return {

      conveniosTotales: 0,
      conveniosUltimosAnio: 0,
      conveniosUltimoMes: 0,
      conveniosUltimaSemana: 0
      

    };
  },
  mounted() {
    this.fetchEstadisticas();
    
  },
  computed: {

  },
  methods: {
    fetchEstadisticas() {
      axios.get('http://localhost:3000/estadisticas')
        .then(response => {
          const { total } = response.data[0];
          const { totalultimoanio } = response.data[0];
          const { totalanioactual } = response.data[0];
          const { totalultimomes } = response.data[0];
          this.conveniosTotales = total;
          this.conveniosUltimosAnio = totalultimoanio;
          this.conveniosUltimoMes = totalanioactual;
          this.conveniosUltimaSemana = totalultimomes;
        })
        .catch(error => {
          console.error('Error al obtener el total de convenios:', error);
        });
    }
  }
};
</script>