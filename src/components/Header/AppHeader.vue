<template>
    <!-- Header -->
    <header class="container-fluid text-center separator">
        <h1 class="p-4">Star Wars API</h1>
    </header>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<!-- 2 Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/** HEADER */

.separator:after {
  display: block;
  background-color: #fdce5c;
  content: " ";
  height: 2px;
  width: 70%;
  margin: 0 auto;
  bottom: 0;
  margin-bottom: 30px;
}

</style>