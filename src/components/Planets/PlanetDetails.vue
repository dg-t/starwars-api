<template>
    <section class="container-fluid">
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <p v-if="isLoading">{{ loadingMsg }}</p>
        <div v-else>
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
        </div>
        <div>
            <router-link to="/planets/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
export default {
    mixins: [notificationError, isLoading],
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
                this.isLoading = true;
                // GET PLANET GENERAL INFO
                fetch(`https://swapi.dev/api/planets/${planetId}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        this.loadingMsg = "An error occured. Cannot load data."
                        this.errorNotification();
                    }
                })
                .then(data => {
                    if (data) {

                        // FETCH ALL RESIDENTS ENDPOINTS
                        const getResidents = () => {
                            const residentsData = [];
                            for (let i = 0; i < data.residents.length; i++) {
                                residentsData.push(fetch(data.residents[i])
                                .then(res => res.json())
                            )}
                            return Promise.all(residentsData)
                        }
                    
                        // FETCH ALL FILMS ENDPOINTS
                        const getFilms = () => {
                            const filmsData = [];
                            for (let i = 0; i < data.films.length; i++) {
                                filmsData.push(fetch(data.films[i])
                                .then( res => res.json())
                            )}
                            return Promise.all(filmsData)
                        }

                        // GET ALL PROMISES AND UPDATE FRONT
                        Promise.all([data, getResidents(), getFilms()]).then(data => {
                            const generalData = data[0];
                            const fullResidentsDetails = data[1];
                            const fullfilmsDetails = data[2];

                            if (generalData) {
                                this.name = generalData.name;
                                this.rotationPeriod = generalData.rotation_period;
                                this.orbitalPeriod = generalData.orbital_period;
                                this.diameter = generalData.diameter;
                                this.climate = generalData.climate;
                                this.gravity = generalData.gravity;
                                this.terrain = generalData.terrain;
                                this.surfaceWater = generalData.surface_water;
                                this.population = generalData.population;
                            }

                            if (fullResidentsDetails.length > 0) {
                                const residents = []; 
                                for (let i = 0; i < fullResidentsDetails.length; i++) {
                                    residents.push(fullResidentsDetails[i].name)
                                }
                                this.residents = residents;
                            }

                            if (fullfilmsDetails.length > 0) {
                                const films = []; 
                                for (let i = 0; i < fullfilmsDetails.length; i++) {
                                    films.push(fullfilmsDetails[i].title)
                                }
                                this.films = films;
                            }
                            this.isLoading = false;
                        });
                    }
                })
                .catch (error => {
                    this.errorNotification();
                    this.loadingMsg = "An error occured. Cannot load data."
                    console.log(error)
                });
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
