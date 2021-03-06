import Api from '@/services/Api'

export default {
  index () {
    return Api().get('/')
  },
  post (person) {
    return Api().post('/', person)
  },
  put (person) {
    return Api().put('/', person)
  },
  delete (person) {
    return Api().delete('/', {params: person})
  }
}
