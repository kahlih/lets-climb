<script>
  import StatusColumn from './StatusColumn.vue'

  export default {
    components: {
      StatusColumn
    },
    created: function () {
      this.$store.dispatch('userRoutes')
    },
    computed : {
      routes : function(){ return this.$store.getters.userRoutes }, //change to mapGetters
      completedRoutes() {
        return this.routes.filter(route => route.completed)
      },
      inProgressRoutes() {
        return this.routes.filter(route => route.in_progress)
      },
      toDoRoutes() {
        return this.routes.filter(route => route.todo)
      }
    },
  }
</script>

<template>
  <div class="route-listing">
    <div class="route-listing_container">
      <status-column :routes="toDoRoutes" statusName="To Do"></status-column>
      <status-column :routes="inProgressRoutes" statusName="In Progress"></status-column>
      <status-column :routes="completedRoutes" statusName="Completed"></status-column>
    </div>
  </div>
</template>

<style>
  .route-listing {
    padding: 15px 25px;
  }

  .route-listing_container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

</style>
