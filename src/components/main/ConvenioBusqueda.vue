<template>
    <div class="cont-busqueda">
        <input class="input-busqueda" type="text" id="nombre" name="nombre" placeholder="Buscador">
        <button class="button-busqueda">BUSCAR</button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.cont-busqueda{
    width: 50%;
    background-color: #1c2632;
    color:white;
    border-radius: 5px;
    padding: 15px;
    margin: 10px 10px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.input-busqueda{
    margin-right: 10px;
    width: 50%;
    font: oblique 90% cursive;
    padding: 2px;
}
.button-busqueda{
    background-color: rgb(27, 116, 37);
    color: white;
    border-radius: 10px;
    padding: 2px 15px 2px 15px;
    font: oblique 90% cursive;
}
</style>