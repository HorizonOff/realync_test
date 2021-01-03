<template>
  <div class="container-fluid">
    <h3>Add a new user</h3>

    <div class="card">
      <b-alert v-if="errorMessage" show dismissible fade variant="danger">
        {{this.errorMessage}}
      </b-alert>
      <div class="card-body">
        <form class="form-inline" @submit.prevent="submit">
          <div class="form-group">
            <label>Title</label>
            <input v-model="eventData.title" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input v-model="eventData.description" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Start Date</label>
            <input v-model="eventData.startDate" type="date" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input v-model="eventData.endDate" type="date" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
      <router-link to="/users" class="btn btn-info">Back to users</router-link>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      eventData: {
        'userId': this.$route.params.id,
        'title': '',
        'description': '',
        'startDate': '',
        'endDate': ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async submit () {
      try {
        await UsersService.eventCreate(this.eventData)

        this.errorMessage = ''
        this.eventData.title = ''
        this.eventData.description = ''
        this.eventData.startDate = ''
        this.eventData.endDate = ''

        return this.$router.push({ path: `/user/${this.$route.params.id}` })
      } catch (err) {
        this.errorMessage = err.response.data.message
      }
    }
  }
}
</script>

<style>
  h3{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
}
</style>
