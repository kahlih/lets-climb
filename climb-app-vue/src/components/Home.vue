<script>
import Delimiter from './common/Delimiter.vue'

export default {
  name: 'home',
  components: {
    Delimiter
  },
  data () {
    return {
      quotes: [
        "The 60's: When sex was safe and climbing was dangerous",
        "I can climb an easy 5.13... I just haven't found one yet",
        "There are good climbers, and then there are tall climbers"
      ]
    }
  },
  computed: {
    quote() {
      return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }
  }
}
</script>

<template>
  <div class="landing">
    <div class="landing__container">
      <div class="landing__header">
        Let's Climb
      </div>

      <br>

      <div class="landing__subheader">
        A simple app to keep track of the climbing routes you hope to one day conquer.
      </div>
      <div class="landing__subheader">
        Create an account or login to get started.
      </div>

      <div class="landing__ctas">

      </div>

      <div class="landing__quotes">
        <p>
          "{{quote}} ..."
        </p>
      </div>
    </div>
  </div>
</template>

<style>
  .landing {
    height: 100%;
    background: #31c5aa;
  }

  .landing__container {
    position: absolute;
    left: 0;
    top: 30%;
    width: 100%;
    text-align: center;
    padding: 10px 20px;
  }

  .landing__header {
    width: 100%;
    font-weight: bold;
    font-size: 48px;
    padding: 5px 0px 10px;
  }

  .landing__subheader {
    font-size: 22px;
    line-height: 36px;
  }

  .landing__ctas{
    padding: 40px 0px;
  }

  .landing__quotes {
    font-style: italic;
    font-size: 16px;
  }
</style>
