// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Hello from './components/Hello'
import Users from './components/Users'
import About from './components/About'
import Logo from './components/Logo'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

require('./assets/styles.css')

window.eventHub = new Vue({})

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Hello
      }
    },
    {
      path: '/about',
      components: {
        about: About
      }
    },
    {
      path: '/users',
      components: {
        users: Users
      }
    },
    {
      path: '/mates.json'
    }

  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { Logo }
})
