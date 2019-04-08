<script>
  export default {
    data(){
      return {
        username : "",
        email : "",
        password : "",
        password_confirmation : ""
      }
    },
    methods: {
      register: function () {
        let data = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>

<template>
  <div class="register">
    <h1 class="register_header">Register</h1>
    <form @submit.prevent="register">
      <div class="register_input-field">
        <label for="username">Name</label>
        <div>
          <input id="username" type="text" v-model="username" required autofocus>
        </div>
      </div>

      <div class="register_input-field">
        <label for="email">E-mail Address</label>
        <div>
          <input id="email" type="text" v-model="email" required autofocus>
        </div>
      </div>

      <div class="register_input-field">
        <label for="password">Password</label>
        <div>
          <input id="password" type="text" v-model="password" required autofocus>
        </div>
      </div>

      <div class="register_input-field">
        <label for="password-confirm">Confirm Password</label>
        <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
        </div>
      </div>

      <div>
        <button class="button" type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<style>
  .register {
    padding: 20px 0px;
  }
  .register_header {
    margin-bottom: 5px;
  }
  .register_input-field {
    padding: 10px 0px;
  }
  .register_button {
    padding: 5px 0px;
  }
</style>
