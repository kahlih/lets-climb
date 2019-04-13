import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    routes: [],
    locations: [],
    route_attempts: []
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    set_user_routes(state, routesData) {
      state.routes = routesData
    },
    set_locations(state, locations) {
      state.locations = locations
    },
    add_user_route(state, route) {
      state.routes.push(route)
    },
    add_user_route_attempt(state, info) {
      let route_id = info["route_id"],
          data = info["route_attempt"],
          routeIndex = state.routes.findIndex((object) => object.id === route_id)
      if (data.success) {
        state.routes[routeIndex].completed = true;
        state.routes[routeIndex].in_progress = false;
        state.routes[routeIndex].todo = false;
      } else { // regardless, route attempt is recorded, so route is in progress
        state.routes[routeIndex].in_progress = true;
        state.routes[routeIndex].todo = false;
        state.routes[routeIndex].completed = false;
      }
      state.route_attempts.push(data)
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/auth/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/users', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    locations({commit}) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3000/locations', method: 'GET' })
        .then(resp => {
          commit('set_locations', resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    // routes are always authenticated b/c we set headers in main.js
    userRoutes({commit}) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3000/user_routes', method: 'GET' })
        .then(resp => {
          commit('set_user_routes', resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    addRoute({commit}, data) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3000/user_routes', data: {route: data}, method: 'POST' })
        .then(resp => {
          commit('add_user_route', resp.data)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    addRouteAttempt({commit}, data) {
      return new Promise((resolve, reject) => {
        let route_id = data["route_id"];
        axios({url: 'http://localhost:3000/route_attempts', data: {route_attempt: data}, method: 'POST' })
        .then(resp => {
          let info = {
            route_attempt: resp.data,
            route_id: route_id
          }
          commit('add_user_route_attempt', info)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userRoutes: state => state.routes,
    locations: state => state.locations
  }
})
