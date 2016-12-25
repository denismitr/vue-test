<template>
    <table class="table is-striped">
        <thead>
            <tr>
                <th>#</th>
                <th class="is-clickable" @click="setSort('first')">Имя</th>
                <th class="is-clickable" @click="setSort('last')">Фамилия</th>
                <th class="is-clickable" @click="setSort('age')">Возрост</th>
                <th class="is-clickable" @click="setSort('email')">Email</th>
                <th colspan="2">Действия</th>
            </tr>
        </thead>
        <tbody>
            <user-row v-for="(user, index) in sortedUsers" :user="user" :index="index"></user-row>
        </tbody>
    </table>
</template>

<script>
    import UserRow from './UserRow'

    export default {
      name: 'users-table',

      data () {
        return {
          sort: {
            by: 'first',
            order: 'asc'
          }
        }
      },

      props: ['users'],

      components: { UserRow },

      methods: {
        setSort (field) {
          this.sort.by = field
          this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
        }
      },

      computed: {
        sortedUsers () {
          return this.users.sort((user1, user2) => {
            if (this.sort.by === 'first' || this.sort.by === 'last') {
              user1 = user1.name
              user2 = user2.name
            }

            if (this.sort.order === 'asc') {
              if (user1[this.sort.by] < user2[this.sort.by]) return -1
              if (user1[this.sort.by] > user2[this.sort.by]) return 1
              return 0
            }

            if (user1[this.sort.by] > user2[this.sort.by]) return -1
            if (user1[this.sort.by] < user2[this.sort.by]) return 1
            return 0
          })
        }
      }
    }
</script>