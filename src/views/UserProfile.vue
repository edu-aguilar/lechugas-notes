<template>
<div class="user-profile-view">
  <h1>This is the profile view</h1>
  <button class="show-hide-profile-button" v-on:click="_showMyProfile"> {{profileButtonText}} </button>
     <div class="my-profile-container">
     <MyProfile :hidden='!showProfile'></MyProfile>
  <div class="notes-container">
       <Note v-for="(note, index) in notes" :key="note.id" :notesFormated="note" :index="index"></Note>
   </div>
</div>
</div>
</template>

<script>
import Note from '@/components/note.vue'
import MyProfile from '@/components/my-profile.vue'
import { getNotes } from '@/notes.js'

export default {
  name: 'userprofile',
  components: {
    Note,
    MyProfile
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
    _showMyProfile () {
      this.showProfile = !this.showProfile
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
}
</style>
