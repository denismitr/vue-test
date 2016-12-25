<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ user.name.first }}</td>
        <td>{{ user.name.last }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.email }}</td>
        <td @click="deleteUser(user)" class="is-clickable is-icon"><i class="fa fa-trash"></i></td>
        <td @click="editUser(user)" class="is-clickable is-icon"><i class="fa fa-pencil"></i></td>
    </tr>
</template>

<script>
    import eventHub from './../EventHub'

    export default {
      name: 'user-row',

      props: ['user', 'index'],

      methods: {
        deleteUser (user) {
          if (window.confirm(`Вы точно хотите удалит пользователя ${user.name.first} ${user.name.last}`)) {
            eventHub.$emit('delete-user', user)
          }
        },

        editUser () {
          eventHub.$emit('edit-user', this.user)
        }
      }
    }
</script>

<style>
  .is-clickable {
    cursor: pointer;
  }
</style>