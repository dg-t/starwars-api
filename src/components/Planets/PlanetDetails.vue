<template>
    <section class="container-fluid px-md-5 pt-md-3">

        <!-- Show error notification if something goes wrong -->
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>

        <!-- If loading/error show Loading/error text while retriving data -->
        <!-- If data is retrived correctly show data -->
        <transition name="routes" mode="out-in">
            <p v-if="isLoading" class="loading">{{ loadingMsg }}</p>
            <div v-else>
                <div>
                    <div class="container-details-header">
                        <h3 class="details-header">{{ name }}</h3>
                    </div>
                    <div class="container-sort-details">
                        <button v-if="residents.length > 0" type="button" class="btn btn-sort" @click="sortDetails(residents)">Sort residents</button>
                        <button v-if="films.length > 0" type="button" class="btn btn-sort" @click="sortDetails(films)">Sort movies</button>
                    </div>
                    <div class="container-details-data">
                        <p><span>Rotation period:</span> {{ rotationPeriod }}</p>
                        <p><span>Orbital period:</span> {{ orbitalPeriod }}</p>
                        <p><span>Diameter:</span> {{ diameter }}</p>
                        <p><span>Climate:</span> {{ climate }}</p>
                        <p><span>Gravity:</span> {{ gravity }}</p>
                        <p><span>Terrain:</span> {{ terrain }}</p>
                        <p><span>Surface water:</span> {{ surfaceWater }}</p>
                        <p><span>population:</span> {{ population }}</p>
                    </div>
                    <div class="container-details-data">
                        <div v-if="residents.length > 0">
                            <span>Residents:</span> 
                            <ul class="pt-2">
                                <li v-for="(resident, index) in residents" :key="index"> {{ resident }}. </li>
                            </ul>
                        </div>
                        <div v-if="films.length > 0">
                            <span>Films:</span> 
                            <ul class="pt-2">
                                <li v-for="(film, index) in films" :key="index"> {{ film }}. </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
        <!-- Go Back button -->
        <div>
            <router-link to="/planets/" class="btn btn-secondary btngoback">Go Back</router-link>
        </div>
    </section>
</template>

<script>
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
import sortBy from '../mixins/sortBy';

export default {
    mixins: [notificationError, isLoading, sortBy],
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
                        this.loadingMsg = "An error occured. Cannot load data.";
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
                            return Promise.all(residentsData);
                        }
                    
                        // FETCH ALL FILMS ENDPOINTS
                        const getFilms = () => {
                            const filmsData = [];
                            for (let i = 0; i < data.films.length; i++) {
                                filmsData.push(fetch(data.films[i])
                                .then( res => res.json())
                            )}
                            return Promise.all(filmsData);
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
                                    residents.push(fullResidentsDetails[i].name);
                                }
                                this.residents = residents;
                            }

                            if (fullfilmsDetails.length > 0) {
                                const films = []; 
                                for (let i = 0; i < fullfilmsDetails.length; i++) {
                                    films.push(fullfilmsDetails[i].title);
                                }
                                this.films = films;
                            }
                            this.isLoading = false;
                        });
                    }
                })
                .catch (error => {
                    this.errorNotification();
                    this.loadingMsg = "An error occured. Cannot load data.";
                    console.log(error);
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
<style scoped></style>
