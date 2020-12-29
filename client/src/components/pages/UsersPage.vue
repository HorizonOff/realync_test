<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 text-center">
        <h1>Users</h1>

        <div v-if="users.length">
          <b-table striped hover :users="users"></b-table>
        </div>

        <div v-else>
          <p>There are no users ... Lets add one now!</p>
        </div>

        <router-link to="/"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  name: 'UsersPage',
  data () {
    return {
      users: []
    }
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data.users
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
