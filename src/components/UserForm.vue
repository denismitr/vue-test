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
              <span class="help is-danger">{{ errors['last'] }}</span>
            </p>
            <label class="label">Email</label>
            <p class="control">
              <input ref="email" class="input" type="text" placeholder="Email" v-model="user.email"/>
              <span class="help is-danger">{{ errors['email'] }}</span>
            </p>
            <label class="label">Возраст</label>
            <p class="control">
              <input ref="age" class="input" type="text" placeholder="Возраст" v-model="user.age"/>
              <span class="help is-danger">{{ errors['age'] }}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import uuid from 'uuid'
    import eventHub from './../EventHub'
    import validator from './../validator.js'
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

          errors: [],

          rules: {
            first: 'required|alpha',
            last: 'required|alpha',
            email: 'required|email',
            age: 'required|numeric'
          },

          messages: {
            required: 'Поле является обязательным',
            alpha: 'Можно использовать только буквы',
            email: 'Формат email не верный',
            numeric: 'Можно использовать только цифры'
          }
        }
      },

      mixins: [validator],

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
          this.errors = this.validateAll(this.user, this.rules, this.messages)

          if (this.errors.length > 0) {
            return
          }

          eventHub.$emit('save-user-data', this.user)
        }
      }
    }
</script>