<template>
  <div class="create-note">
        <p> Description:  <input v-model="descriptionInput" type="search"></p>
        <p> Completed:    
          <select v-model="completedInput">
            <option value="true">Yes</option>
            <option value="false">No</option> 
          </select>
          <div class="button-container">
          <button :disabled='!isFormFilled' v-on:click="dispatchCreateNoteEvent"> Create </button>
          <button v-on:click="dispatchCloseCreateNoteForm"> Cancel </button>
  </div>
  </div>
</template>

<script>
import { completedFieldIsCorrect } from '@/utils.js'
export default {
  name: 'CreateNote',
  data: function () {
    return {
      showWarning: false,
      descriptionInput: '',
      completedInput: ''
    }
  },
  computed: {
    isFormFilled: function () {
      return this.descriptionInput && this.completedInput
  }
  },
  methods: {
    dispatchCreateNoteEvent () {
      this.$emit('createnote', { completed: this.completedInput, description: this.descriptionInput })
    },
    dispatchCloseCreateNoteForm () {
      this.$emit('closecreatenoteform')
    }
  }
}
</script>

<style>
div.create-note:before {
  content: '';
  display: block;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 10;
  left: -10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../assets/Chincheta.png");
}
div.create-note {
  padding: 5px;
  margin: 5px;
  border: solid;
  width: 200px;
  height: auto;
  background-color: wheat;
  position: relative;
  overflow: hidden;
}
</style>
