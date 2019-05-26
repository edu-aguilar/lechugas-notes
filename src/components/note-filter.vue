<template>
  <div class="filter-container">
    <div class="Order by">
    Select your filters: <br>

    Completed / Incompleted &nbsp <select v-model="completed">
      <option value="all">All</option>
      <option value="false">Incompleted</option>
      <option value="true">Completed</option>
    </select><br>
     Creation Date / Update Date &nbsp<select v-model="field">
      <option value="default">Default</option>
      <option value="createdAt:asc">Creation Date (↑)</option>
      <option value="createdAt:desc">Creation Date (↓)</option>
      <option value="updatedAt:asc">Last Update Date (↑)</option>
      <option value="updatedAt:desc">Last Update Date (↓)</option>
    </select> <br>
    </div>
    <br>
    <div class="description-filter">
    Choose a description:
    <input v-model="searchInput" type="search">
    <button v-on:click="_doSearch">Search</button>
    </div>
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
      searchInput: ''
    }
  },
  computed: {
  },
  methods: {
    _emitEvent () {
      this.$emit('filterChanged', { field: this.field, completed: this.completed, description: this.description })
    },
    _doSearch () {
      this.description = this.searchInput
      this._emitEvent()
    }
  },
  watch: {
    field () {
      this._emitEvent()
    },
    completed () {
      this._emitEvent()
    }
  }
}
</script>

<style>

.filter-container {
  display: flex;
  flex-direction: column;
}
select {
  background-color: lightblue
}

</style>
