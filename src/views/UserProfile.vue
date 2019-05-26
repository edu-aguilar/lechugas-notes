<template>

<div class="user-profile-view">
  <h1>This is the profile view</h1>
<<<<<<< HEAD
  <NoteFilter v-on:filterChanged="_filterNotes"></NoteFilter>
=======
  <button class="show-hide-profile-button" v-on:click="_showMyProfile"> {{profileButtonText}} </button>
     <div class="my-profile-container">
     <MyProfile :hidden='!showProfile'></MyProfile>
>>>>>>> feature/my-profile-component
  <div class="notes-container">
     <Note v-for="(note, index) in notes" :key="note._id" :notesFormated="note" :index="index" v-on:deleteNote="_deleteNote"></Note>
   </div>
</div>
</div>
</template>

<script>
import Note from '@/components/note.vue'
<<<<<<< HEAD
import NoteFilter from '@/components/note-filter.vue'
import { getNotes, getFilteredNotes, deleteNote } from '@/notes.js'
=======
import MyProfile from '@/components/my-profile.vue'
import { getNotes } from '@/notes.js'
>>>>>>> feature/my-profile-component

export default {
  name: 'userprofile',
  components: {
    Note,
<<<<<<< HEAD
    NoteFilter
=======
    MyProfile
>>>>>>> feature/my-profile-component
  },
   data: function () {
    return {
      notes: [],
      showProfile: false,
    }
  },
  computed: {
    profileButtonText() {
      return this.showProfile ? "Hide profile" : "Show profile"
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
      notesContainer.style.color = 'red'
      notesContainer.textContent = 'Error en la recuperación de las notas!'
      this.$router.push('/')
    },
    _printNotes (data) {
      if(data.length === 0) {
      this._printNoNotesAvailableMessage()
      }else{
      this.notes = this._formatNotes(data)
      }
    },
    _printNoNotesAvailableMessage () {
      const notesContainer = document.querySelector('.notes-container')
      notesContainer.style.color = 'grey'
      notesContainer.textContent = 'There are no notes related to your profile!'
    },
    _formatNotes (notesArray) {
      return notesArray.map((note) => {
        note.createdAt = note.createdAt.substring(0, 10)
        note.updatedAt = note.updatedAt.substring(0, 10)
        note.completed === false ? note.completed = 'No' : note.completed = 'Yes'
        return note
      })
    },
<<<<<<< HEAD
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
          }else{
        this.notes = newNotesArray
        }
      },
      _onNoteDeleteError (req) {
        alert(req.response.data)
      }
=======
    _showMyProfile () {
      this.showProfile = !this.showProfile
      }
    }
>>>>>>> feature/my-profile-component
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
</style>
