<template>
  <section class="section">
    <h1>{{ msg }}</h1>

    <div class="sub-menu">
      <router-link to="/users">Список пользователей</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hello',

  data () {
    return {
      msg: 'Vue.js Test App'
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
  font-size: 1.5rem;
}

.sub-menu {
  text-align: center;
}
</style>
