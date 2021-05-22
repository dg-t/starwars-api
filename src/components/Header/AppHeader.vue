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

header {
    background-color: black;
    color: white;
    
}

h1 {
    font-size: 60px;
    text-shadow: 1px 1px 3px #FF0000, 0 0 5px #0000FF;
}

.separator:after {
  display: block;
  background-color: #90ee90;
  content: " ";
  height: 3px;
  width: 70%;
  margin: 0 auto;
  bottom: 0;
}

</style>