<template>

<div class="user-profile-view">
  <h1>This is the profile view</h1>
  <NoteFilter v-on:filterChanged="_filterNotes"></NoteFilter>
  <button class="show-hide-profile-button" v-on:click="_showMyProfile"> {{profileButtonText}} </button>
  <button :disabled='createNote' class="create-note-button" v-on:click="_openCreateNoteForm"> {{createNoteTextButton}}</button>
     <div class="my-profile-container">
    <div v-if="createdNote" class="note-created"> Note created! </div>
  <MyProfile :hidden='!showProfile'></MyProfile>
  <div>
  <CreateNote v-if="createNote" v-on:closecreatenoteform="_closeCreateNoteForm" v-on:createnote="_createNewNote" ></CreateNote>
  <div v-if="!showEmptyNotesMessage" class="notes-container">
     <Note v-for="(note, index) in notes" :key="note._id" :notesFormated="note" :index="index" v-on:deleteNote="_deleteNote"></Note>
  </div>
  <div v-else class="no-notes-container">
    No hay notas disponibles!
    </div>
</div>
</div>
</div>
</template>

<script>
import CreateNote from '@/components/create-note.vue'
import Note from '@/components/note.vue'
import NoteFilter from '@/components/note-filter.vue'
import MyProfile from '@/components/my-profile.vue'
import { getNotes, getFilteredNotes, deleteNote, createNewNote } from '@/notes.js'
import { setPriority } from 'os';

export default {
  name: 'userprofile',
  components: {
    Note,
    NoteFilter,
    MyProfile,
    CreateNote
  },
  data: function () {
    return {
      notes: [],
      showProfile: false,
      showEmptyNotesMessage: false,
      createNote: false,
      createdNote: false
    }
  },
  computed: {
    profileButtonText () {
      return this.showProfile ? 'Hide profile' : 'Show profile'
    },
    createNoteTextButton () {
      return this.createNote ? 'Creating a new note' : 'Create a new note'
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
      if (data.length === 0) {
        this._printNoNotesAvailableMessage()
      } else {
        this.showEmptyNotesMessage = false
        this.notes = this._formatNotes(data)
      }
    },
    _printNoNotesAvailableMessage () {
      // const notesContainer = document.querySelector('.notes-container')
      // notesContainer.style.color = 'grey'
      // notesContainer.textContent = 'There are no notes related to your profile!'
      this.showEmptyNotesMessage = true
    },
    _formatNotes (notesArray) {
      return notesArray.map((note) => {
        note.createdAt = note.createdAt.substring(0, 10)
        note.updatedAt = note.updatedAt.substring(0, 10)
        note.completed === false ? note.completed = 'No' : note.completed = 'Yes'
        console.log(note)
        return note
      })
    },
    _filterNotes (filters) {
      getFilteredNotes(filters.field, filters.completed, filters.description)
        .then(this._onNotesRecovered)
        .catch(this._onNotesRecoveredError)
    },
    _deleteNote (key) {
      deleteNote(key)
        .then(() => this._onNoteDeleteSuccess(key))
        .catch(this._onNoteDeleteError)
    },
    _onNoteDeleteSuccess (key) {
      const newNotesArray = this.notes.filter((note) => {
        return note._id !== key
      })
      if (newNotesArray.length === 0) {
        this._printNoNotesAvailableMessage()
      } else {
        this.notes = newNotesArray
      }
    },
    _onNoteDeleteError (req) {
      alert(req.response.data)
    },
    _showMyProfile () {
      this.showProfile = !this.showProfile
    },
    _openCreateNoteForm () {
      this.createNote = true
    },
    _createNewNote (inputs) {
      createNewNote(inputs.completed, inputs.description)
      .then(this._onNewNoteCreated)
      .catch(() => alert('Error en la creación de notas! Vuelve a intentarlo de nuevo más tarde'))
    },
    _closeCreateNoteForm () {
      this.createNote = false
    },
    _onNewNoteCreated () {
      this._closeCreateNoteForm()
      this.createdNote = true;
      setTimeout(() => {
        this.createdNote = false;
      }, 2000)
      getNotes()
        .then(this._onNotesRecovered)
        .catch(this._onNotesRecoveredError)
    }
  }
}
</script>
<style>
.my-profile-container {
  position: relative;
}
.notes-and-myprofile-view {
  display: flex;
  flex-direction: row;
}
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
.no-notes-container {
  padding: 5px;
  height: auto;
  background-color: lightblue;
  margin-top: 10px;
}
div.note-created {
  margin: 10px auto;
  color: green;
  width: 100px;
}
</style>
