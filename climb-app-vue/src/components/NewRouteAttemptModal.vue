<script>
  import Modal from './common/Modal.vue'
  import Datepicker from 'vuejs-datepicker';

  export default {
    components: {
      Datepicker,
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
        route_id: this.selectedRoute.id,
        recorded_at: null,
        summary: '',
        success: false,
      }
    },
    methods: {
      displayModal(index) {
        this.showModal = true
        this.routeIndexForModal = index
      },
      closeModal() {
        this.$emit('closeAttemptModalForm');
      },
      submitRouteAttempt() {
        let data = {
          route_id: this.route_id,
          recorded_at: this.recorded_at,
          summary: this.summary,
          success: this.success,
        }
        this.$store.dispatch('addRouteAttempt', data)
       .then(() => {
         this.closeModal();
       })
       .catch(err => console.log(err))
      },
    }
  }
</script>

<template>
  <modal v-if="selectedRoute" :displayModal="showModal" @closeModal="closeModal">
      <template v-slot:header>
        Record in detail your attempt at {{ selectedRoute.name }}
      </template>

      <template v-slot:body>
        <form @submit.prevent="submitRouteAttempt">
          <div class="route-attempt_input-field">
            <label for="recorded_at">When did you climb this route?</label>
            <div>
              <datepicker v-model="recorded_at" name="recorded_at"></datepicker>
            </div>
          </div>

          <div class="route-attempt_input-field">
            <label for="summary">Wanna Give Details?</label>
            <div>
              <textarea required v-model="summary" type="summary" placeholder="Description"/>
            </div>
          </div>

          <div class="route-attempt_input-field">
            <label for="route_type">Did you send it?? (AKA: Succeed)</label>
            <div class="route-attempt_input-field--radio">
              <input type="radio" id="yes" :value="true" v-model="success" required>
              <label for="sport">Yes!</label>
              <br>
              <input type="radio" id="no" :value="false" v-model="success">
              <label for="boulder">No</label>
            </div>
          </div>

          <div class="route-attempt_button">
            <button class="button" type="submit">Submit</button>
          </div>
        </form>
      </template>
  </modal>
</template>

<style>
  .route-attempt_input-field {
    display: flex;
    align-items: center;
    padding: 3px 0px;
  }

  .route-attempt_input-field--radio {
    display: inline-flex;
    align-items: center;
  }

  .route-attempt_input-field label {
    width: 45%;
    margin-right: 10px;
  }

  .route-attempt_input-field textarea {
    width: 100%;
    margin-right: 10px;
  }

  .route-attempt_button {
    margin-top: 10px;
  }

</style>
