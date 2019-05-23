<template>
  <div class="note">
        <p> Note number: {{index+1}} </p>
        <p> Description: {{notesFormated.description}} </p>
        <p> Completed: {{notesFormated.completed}} <p>
        <p> Creation date: {{notesFormated.createdAt}} <p>
        <p> Last update: {{notesFormated.updatedAt}} </p>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
      notesFormated: {
        description:'',
        completed: '',
        createdAt: '',
        updateAt: ''
      },
      index: 0
  }
}
</script>

<style>
div.note {
  padding: 5px;
  margin: 5px;
  border: solid;
  min-width: 200px;
  background-color: wheat;
}

</style>
