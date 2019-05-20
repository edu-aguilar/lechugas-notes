<template>

    <div class="create-user-container">
        <form name="myForm">
           <label for="one">Email: </label>  <input type="text" id="femail"> <br>
           <label for="one">Name: </label>  <input type="text" id="fname"> <br>
           <label for="one">Password: </label>  <input type="text" id="fpassword"> <br>
           <label for="one">Fecha nacimiento: </label>  <input type="text" id="fborn"> <br>
            <input type="submit" v-on:click="validation" value="Create User">
        </form>
    </div>

</template>

<script>

export default {
    name: 'CreateUser',
    data: {
        name: "Eduardo"
    },
    methods: {
        validation: function () {
            console.log("hola que tal soy colosal"+this.name)
        }
    }
}

</script>

<style>
    div.create-user-container {
        background-color: red;
        width: 500px;
        height: auto;
        padding: 5px;
        color: white;
    }

    

</style>

