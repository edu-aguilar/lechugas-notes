<template>
  <div class="note">
        <div :class="warningClass"> Quiere borrar esta nota?
          <div class="button-container">
          <button v-on:click="dispatchDeleteEvent"> Yes </button>
          <button v-on:click="hideWarningDiv"> No </button>
          </div>
        </div>
        <p> Note number: {{index+1}} </p>
        <p> Description: {{notesFormated.description}} </p>
        <p> Completed: {{notesFormated.completed}} <p>
        <p> Creation date: {{notesFormated.createdAt}} <p>
        <p> Last update: {{notesFormated.updatedAt}} </p>
        <DeleteNoteButton v-on:displayWarningDiv="displayWarningDiv"></DeleteNoteButton>
  </div>
</template>

<script>
import DeleteNoteButton from '@/components/delete-note-button.vue'
export default {
  name: 'Note',
  components: {
    DeleteNoteButton
  },
  data: function () {
    return {
      showWarning: false
    }
  },
  computed: {
    warningClass: function () {
      return `warning ${this.showWarning ? '' : 'hidden'}`
    }
  },
  props: {
    notesFormated: {
      _id: '',
      description: '',
      completed: '',
      createdAt: '',
      updateAt: ''
    },
    index: 0
  },
  methods: {
    displayWarningDiv () {
      this.showWarning = true
    },
    hideWarningDiv () {
      this.showWarning = false
    },
    dispatchDeleteEvent () {
      this.$emit('deleteNote', this.notesFormated._id)
    }

  }
}
</script>

<style>
div.note:before {
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
div.note {
  padding: 5px;
  margin: 5px;
  border: solid;
  min-width: 200px;
  background-color: wheat;
  position: relative;
  overflow: hidden;
}

div.warning {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(211, 158, 158, 0.9);
  z-index: 1;
  transition: transform 1s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
div.warning.hidden {
  transform: translateY(-100%)
}
</style>
