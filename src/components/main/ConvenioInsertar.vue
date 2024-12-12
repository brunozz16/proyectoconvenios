<template>
    <div class="insertar-menu" id="id4">
        <h1>Añadir un convenio</h1>
    </div>
    <div class="insertar-formulario">
        <form @submit.prevent="submitForm" class="insertar-formulario-form">
            <div class="form-group d-flex flex-row gap-3">
                <div class="flex-grow-1">
                    <label for="exampleInputEmail1">Número</label>
                    <input type="email" v-model="numero" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="número...">
                </div>
                <div class="flex-grow-1">
                    <label for="exampleInputPassword1">Norma Legal</label>
                    <input type="password" v-model="normalegal" class="form-control" id="exampleInputPassword1"
                        placeholder="norma legal...">
                </div>
            </div>
            <div class="form-group d-flex flex-row gap-3">
                <div class="flex-grow-1">
                    <label for="exampleInputPassword1">Descripcion</label>
                    <input type="password" v-model="descripcion" class="form-control" id="exampleInputPassword1"
                        placeholder="descripcion...">
                </div>
                <div class="flex-grow-1">
                    <label for="exampleInputPassword1">Fecha (DD/MM/AAAA)</label>
                    <input type="password" v-model="fecha" class="form-control" id="exampleInputPassword1"
                        placeholder="fecha...">
                </div>
            </div>    
                <div class="flex-grow-3">
                    <label for="exampleInputPassword1">Enlace</label>
                    <input type="password" v-model="enlace" class="form-control" id="exampleInputPassword1"
                        placeholder="enlace...">
                </div>
                <div class="flex-grow-3">
                    <label for="exampleInputPassword1">Resumen(opcional)</label>
                    <input type="password" v-model="resumen" class="form-control" id="exampleInputPassword1"
                        placeholder="resumen...">
                </div>
                <div class="flex-grow-4">
                    <label for="exampleInputPassword1">Pdf (link)</label>
                    <input type="password" v-model="pdf" class="form-control" id="exampleInputPassword1"
                        placeholder="pdf...">
                </div>
                <div class="flex-grow-4">
                    <label for="exampleInputPassword1">Estado(opcional)</label>
                    <input type="password" v-model="estado" class="form-control" id="exampleInputPassword1"
                        placeholder="estado...">
                </div>
    
            <button type="submit" class="btn btn-success" style="margin-top: 10px;">Enviar</button>
        </form>


    </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            numero: 0,
            normalegal: '',
            descripcion: '',
            fecha: '',
            enlace: '',
            resumen: '',
            pdf: '',
            estado: ''

        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:3000/insertar', {
                numero: this.numero,
                normalegal: this.normalegal,
                descripcion: this.descripcion,
                fecha: this.fecha,
                enlace: this.enlace,
                resumen: this.resumen,
                pdf: this.pdf,
                estado: this.estado
            })
                .then(response => {
                    console.log(response)
                    alert(response)
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                });
        }
    }

}
</script>

<style scoped>
.insertar-menu {
    width: 100%;
    height: 10vh;
    padding: 5px;
    background: linear-gradient(to right, #FF5020, #FF7E10, #FFA311, #FFB411);
    color: #494963;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
}

.insertar-formulario {
    width: 100%;
    height: 90vh;
    padding: 5px;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.insertar-formulario-form {
    height: 85vh;
    padding: 20px 120px;
    background-color: #000000;
    border-radius: 10px;

    border: 1px solid wheat;
}
.flex-grow-1 , .flex-grow-3 , .flex-grow-4{
    color: wheat;
}
.form-control{
    background-color: #000000;
    color:white ;
    
    
}
input::placeholder {
  color: #666;
  font-style: italic;
 
}
</style>