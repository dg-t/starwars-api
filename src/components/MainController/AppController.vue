<template>
    <section class="container-fluid">
        <!-- Controller for all router links -->
        <div class="container-controller">
            <router-link to="/people" class="btn btn-primary">People</router-link>
            <router-link to="/starships" class="btn btn-primary">Starships</router-link>
            <router-link to="/planets" class="btn btn-primary">Planets</router-link>
        </div>

        <!-- attribute author icon -->
        <div class="fixed-bottom icon-attribute">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </section>
</template>

<script>
export default {
    name: 'AppController'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/** LINK CONTROLLER */

.container-controller {
    display: flex;
    justify-content: space-around;
    padding: 20px;
}

/** ICON ATTRIBUTE */

.icon-attribute {
  font-size: 10px;
  visibility: hidden;
}

</style>
