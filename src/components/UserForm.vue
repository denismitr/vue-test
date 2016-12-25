<template>
    <div class="box">
        <div class="control">
            <label class="label">Имя</label>
            <p class="control">
              <input ref="first" class="input" type="text" placeholder="Имя" v-model="user.name.first"/>
              <span class="help is-danger">{{ errors['first'] }}</span>
            </p>
            <label class="label">Фамилия</label>
            <p class="control">
              <input ref="last" class="input" type="text" placeholder="Фамилия" v-model="user.name.last"/>
              {{ errors['last'] }}
            </p>
            <label class="label">Email</label>
            <p class="control">
              <input ref="email" class="input" type="text" placeholder="Email" v-model="user.email"/>
              {{ errors['email'] }}
            </p>
            <label class="label">Возраст</label>
            <p class="control">
              <input ref="age" class="input" type="text" placeholder="Возраст" v-model="user.age"/>
              {{ errors['age'] }}
            </p>
        </div>
    </div>
</template>

<script>
    import uuid from 'uuid'
    import eventHub from './../EventHub'
    import _ from 'lodash'

    export default {
      data () {
        return {
          user: {
            guid: uuid(),
            name: {
              first: '',
              last: ''
            },
            age: '',
            email: ''
          },

          errors: []
        }
      },

      props: ['userToEdit'],

      mounted () {
        if (this.userToEdit) {
          this.user = _.cloneDeep(this.userToEdit)
        }

        if (this.user) {
          eventHub.$on('save-user-action', this.saveUser)
        }
      },

      methods: {
        saveUser () {
          eventHub.$emit('save-user-data', this.user)
        }
      }
    }
</script>