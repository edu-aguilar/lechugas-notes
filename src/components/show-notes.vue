<template>
  <div class="notes-container">
    <dl class="note" v-for="(note, index) in notes" :key="note.id">
        <p> Note number: {{index+1}} </p>
        <p> Description: {{note.description}} </p>
        <p> Completed: {{note.completed}} <p>
        <p> Creation date: {{note.createdAt}} <p>
        <p> Last update: {{note.updatedAt}} </p>
    </dl>
  </div>
</template>

<script>
import { getNotes } from '@/tasks.js'
export default {
  name: 'ShowNotes',
  data: function () {
    return {
      notes: []
    }
  },
  created: function () {
    console.log(name)
    getNotes()
      .then(this._onNotesRecover)
      .catch(this._onNotesRecoverError)
  },
  methods: {
    _onNotesRecover (response) {
      this._printNotes(response.data)
    },
    _onNotesRecoverError () {
      document.querySelector('.notes-container').style.color = 'red'
      document.querySelector('.notes-container').textContent = 'Error en la recuperación de las notas!'
    },
    _printNotes (data) {
      this.notes = this._formatNotes(data)
    },
    _formatNotes (notesArray) {
      const newNotes = notesArray.map((note) => {
        note.createdAt = note.createdAt.substring(0, 10)
        note.updatedAt = note.updatedAt.substring(0, 10)
        note.completed === false ? note.completed = 'No' : note.completed = 'Yes'
        return note
      })
      return newNotes
    }
  }
}

</script>

<style scoped lang="scss">

$space: 1rem;

.notes-container {
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  background-color: lightblue;
  align-items: center;
  justify-content: center;
}
dl.note {
  padding: 5px;
  margin: 5px;
  border: solid;
  min-width: 200px;
}

</style>
