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
            <label>First Name</label>
            <input v-model="userData.firstName" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input v-model="userData.lastName" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="userData.email" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input v-model="userData.phoneNumber" type="number" class="form-control ml-sm-2 mr-sm-4 my-2" required>
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
      userData: {
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async submit () {
      try {
        await UsersService.create(this.userData)

        this.userData.firstName = ''
        this.userData.lastName = ''
        this.userData.email = ''
        this.userData.phoneNumber = ''

        return this.$router.push({path: '/users'})
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
