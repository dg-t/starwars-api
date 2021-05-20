<template>
    <section class="container-fluid">
        <div>
            <h1>Planet detail</h1>
            <p>Name: {{ name }}</p>
            <p>Rotation period: {{ rotationPeriod }}</p>
            <p>Orbital period: {{ orbitalPeriod }}</p>
            <p>Diameter: {{ diameter }}</p>
            <p>Climate: {{ climate }}</p>
            <p>Gravity: {{ gravity }}</p>
            <p>Terrain: {{ terrain }}</p>
            <p>Surface water: {{ surfaceWater }}</p>
            <p>population: {{ population }}</p>
        </div>
        <div>
            <p v-if="residents.length > 0">Residents: <span v-for="(resident, index) in residents" :key="index">{{ resident }}. </span></p>
        </div>
        <div>
            <p v-if="films.length > 0">Films: <span v-for="(film, index) in films" :key="index">{{ film }}. </span></p>
        </div>
        <div>
            <router-link to="/planets/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PlanetDetails',
    data() {
        return {
            name: '',
            rotationPeriod: '',
            orbitalPeriod: '',
            diameter: '',
            climate: '',
            gravity: '',
            terrain: '',
            surfaceWater: '',
            population: '',
            residents: [],
            films: []
        }
    },
    methods: {
        // GET PLANET DETAILS FROM SWAPI - THEN/CATCH
        getPlanetDetails() {
            // GET planetId FROM ROUTE PARAMS
            const planetId = this.$route.params.planetId;

            if (planetId) {
                // GENERAL INFO
                fetch(`https://swapi.dev/api/planets/${planetId}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data) {
                        this.name = data.name;
                        this.rotationPeriod = data.rotation_period;
                        this.orbitalPeriod = data.orbital_period;
                        this.diameter = data.diameter;
                        this.climate = data.climate;
                        this.gravity = data.gravity;
                        this.terrain = data.terrain;
                        this.surfaceWater = data.surface_water;
                        this.population = data.population;
                    
                        if (data.residents.length > 0) {
                            for (let i = 0; i < data.residents.length; i++) {
                                fetch(data.residents[i])
                                .then(res => {
                                    if (res.ok) {
                                        return res.json();
                                    }
                                })
                                .then(data => {
                                    this.residents.push(data.name);
                                })
                                .catch(error => console.log('Something went wrong loading the residents.\nError:\n', error))
                            }
                        }

                        if (data.films.length > 0) {
                            for (let i = 0; i < data.films.length; i++) {
                                fetch(data.films[i])
                                .then(res => {
                                    if (res.ok) {
                                        return res.json();
                                    }
                                })
                                .then(data => {
                                    this.films.push(data.title);
                                })
                                .catch(error => console.log('Something went wrong loading the films.\nError:\n', error))
                            }
                        }
                    }
                })
                .catch (error => console.log(error));
            }
        }
    },
    created() {
        this.getPlanetDetails();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
