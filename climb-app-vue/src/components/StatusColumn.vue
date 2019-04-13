<script>
  import Route from './Route.vue'
  import Modal from './common/Modal.vue'
  import RouteModal from './RouteModal.vue'
  import NewRouteAttemptModal from './NewRouteAttemptModal.vue'

  export default {
    name: 'status-column',
    components: {
      Route,
      Modal,
      RouteModal,
      NewRouteAttemptModal
    },
    data() {
      return {
        showModal: false,
        showRouteAttemptForm: false,
        routeIndexForModal: 0
      }
    },
    props: {
      statusName: {
        type: String,
        default: 'ToDo'
      },
      routes: {
        type: Array,
        required: true
      }
    },
    computed: {
      headerClassNames() {
        let classes = [
          'status-column_name'
        ];
        if (this.statusName == 'In Progress') {
          classes.push('status-column_name--in-progress');
        } else if (this.statusName == 'Completed') {
          classes.push('status-column_name--completed');
        }
        return classes;
      },
      selectedRoute() {
        return this.routes[this.routeIndexForModal];
      },
      showDetailModal() {
        return this.selectedRoute && this.selectedRoute.length !== 0;
      },
      displayRouteAttemptForm() {
        return this.selectedRoute && this.showRouteAttemptForm;
      }
    },
    methods: {
      displayModal(index) {
        this.showModal = true
        this.routeIndexForModal = index
      },
      updateShowModal(value) {
        this.showModal = value
      },
      recordRouteAttempt() {
        this.showModal = false // change
        this.showRouteAttemptForm = true;
      },
      closeAttemptModalForm() {
        this.showRouteAttemptForm = false;
      }
    }
  }
</script>

<template>
  <div class="status-column">
    <h2 :class="headerClassNames">{{statusName}}</h2>
    <div class="status-column_body">
      <span v-for="(route, index) in routes">
        <route :route="route" @click="displayModal(index)"/>
      </span>
    </div>

    <route-modal v-if="selectedRoute" :selectedRoute="selectedRoute" :showModal="showModal" @updateShowModal="updateShowModal" @recordRouteAttempt="recordRouteAttempt">
    </route-modal>
    <new-route-attempt-modal v-if="selectedRoute" :selectedRoute="selectedRoute" :showModal="displayRouteAttemptForm" @closeAttemptModalForm="closeAttemptModalForm">
    </new-route-attempt-modal>
  </div>
</template>

<style>
  .status-column {
    display: flex;
    flex-direction: column;
    flex: 33%;
    margin: 5px 20px;
  }

  .status-column_name {
    border-radius: 4px;
    background-color: #F1E821;
    margin: 0px;
    padding: 10px 0px;
  }

  .status-column_name--in-progress {
    background-color: #487AFA;
  }

  .status-column_name--completed {
    background-color: #23C0AD;
  }

  .status-column_body {
    background-color: #F8F8F8;
  }

</style>
