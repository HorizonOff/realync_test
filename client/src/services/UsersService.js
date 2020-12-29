import api from '@/services/api'

export default {
  fetchUsers () {
    return api().get('users')
  }
}
