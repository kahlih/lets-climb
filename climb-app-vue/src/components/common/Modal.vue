<script>
  export default {
    name: 'modal',
    props: {
      displayModal: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      modalClassNames() {
        let classes = [
          'modal'
        ];
        if (this.displayModal) {
          classes.push('modal--visible');
        }
        return classes;
      }
    },
    methods: {
      close() {
        this.$emit('closeModal');
      }
    },
  }
</script>

<template>
  <div id="vue-modal" :class="modalClassNames">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <div class="modal-content_header">
        <slot name="header">
        </slot>
      </div>

      <div class="modal-content_body">
        <slot name="body">
        </slot>
      </div>

      <div class="modal-content_footer">
        <slot name="footer">
        </slot>
      </div>
    </div>

  </div>
</template>

<style>
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  .modal--visible {
    display: block;
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px 35px;
    border: 1px solid #888;
    width: 35%;
    text-align: left;
  }

  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-content_header {
    font-size: 24px;
    font-weight: 600;
    padding: 5px 0px;
  }

  .modal-content_body {
    padding: 5px 0px;
  }

  .modal-content_footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
