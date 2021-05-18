<template>
    <section class="container-fluid">
        <div class="nav-container">
            <router-link to="/people" class="btn btn-primary">People</router-link>
            <router-link to="/starships" class="btn btn-primary">Starships</router-link>
            <router-link to="/planets" class="btn btn-primary">Planets</router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AppController',
    data() {
        return {
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav-container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
}

</style>
