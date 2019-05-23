<template>
    <button class="delete-note" v-on:click="_displayDeleteWarningDiv">X</button>
</template>

<script>
export default {
name: 'DeleteNoteButton',
methods: {
  _displayDeleteWarningDiv () {
    this.$emit('displayWarningDiv')
  }
  }
}
</script>

<style>

button.delete-note {
  background-color: lightcoral;
  color: white;
  width: 26px;
  height: 26px;
  top: 1px;
  right: 1px;
  position:absolute;
  cursor:pointer;
}

</style>