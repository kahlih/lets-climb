<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/routes'))
       .catch(err => console.log(err))
      }
    }
  }
</script>

<template>
 <div class="login">
   <h1 class="login_header">Sign In</h1>
   <form @submit.prevent="login">
     <div class="login_input-field">
       <label for="email">Email</label>
       <div>
         <input required v-model="email" type="email" placeholder="Name"/>
       </div>
     </div>

     <div class="login_input-field">
       <label for="password">Password</label>
       <div>
         <input required v-model="password" type="password" placeholder="Password"/>
       </div>
     </div>

     <div class="login_button">
       <button class="button" type="submit">Login</button>
     </div>
   </form>
 </div>
</template>

<style>
  .login {
    padding: 20px 0px;
  }
  .login_header {
    margin: 5px 0px;
  }
  .login_input-field {
    padding: 10px 0px;
  }
  .login_button {
    padding: 5px 0px;
  }
</style>
