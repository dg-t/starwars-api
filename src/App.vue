<template>
  <app-header />
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

/* GLOBAL */

* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    letter-spacing: 1px;;
}

html {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 300;
    text-rendering: optimizeLegibility;
}

</style>
