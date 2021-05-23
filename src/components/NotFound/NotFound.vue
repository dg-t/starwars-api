<template>
    <section class="container-fluid page-notfound">
        <!-- Page not found -->
        <h1>Page not found</h1>
        <p>Go back to <router-link to="/">homepage</router-link></p>
    </section>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/** PAGE NOT FOUND */

.page-notfound {
    text-align: center;
    padding: 50px 20px;
    line-height: 100px;
}

</style>
