<template>
  <div class="filter-container">
    Order by:
    <input v-model="searchInput" type="search">
    <button v-on:click="_doSearch">Search</button>
    <select v-model="field"> 
      <option value="default">Default</option>
      <option value="createdAt:asc">Creation Date (↑)</option>
      <option value="createdAt:desc">Creation Date (↓)</option>
      <option value="updatedAt:asc">Last Update Date (↑)</option>
      <option value="updatedAt:desc">Last Update Date (↓)</option>
    </select>
    <select v-model="completed"> 
      <option value="all">All</option>
      <option value="false">Incompleted</option>
      <option value="true">Completed</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'NoteFilter',
  data: function () {
    return {
      field: 'default',
      completed: 'all',
      description: '',
      searchInput: '',
    }
  },
  computed: {
  },
  methods: {
    _emitEvent () {
      this.$emit('filterChanged', {field: this.field, completed: this.completed, description: this.description})
    },
    _doSearch () {
      this.description = this.searchInput
      this._emitEvent()
    }
  },
   watch: {
        field() {
            this._emitEvent()
        },
        completed() {
             this._emitEvent()
        }
    }
}
</script>

<style>

.filter-container {
}
select {
  background-color: lightblue
}

</style>