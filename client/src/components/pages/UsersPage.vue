<template>
  <div class="container-fluid">
    <h3>Users</h3>

    <div class="card mt-5">
      <b-alert v-if="errorMessage" show="" dismissible fade variant="danger">
        {{this.errorMessage}}
      </b-alert>
      <div class="card-header">
        User List
      </div>
      <div v-if="users.length">
        <div class="card-body">
          <div class="row" v-if="editUser">
            <div class="col-2">
              <p>First Name</p>
            </div>
            <div class="col-2">
              <p>Last Name</p>
            </div>
            <div class="col-2">
              <p>Email</p>
            </div>
            <div class="col-2">
              <p>Phone Number</p>
            </div>
            <div class="col-1">
              <p>Actions</p>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-2">
              <p>User Name</p>
            </div>
            <div class="col-2">
              <p>Email</p>
            </div>
            <div class="col-2">
              <p>Phone Number</p>
            </div>
            <div class="col-2">
              <p>Events Count</p>
            </div>
            <div class="col-2">
              <p>Next Event Date</p>
            </div>
            <div class="col-2">
              <p>Actions</p>
            </div>
          </div>
          <hr>
          <div v-for="(user, index) in users" :key="index">
            <UserCard :user="user" :getUsers="getUsers" :userEdit="userEdit" :errorRes="errorRes"/>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-2">
        Any User created yet! Create one:
      </div>
      <router-link to="/create-user" class="btn btn-info">Create new User</router-link>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import UserCard from './UserCard'

export default {
  name: 'UsersPage',
  data () {
    return {
      editUser: false,
      users: [],
      errorMessage: ''
    }
  },
  components: {
    UserCard
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await UsersService.index()

      this.users = response.data
    },
    userEdit (val) {
      this.editUser = val
    },
    errorRes (val) {
      this.errorMessage = val
    }
  }
}
</script>

<style scoped>
  h3 {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>
