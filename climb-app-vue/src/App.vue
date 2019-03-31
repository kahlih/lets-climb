<script>
  export default {
    name: 'app',
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        });
      });
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
</script>
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/routes">Routes</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      <span v-else> | <router-link to="/register">Create Account</router-link> </span>
    </div>
    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  cursor: pointer;
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
