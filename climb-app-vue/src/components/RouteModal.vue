<script>
  import Route from './Route.vue'
  import Modal from './common/Modal.vue'

  export default {
    name: 'route-modal',
    components: {
      Route,
      Modal
    },
    props: {
      selectedRoute: {
        type: Object,
        required: true
      },
      showModal: {
        type: Boolean,
        required: false
      }
    },
    data() {
      return {
        routeIndexForModal: 0
      }
    },
    methods: {
      displayModal(index) {
        this.showModal = true
        this.routeIndexForModal = index
      },
      closeModal() {
        this.$emit('updateShowModal', false);
      },
      recordRouteAttempt() {
        this.$emit('recordRouteAttempt', false);
      }
    }
  }
</script>

<template>
  <modal v-if="selectedRoute" :displayModal="showModal"  @closeModal="closeModal">
      <template v-slot:header>
        {{ selectedRoute.name }}
      </template>
      <template v-slot:body>
        <div>
          <h4>Description: </h4>
          {{ selectedRoute.description }}
        </div>
        <div>
          <h4>Details</h4>
          <p>Located: {{ selectedRoute.location.name }}</p>
          <p>Type: {{ selectedRoute.route_type }}</p>
          <p>Difficulty: {{ selectedRoute.difficulty }}</p>
        </div>
      </template>
      <template v-slot:footer>
        <button class="button status-column_modal-button" @click="recordRouteAttempt">Record an Attempt</button>
      </template>
  </modal>
</template>
