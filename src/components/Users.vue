<template>
    <section class="section">
        <h1>Пользователи</h1>

        <div class="container">
            <div class="panel">
                <h3 class="panel-heading">
                    Добавление, Редактирование, Удаление пользователей
                </h3>

                <div class="panel-block has-content">
                    <users-table v-if="view==='table'" :users="users"></users-table>
                    <user-form v-if="view==='form'" :userToEdit="userToEdit" :action="action"></user-form>
                </div>

                <div class="panel-block">
                    <controls :view="view" :action="action"></controls>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import UsersTable from './UsersTable'
    import Controls from './Controls'
    import UserForm from './UserForm'
    import eventHub from './../EventHub'
    import _ from 'lodash'
    // import $ from 'jquery'

    export default {
      name: 'users',

      data () {
        return {
          users: [],

          userToEdit: null,

          view: 'table',

          action: null
        }
      },

      components: { UsersTable, Controls, UserForm },

      mounted () {
        // $.getJSON('/static/mates.json', (json) => {
        //   this.users = json
        // })
        this.$http.get('/static/mates.json').then((response) => {
          this.users = response.data
        }, (error) => {
          console.log(error)
        })

        eventHub.$on('delete-user', this.deleteUser)
        eventHub.$on('open-create-form', this.showCreateForm)
        eventHub.$on('close-form', this.closeForm)
        eventHub.$on('save-user-data', this.saveUserData)
        eventHub.$on('edit-user', this.editUser)
      },

      beforeDestroy () {
        eventHub.$off('delete-user')
        eventHub.$off('open-create-form')
        eventHub.$off('close-form')
        eventHub.$off('save-user-data')
        eventHub.$off('edit-user')
      },

      methods: {
        deleteUser (userToDelete) {
          this.users = _.filter(this.users, function (user) {
            return userToDelete.guid !== user.guid
          })
        },

        editUser (user) {
          if (user.guid && this.action !== 'edit') {
            this.action = 'edit'
            this.userToEdit = user
            this.view = 'form'
          }
        },

        showCreateForm () {
          if (this.action !== 'create') {
            this.action = 'create'
            this.view = 'form'
          }
        },

        closeForm () {
          this.view = 'table'
          this.userToEdit = null
          this.action = null
        },

        saveUserData (userToSave) {
          this.view = 'table'
          this.userToEdit = null
          this.action = null

          if (userToSave.guid) {
            if (_.find(this.users, (user) => user.guid === userToSave.guid)) {
              this.users = _.map(this.users, (user) => {
                if (user.guid === userToSave.guid) {
                  return userToSave
                }

                return user
              })
            } else {
              this.users.push(userToSave)
            }
          }
        }

      }
    }
</script>

<style>
    .panel > .panel-heading,
    .panel > .panel-block {
        background-color: #fff;
    }
    .panel-heading, .panel-block:not(:last-of-type) {
        border-bottom: 1px solid #555 !important;
    }
    .has-content {
        max-height: 400px;
        overflow-y: auto;
    }
</style>