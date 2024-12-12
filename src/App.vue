<template>
  <div class="main">
    <ConvenioConteiner/>
  </div>
  
</template>

<script>
import ConvenioConteiner from './components/ConvenioConteiner.vue';

export default {
  name: "App",
  data() {
    return {
      
    };
  },
  components: {
    ConvenioConteiner
  }
};
</script>

<style>
.main{
  background-color: black;
}
</style>
