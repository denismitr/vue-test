<template>
    <div class="has-controls">
        <a @click="handleAction" class="button is-info">{{ actionButtonText }}</a>
        <a @click="closeForm()" v-if="view==='form'" class="button is-success">Отменить</a>
    </div>
</template>

<script>
    import eventHub from './../EventHub'

    export default {

      props: ['view', 'action'],

      methods: {
        closeForm () {
          eventHub.$emit('close-form')
        },

        handleAction () {
          if (this.view === 'table') {
            eventHub.$emit('open-create-form')
          } else {
            eventHub.$emit('save-user-action')
          }
        }
      },

      computed: {
        actionButtonText () {
          if (this.action === 'edit') {
            return 'Изменить'
          } else if (this.action === 'create') {
            return 'Сохранить'
          } else {
            return 'Создать пользователя'
          }
        }
      }
    }
</script>