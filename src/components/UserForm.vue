<template>
    <div class="box">
        <div class="control">
            <label class="label">Имя</label>
            <p class="control">
              <input ref="first" class="input" type="text" placeholder="Имя" v-model="user.name.first"/>
              <span v-if="errors && errors.length > 0" class="help is-danger">{{ errors['first'] }}</span>
            </p>
            <label class="label">Фамилия</label>
            <p class="control">
              <input ref="last" class="input" type="text" placeholder="Фамилия" v-model="user.name.last"/>
              <span v-if="errors && errors.length > 0" class="help is-danger">{{ errors['last'] }}</span>
            </p>
            <label class="label">Email</label>
            <p class="control">
              <input ref="email" class="input" type="text" placeholder="Email" v-model="user.email"/>
              <span v-if="errors && errors.length > 0" class="help is-danger">{{ errors['email'] }}</span>
            </p>
            <label class="label">Возраст</label>
            <p class="control">
              <input ref="age" class="input" type="text" placeholder="Возраст" v-model="user.age"/>
              <span v-if="errors && errors.length > 0" class="help is-danger">{{ errors['age'] }}</span>
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

          errors: {
            length: 0
          },

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

      props: ['userToEdit', 'action'],

      mounted () {
        if (this.userToEdit && this.action === 'edit') {
          this.user = _.cloneDeep(this.userToEdit)
        }

        eventHub.$on('save-user-action', this.saveUser)
      },

      beforeDestroy () {
        eventHub.$off('save-user-action')
      },

      methods: {
        saveUser () {
          console.log('ECCESSIVE CALL')
          if (this.user.guid) {
            this.errors = this.validateAll(this.user, this.rules, this.messages)

            if (this.errors === null || this.errors.length === 0) {
              eventHub.$emit('save-user-data', this.user)
            }
          }
        }
      }
    }
</script>