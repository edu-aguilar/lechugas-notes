<template>
  <div class="user-profile">
    <h1>This is the profile view</h1>
    <div class="content">
      Contenido
       <ShowNotes></ShowNotes>
    </div>
  </div>
</template>

<script>
import ShowNotes from '@/components/show-notes.vue'

export default {
  name: 'userprofile',
  components: {
    ShowNotes
  }
}
</script>
