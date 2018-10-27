<template>
  <div>
  <h2>Simple CRUD App</h2>
  <Person></Person>
  </div>
</template>

<script>
import Person from './Person'
export default {
  name: 'HelloWorld',
  components: {
    Person
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
