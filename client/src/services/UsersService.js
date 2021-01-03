import api from '@/services/api'

export default {
  index () {
    return api().get('users')
  },
  eventIndex (id) {
    return api().get(`user/${id}/events`)
  },
  show (id) {
    return api().get(`user/${id}`)
  },
  create (params) {
    return api().post('user', params)
  },
  eventCreate (params) {
    return api().post(`user/${params.id}/event`, params)
  },
  update (params) {
    return api().put(`user/${params.id}`, params)
  },
  destroy (id) {
    return api().delete(`user/${id}`)
  }
}
