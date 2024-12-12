<template>
  <div class="divestadistica">
    <canvas id="myChart2"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: 'PieChart',
  mounted() {
    const ctx = document.getElementById('myChart2').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['No vigentes', 'Vigentes', 'Sin determinar'],
        datasets: [{
          label: 'Convenios',
          data: [120, 90, 30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 200, 23)',
            'rgb(255, 205, 86)'
          ]
        }]
      },
      options: {
        // Aquí puedes personalizar las opciones del gráfico
        
        maintainAspectRatio: false
      }
    });
  }
}
</script>


<style scoped>
.divestadistica {
  padding: 20px;
  background-color: #111;
  width: 100%;
  height: 300px;
}
.divestadistica:hover{
    scale: 1.02;
}
#myChart2{
  border: 3px solid wheat;
  border-radius: 10px;
}
</style>
