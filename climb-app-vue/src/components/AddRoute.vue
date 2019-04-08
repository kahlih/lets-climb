<script>
  import Modal from './common/Modal.vue'

  export default {
    components: {
      Modal
    },
    data() {
      return {
        showModal: false,
        name: '',
        description: '',
        route_type: '',
        difficulty: '',
        location_id: null,
        radioButtonOptions: [
          'Sport',
          'Boulder'
        ]
      }
    },
    created: function () {
      this.$store.dispatch('locations')
    },
    computed: {
      locations(){
        return this.$store.getters.locations
      }, //change to mapGetters
      locationOptions() {
        if (this.locations) {
          return this.locations.map(function(location) {
            return {
              label: location.name,
              value: location.id
            }
          });
        } else {
          return [];
        }
      }
    },
    methods: {
      submitRoute() {
        let data = {
          name: this.name,
          description: this.description,
          route_type: this.route_type,
          difficulty: this.difficulty,
          location_id: this.location_id,
        }
        this.$store.dispatch('addRoute', data)
       .then(() => {
         this.showModal = false
       })
       .catch(err => console.log(err))
      },
      displayModal(index) {
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      }
    }
  }
</script>

<template>
  <div>
    <div class="add-route" @click="displayModal">
      <span class="add-route_text">Add Route</span>
    </div>
    <modal :displayModal="showModal" @closeModal="closeModal">
      <template v-slot:header>
        Add a route to your List
      </template>

      <template v-slot:body>
        <form @submit.prevent="submitRoute">
          <div class="add-route_input-field">
            <label for="name">What is it named?</label>
            <div>
              <input required v-model="name" type="name" placeholder="Name"/>
            </div>
          </div>

          <div class="add-route_input-field">
            <label for="description">Can you describe it?</label>
            <div>
              <textarea required v-model="description" type="description" placeholder="Description"/>
            </div>
          </div>

          <div class="add-route_input-field">
            <label for="route_type">What type of route is it?</label>
            <div class="add-route_input-field--radio">
              <input type="radio" id="sport" value="Sport" v-model="route_type" required>
              <label for="sport">Sport</label>
              <br>
              <input type="radio" id="boulder" value="Boulder" v-model="route_type">
              <label for="boulder">Boulder</label>
            </div>
          </div>

          <div class="add-route_input-field">
            <label for="difficulty">What is it rated at?</label>
            <div>
              <input required v-model="difficulty" type="difficulty" placeholder="Difficulty"/>
            </div>
          </div>

          <div class="add-route_input-field">
            <label for="location">Where is it located?</label>
            <div>
              <select required v-model="location_id">
                <option disabled value="">Please select one</option>
                <option v-for="option in locationOptions" v-bind:value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <button class="button" type="submit">Submit</button>
        </form>
      </template>
    </modal>
  </div>
</template>

<style>
  .add-route {
    border: 1px solid #2c3e50;
    padding: 3px 5px;
    cursor: pointer;
    width: 90px;
    margin: 5px 20px;
    float: right;
  }

  .add-route_input-field {
    display: flex;
    align-items: center;
    padding: 3px 0px;
  }

  .add-route_input-field--radio {
    display: inline-flex;
    align-items: center;
  }

  .add-route_input-field label {
    width: 25%;
    margin-right: 10px;
  }
</style>
