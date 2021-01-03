<template>
  <div class="card-body row">
    <template v-if="editUser">
      <div class="col-2">
        <label>
          <input v-model="editUserData.firstName" type="text" required="required">
        </label>
      </div>
      <div class="col-2">
        <label>
          <input v-model="editUserData.lastName" type="text" required="required">
        </label>
      </div>
      <div class="col-2">
        <label>
          <input v-model="editUserData.email" type="text" required="required">
        </label>
      </div>
      <div class="col-2">
        <label>
          <input v-model="editUserData.phoneNumber" type="number" required="required">
        </label>
      </div>
      <div class="col-1">
        <span class="icon">
          <i @click="editSubmit" class="fa fa-check"></i>
        </span>
        <span class="icon">
          <i @click="cancel" class="fa fa-ban"></i>
        </span>
      </div>
    </template>
    <template v-else>
      <div class="col-2">
        {{user.userName}}
      </div>
      <div class="col-2">
        {{user.email}}
      </div>
      <div class="col-2">
        {{user.phoneNumber}}
      </div>
      <div class="col-2">
        {{user.userEvents}}
      </div>
      <div class="col-2">
        {{user.usersStartDate}}
      </div>
      <div class="col-2">
        <a class="icon">
          <i @click="destroy" class="fa fa-trash"></i>
        </a>
        <a class="icon">
          <i @click="edit" class="fa fa-pencil"></i>
        </a>
        <router-link :to="{
          name:'UserPage',
          params: { id: `${user._id}` }
        }" class="icon"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data () {
    return {
      editUser: false,
      editUserData: {
        'id': '',
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': ''
      }
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    getUsers: {
      type: Function,
      default: () => {}
    },
    userEdit: {
      type: Function,
      default: () => {}
    },
    errorRes: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    async destroy () {
      try {
        await UsersService.destroy(this.user._id.toString())
        await this.getUsers()
      } catch (err) {
        this.errorRes(err.response.data.message)
      }
    },
    edit () {
      this.editUser = true
      this.editUserData.id = this.user._id.toString()
      this.editUserData.firstName = this.user.firstName
      this.editUserData.lastName = this.user.lastName
      this.editUserData.email = this.user.email
      this.editUserData.phoneNumber = this.user.phoneNumber

      this.userEdit(this.editUser)
    },
    cancel () {
      this.editUser = false
      this.editUserData.id = ''
      this.editUserData.firstName = ''
      this.editUserData.lastName = ''
      this.editUserData.email = ''
      this.editUserData.phoneNumber = ''

      this.userEdit(this.editUser)
    },
    async editSubmit () {
      try {
        await UsersService.update(this.editUserData)
        await this.getUsers()
        this.cancel()
      } catch (err) {
        this.errorRes(err.response.data.message)
      }
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px;
  }

  .icon i {
    cursor: pointer;
  }
</style>
