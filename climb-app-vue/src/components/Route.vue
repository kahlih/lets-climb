<script>
  export default {
    name: 'route',
    data() {
      return {
      }
    },
    props: {
      route: {
        type: Object,
        required: true
      }
    },
    methods: {
    }
  }
</script>

<template>
  <div class="route-card" @click="$emit('click')">
    <h4>{{route.name}}</h4>
    <p>{{route.location.name}}</p>
  </div>
</template>

<style>
  .route-card {
    background-color: #ffffff;
    margin: 12px;
    padding: 5px 0px;
  }
</style>
