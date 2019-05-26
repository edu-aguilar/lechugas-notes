<template>
  <section :class="profileClass">
    <label for="inputAvatar">
  <img :src="avatarParsed">
    </label>
  <div class="edit-avatar-container">
  <input v-on:change="_saveNewAvatar" type='file' id="inputAvatar">
  </div>
  <div class="user-info" v-if="!editable">
    <p> Name: {{userName}} </p>
    <p> Age:  {{userAge}} </p>
    <p> Email:  {{userEmail}} </p>
    <p> Creation date:  {{userCreatedAt}} </p>
    <p> Updating date:  {{userUpdatedAt}}</p>
  </div>
   <div class="user-info editable" v-else>
    <p> Name: <input v-model="editName" type='text'> </p>
    <p> Age: <input v-model="editAge" type='tel'> </p>
    <p> Email: <input v-model="editEmail" type='text'> </p>
    <p> New password: <input v-model="editPassword" type='password'> </p>
  </div>
  <button class="editUserinfo" v-on:click="_toggleProfileEdit"> {{editButtonText}} </button>
  <button v-if="editable" class="saveUserModifiedInfo" v-on:click="_saveUserModifiedInfo"> Save </button>
  </section>
</template>

<script>

import { getUserAllInfo, updateUserInfo, uploadUserAvatar } from '@/user.js'
import { close } from 'fs';

export default {
  name: 'MyProfile',
  data: function () {
    return {
        userAge: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userCreatedAt: '',
        userUpdatedAt: '',
        userAvatar: '',
        editable: false,
        editName: '',
        editAge: '',
        editEmail: '',
        editPassword: '',
        editAvatar: false,
        newAvatar: ''
    }
  },
  props: {
        hidden: true
  },
   created: function () {
    getUserAllInfo()
      .then(this._onInfoRecovered)
      .catch(this._onInfoRecoveredError)
  },
  computed: {
    profileClass () {
      return this.hidden ? 'my-profile hidden' : 'my-profile'
    },
    editButtonText () {
      return this.editable ? 'Cancel' : 'Edit'
    },
    avatarParsed () {
      return this.userAvatar ? `data:image/png;base64,${this.userAvatar}` : ''
    }
  },
  methods: {
    _onInfoRecovered (response) {
      this._printUserInfo(response.data)
    },
    _onInfoRecoveredError (error) {
      const message = error.response.data.error
      console.log(message)
    },
      _printUserInfo (data) {
        this.editName = this.userName = data.name
        this.editAge = this.userAge = data.age
        this.editEmail = this.userEmail = data.email
        this.userCreatedAt = data.createdAt.substring(0, 10)
        this.userUpdatedAt = data.updatedAt.substring(0, 10)
        this.userAvatar = data.avatar
    },
    _toggleProfileEdit () {
      this.editable = !this.editable
    },
    _saveUserModifiedInfo () {
      updateUserInfo(this.editEmail, this.editName, this.editAge, this.editPassword)
      .then(this._onInfoRecovered)
      .catch(this._onInfoRecoveredError)
    },
    _toggleAvatarEdit () {
      this.editAvatar = !this.editAvatar
    },
    _saveNewAvatar (event) {
      uploadUserAvatar(event.target.files[0])
      .then(this._onInfoRecovered)
      .catch(this._onInfoRecoveredError)
    }   
  }
}
</script>

<style>

section.my-profile.hidden {
  transform: translateX(100%)
}
section.my-profile {
  background-color: green;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  position: absolute;
  transition: transform 0.5s;
  color: white;
  height: 100%;
  width: 20%;
  min-width: 400px;
  align-items: center;
  padding: 5px;
  justify-content: space-around;
}
div.my-profile p {
  margin: 2px;
}
div.user-info {
  padding: 8px;
  border-style: solid;
  border-width: 1px;
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
#inputAvatar {
  display: none;
}
</style>
