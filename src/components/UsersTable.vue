<template>
    <table class="table is-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Возрост</th>
                <th>Email</th>
                <th colspan="2">Действия</th>
            </tr>
        </thead>
        <tbody>
            <user-row v-for="(user, index) in users" :user="user" :index="index"></user-row>
        </tbody>
    </table>
</template>

<script>
    import UserRow from './UserRow'

    export default {
      name: 'users-table',

      props: ['users'],

      components: { UserRow }
    }
</script>