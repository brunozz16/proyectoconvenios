<template>
    <div class="divestadistica">
        <canvas id="myChart1"></canvas>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import axios from 'axios';

export default {
    name: 'LineChart',
    data() {
        return {
            totalFechas: [],
            anios: [],
            valuesanio: []
        }
    },
    mounted() {
        this.fetchFechasConvenios();
    },
    methods: {
        fetchFechasConvenios() {
            axios.get('http://localhost:3000/fechas')
                .then(response => {
                    this.totalFechas = response.data;
                    this.anios = response.data.map(item => item.anio);
                    this.valuesanio = response.data.map(item => item.total);

                    console.log("Datos anios:", this.anios);
                    console.log("Datos valores:", this.valuesanio);

                    // Solo crear el gráfico después de que los datos estén listos
                    this.crearGraficoLinea(this.anios, this.valuesanio);
                })
                .catch(error => {
                    console.error('Error al obtener el total de convenios:', error);
                });
        },
        crearGraficoLinea(valoranios, valores) {
            const ctx = document.getElementById('myChart1').getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Ajusta las coordenadas según el tamaño de tu canvas
            gradient.addColorStop(0, 'rgba(5, 299, 2)'); // Color inicial
            gradient.addColorStop(1, 'rgba(254, 2, 5)'); // Color final

            new Chart(ctx, {
                type: 'line',
                data: {
                    tension: 0.1,
                    labels: valoranios,
                    datasets: [{
                        borderColor: 'rgba(75, 192, 192, 1)',
                        label: 'Historico de convenios',
                        data: valores,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ]
                    },
                    {
                        label: 'Vigentes', // Nombre de la segunda línea
                        data: [], // Datos para la segunda línea
                        borderColor: gradient, // Color de la línea
                        fill: false // Opcional: para no rellenar el área bajo la línea
                    }]
                },
                options: {
                    // Aquí puedes personalizar las opciones del gráfico
                    maintainAspectRatio: false
                }
            });
        }
    }
}
</script>

<style scoped>
.divestadistica {
    background-color: #111;
    padding: 20px;
    height: 300px;
}

.divestadistica:hover {
    scale: 1.02;
}

#myChart1 {
    border: 3px solid wheat;
    border-radius: 10px;
}
</style>
