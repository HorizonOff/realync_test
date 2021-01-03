import Users from '@/components/pages/UsersPage'
import createUser from '@/components/pages/UserCreatePage'
import createEvent from '@/components/pages/EventCreatePage'
import showUser from '@/components/pages/UserShowPage'

const routes = [
  {
    path: '/users',
    name: 'UsersPage',
    component: Users
  },
  {
    path: '/create-user',
    name: 'createUserPage',
    component: createUser
  },
  {
    path: '/user/:id',
    name: 'UserPage',
    component: showUser
  },
  {
    path: '/user/:id/create-event',
    name: 'CreateEventPage',
    component: createEvent
  }
]

export default routes
