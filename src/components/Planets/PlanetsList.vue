<template>
    <section class="container-fluid">
        <h1>Planets</h1>
        <div v-for="(p, index) in planets"
            :key="index">
            <router-link :to="'/planets/'+p.url.split('/').slice(1).slice(-2).join('/')" class="btn btn-primary">{{p.name}}</router-link>
        </div>
        <div>
            <router-link to="/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PlanetsList',
    data() {
        return {
            planets: []
        }
    },
    methods: {
        // GET ALL PLANETS FROM SWAPI - THEN/CATCH
        getPlanets() {
            fetch('https://swapi.dev/api/planets')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    const planets = [];
                    for (let p = 0; p < data.results.length; p++) {
                        planets.push(data.results[p])
                    }
                    this.planets = planets;
                }
            })
            .catch(error => console.log(error));
        },
    },
    created() {
        this.getPlanets();
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
