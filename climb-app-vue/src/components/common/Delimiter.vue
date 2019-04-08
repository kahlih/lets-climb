<template>
  <div class="delimiter">
    <span class="delimiter_dot delimiter_dot--blue"></span>
    <span class="delimiter_dot delimiter_dot--yellow"></span>
    <span class="delimiter_dot delimiter_dot--green"></span>
  </div>
</template>

<style>
  .delimiter {
    margin: 3px;
  }
  .delimiter_dot {
    height: 10px;
    width: 10px;
    margin: 0px 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
  .delimiter_dot--blue {
    background-color: #487AFA;
  }
  .delimiter_dot--yellow {
    background-color: #F1E821;
  }
  .delimiter_dot--green {
    background-color: #23C0AD;
  }
</style>
