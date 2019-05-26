<template>
<div class="user-profile-view">
  <h1>This is your profile</h1>
  <div class="buttons">
 <div class="notes-buttons">
   <b>Work with your notes:</b><br>
  <NoteFilter v-on:filterChanged="_filterNotes"></NoteFilter>
</div>
<div class="create-note-container">
  <button :disabled='createNote' class="create-note-button" v-on:click="_openCreateNoteForm"> {{createNoteTextButton}}</button>
  <CreateNote v-if="createNote" v-on:closecreatenoteform="_closeCreateNoteForm" v-on:createnote="_createNewNote" ></CreateNote>
</div>
<div class="account-buttons">
  <img class="avatar" :src="avatarParsed">
  <button class="show-hide-profile-button" v-on:click="_showMyProfile"> {{profileButtonText}} </button>
  <button class="log-out-button" v-on:click="_logOut"> Logout </button>
</div>
</div>
     <div class="my-profile-container">
    <div v-if="createdNote" class="note-created"> Note created! </div>
  <MyProfile v-on:closeMyProfileMenu="_showMyProfile" :hidden='!showProfile'></MyProfile>
  <div>

  <div v-if="!showEmptyNotesMessage" class="notes-container">
     <Note v-for="(note, index) in notes" :key="note._id" :notesFormated="note" :index="index" v-on:deleteNote="_deleteNote"></Note>
  </div>
  <div v-else class="no-notes-container">
    There are no notes available
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
import { getUserAllInfo } from '@/user.js'
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
      createdNote: false,
      userAvatar: ''
    }
  },
  computed: {
    profileButtonText () {
      return this.showProfile ? 'Hide profile' : 'Show profile'
    },
    createNoteTextButton () {
      return this.createNote ? 'Creating a new note...' : 'Create a new note'
    },
     avatarParsed () {
      return this.userAvatar ? `data:image/png;base64,${this.userAvatar}` : ''
    }
  },
  created: function () {
    getUserAllInfo()
      .then(this._setAvatar)
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
    },
    _logOut () {
      this.$http.defaults.headers.common['Authorization'] = null
      this.$router.push('/')
    }
  }
}
</script>
<style>

div .user-profile-view {
  overflow: hidden;
}
h1 {
  margin-top: 0px;
  margin-bottom: 30px;
}
section.my-profile img {
  object-fit: cover;
  overflow: hidden;
  background-size: cover;
  background-image: url('../assets/avatar-default.jpg');
  width: 150px;
  height: 150px;
  border-style: solid;
  border-radius: 50%;
  cursor: pointer;
}

button {
  border-color: lightgray; 
  width: auto;
  border-radius: 0;
  background-color: palegoldenrod;
}
select {
  background-color: palegoldenrod;
}
div.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

div.notes-buttons { 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  border: solid;
  padding: 5px;
  border-radius: 10px;
}

div.account-buttons { 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: solid;
  padding: 5px;
  border-radius: 10px;
}

div.user-profile-view {
background-color: darkseagreen;
 height: 100%;
 flex-direction: column;
 padding: 30px;
}
.my-profile-container {
 height: auto;
}
.notes-and-myprofile-view {
  display: flex;
  flex-direction: row;
}
.notes-container {
  background-color: darkseagreen;
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
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
.create-note-button {
  width: 200px;
  height: 30px;
  position: relative
}
img.avatar {
  object-fit: cover;
  overflow: hidden;
  background-size: cover;
  background-image: url('../assets/avatar-default.jpg');
  width: 120px;
  height: 120px;
  border-style: solid;
  border-radius: 50%;
  cursor: pointer;
}
</style>
