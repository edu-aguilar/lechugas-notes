<template>

<div class="user-profile-view">
  <h1>This is the profile view</h1>
  <NoteFilter v-on:filterChanged="_filterNotes"></NoteFilter>
  <div class="notes-container">
     <Note v-for="(note, index) in notes" :key="note._id" :notesFormated="note" :index="index" v-on:deleteNote="_deleteNote"></Note>
   </div>
</div>
</template>

<script>
import Note from '@/components/note.vue'
import NoteFilter from '@/components/note-filter.vue'
import { getNotes, getFilteredNotes, deleteNote } from '@/notes.js'

export default {
  name: 'userprofile',
  components: {
    Note,
    NoteFilter
  },
   data: function () {
    return {
      notes: []
    }
  },
   created: function () {
    getNotes()
      .then(this._onNotesRecovered)
      .catch(this._onNotesRecoveredError)
  },
  methods: {
    _onNotesRecovered (response) {
      this._printNotes(response.data)
    },
    _onNotesRecoveredError () {
      const notesContainer = document.querySelector('.notes-container')
      notesContainer.style.color = 'red'
      notesContainer.textContent = 'Error en la recuperación de las notas!'
      this.$router.push('/')
    },
    _printNotes (data) {
      this.notes = this._formatNotes(data)
    },
    _formatNotes (notesArray) {
      return notesArray.map((note) => {
        note.createdAt = note.createdAt.substring(0, 10)
        note.updatedAt = note.updatedAt.substring(0, 10)
        note.completed === false ? note.completed = 'No' : note.completed = 'Yes'
        return note
      })
    },
    _filterNotes (filters) {
      getFilteredNotes(filters.field, filters.completed, filters.description)
      .then(this._onNotesRecovered)
      .catch(this._onNotesRecoveredError)
    }
    _deleteNote (key) {
      deleteNote(key)
      .then(() => this._onNoteDeleteSuccess(key))
      .catch(this._onNoteDeleteError)
    },
      _onNoteDeleteSuccess (key) {
        this.notes = this.notes.filter((note) => {
          return note._id !== key
        })
      },
      _onNoteDeleteError (req) {
        alert(req.response.data)
      }
  }
}
</script>
<style>

.notes-container {
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  background-color: lightblue;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
</style>
