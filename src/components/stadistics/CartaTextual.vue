<template>
    <div class="Carta" :style="{ backgroundColor: color }">

        <h1 class="Carta-dato">{{ dato }}</h1>
        <h5 class="Carta-mensaje">{{ mensaje }}</h5>

    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CartaTextual',
    props: {
        mensaje: {
            type: String,
            default: 'x'
        },
        dato: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'black'
        }
    },
    setup() {
        
    }
});
</script>

<style scoped>
.Carta {
    width: 100%;
    height: 160px;
    background-color: rgb(34, 63, 63);
    border: 2px solid black;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}
.Carta:hover{
    background-color: black;
    color: aliceblue;
}

.Carta-top {
    width: 100%;
    height: 10px;
    background-color: aqua;
}

.Carta-dato {

    color: black;
}
.Carta-dato:hover{
    color: #4b4b4b;
}

.Carta-mensaje {
    color: #4b4b4b;
}
</style>