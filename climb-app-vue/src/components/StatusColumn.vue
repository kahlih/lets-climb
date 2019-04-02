<script>
  import Route from './Route.vue'
  import Modal from './common/Modal.vue'

  export default {
    name: 'status-column',
    components: {
      Route,
      Modal
    },
    data() {
      return {
        showModal: false,
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
      }
    },
    methods: {
      displayModal(index) {
        this.showModal = true
        this.routeIndexForModal = index
      },
      closeModal() {
        this.showModal = false
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
    <modal v-if="selectedRoute" :displayModal="showModal" :route="selectedRoute" @closeModal="closeModal">
      <template v-slot:header>
        Detail on {{ selectedRoute.name }}
      </template>
      <template v-slot:body>
        Description: {{ selectedRoute.description }}
        Location: {{ selectedRoute.location.name }}
      </template>
      <template v-slot:footer>
        Description: {{ selectedRoute.description }}
        Location: {{ selectedRoute.location.name }}
      </template>
    </modal>
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
