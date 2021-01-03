<template>
  <div class="container">
    <div v-if="user">
      <h3>User details</h3>
      <div class="row">
        <div class="card col-4">
          <div class="card-header">
            User
            <router-link
              to="/users"
              class="btn-sm btn-primary col-2 float-right text-center">
              Back
            </router-link>
          </div>
          <div class="card-body">
              <p>Full Name: {{fullName}}</p>
              <p>Email: {{user.email}}</p>
              <p>Phone Number: {{user.phoneNumber}}</p>
          </div>
        </div>
        <div class="card col-8">
          <div class="card-header">
            Events List
            <router-link :to="{
                name: 'CreateEventPage',
                params: { id: `${user._id}` }
              }"
                         class="btn-sm btn-success col-3 float-right text-center">
              Create new Event
            </router-link>
          </div>
          <div v-if="events.length">
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <p>Title</p>
                </div>
                <div class="col-5">
                  <p>Description</p>
                </div>
                <div class="col-2">
                  <p>Start Date</p>
                </div>
                <div class="col-2">
                  <p>End Date</p>
                </div>
              </div>
              <hr>
            </div>
            <div v-for="(event, index) in events" :key="index">
              <EventCard :event="event" :getEvents="getEvents"/>
            </div>
          </div>
          <div v-else class="text-center py-2">
            Events don't create yet!
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import EventCard from './EventCard'

export default {
  name: 'UserPage',
  data () {
    return {
      user: null,
      events: []
    }
  },
  components: {
    EventCard
  },
  created () {
    this.getUser()
    this.getEvents()
  },
  computed: {
    fullName () {
      return this.user.firstName + ' ' + this.user.lastName
    }
  },
  methods: {
    async getUser () {
      const response = await UsersService.show(this.$route.params.id)

      this.user = response.data
    },
    async getEvents () {
      const response = await UsersService.eventIndex(this.$route.params.id)

      this.events = response.data
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
