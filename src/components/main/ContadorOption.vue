<template>
    <div class="cont-conteiner">
        <h3>{{ counter }}</h3>
        <button @click="addCounter">Incremento</button>
    </div>
</template>

<script>
    import { defineComponent } from "vue";
    export default defineComponent({
        name:'ContadorOption',
        data() {
            // atributos
            let counter = 0;
            return {counter}
        },
        methods: {
            // metodos
            addCounter(){
                this.counter++
            }
        }
    })
</script>

<style scoped>
.cont-conteiner{
    background-color: darksalmon;
    width: 45%;
    color:black;
    padding: 10px;
}
</style>