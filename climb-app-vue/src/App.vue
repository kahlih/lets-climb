<script>
  import Delimiter from './components/common/Delimiter.vue'

  export default {
    name: 'app',
    components: {
      Delimiter
    },
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
    <div id="nav" class="nav">
      <router-link to="/routes" v-if="isLoggedIn">Routes</router-link>
      <router-link to="/" v-else>Home</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      <span v-else>
        | <router-link to="/register">Create Account</router-link>
        | <router-link to="/login">Login</router-link>
      </span>
    </div>
    <delimiter />
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

  .nav {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
  }

  input, textarea, select {
    padding: 8px 16px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #2c3e50;
    border-radius: 4px;
  }

  select {
    height: 30px;
  }

  input[type="radio" i] {
    margin-right: 8px;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #2c3e50;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #2c3e50;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #2c3e50;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #2c3e50;
  }

  .button {
    background-color: white;
    border: 1px solid #2c3e50;
    border-radius: 4px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
  }
  .button:hover {
    background-color: #2c3e50;
    color: white;
  }
</style>
