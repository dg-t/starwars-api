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
                        <button v-if="films.length > 0" type="button" class="btn btn-sort" @click="sortDetails(films)">Sort movies</button>
                        <button v-if="species.length > 0" type="button" class="btn btn-sort" @click="sortDetails(species)">Sort species</button>
                        <button v-if="vehicles.length > 0" type="button" class="btn btn-sort" @click="sortDetails(vehicles)">Sort vehicles</button>
                        <button v-if="starships.length > 0" type="button" class="btn btn-sort" @click="sortDetails(starships)">Sort starships</button>
                    </div>
                    <div class="container-details-data">
                        <p><span>Height:</span> {{ height }}</p>
                        <p><span>Mass:</span> {{ mass }}</p>
                        <p><span>Hair color:</span> {{ hairColor }}</p>
                        <p><span>Eye color:</span> {{ eyeColor }}</p>
                        <p><span>Birth year:</span> {{ birthYear }}</p>
                        <p><span>Gender:</span> {{ gender }}</p>
                        <p><span>Planet:</span> {{ planet }}</p>
                    </div>
                </div>
                <div class="container-details-data">
                    <div v-if="films.length > 0">
                        <span>Films:</span>
                        <ul class="pt-2">
                            <li v-for="(film, index) in films" :key="index"> {{ film }}. </li>
                        </ul>
                    </div>
                    <div v-if="species.length > 0" class="pt-2">
                        <span>Species:</span>
                        <ul class="pt-2">
                            <li v-for="(specie, index) in species" :key="index">{{ specie }}. </li>
                        </ul>
                    </div>
                    <div v-if="vehicles.length > 0" class="pt-2">
                        <span>Vehicles:</span>
                        <ul class="pt-2">
                            <li v-for="(vehicle, index) in vehicles" :key="index">{{ vehicle }}. </li>
                        </ul>
                    </div>
                    <div v-if="starships.length > 0" class="pt-2">
                        <span>Starships:</span>
                        <ul class="pt-2">
                            <li v-for="(starship, index) in starships" :key="index">{{ starship }}. </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        
        <!-- Go Back button -->
        <div>
            <router-link to="/people/" class="btn btn-secondary btngoback">Go Back</router-link>
        </div>
    </section>
</template>

<script>
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
import sortBy from '../mixins/sortBy';

export default {
    mixins: [notificationError, isLoading, sortBy],
    name: 'PeopleDetails',
    data() {
        return {
            name: '',
            height: '',
            mass: '',
            hairColor: '',
            eyeColor: '',
            birthYear: '',
            gender: '',
            planet: '',
            films: [],
            species: [],
            vehicles: [],
            starships: []
        }
    },
    methods: {
        // GET PEOPLE DETAIL FROM SWAPI - ASYNC/AWAIT
        async getPeopleDetails() {
            try {
                this.isLoading = true;
                // GET peopleId FROM ROUTE PARAMS
                const peopleId = this.$route.params.peopleId;

                if (peopleId) {
                
                    // GET PERSON GENERAL INFO
                    const req = await fetch('https://swapi.dev/api/people/'+peopleId); 
                    const res = await req.json();

                    // HOMEWORLD
                    let planet;
                    if (res.homeworld) {
                        const reqHomeworld = await fetch(res.homeworld); 
                        const resHomeworld = await reqHomeworld.json();
                        planet = resHomeworld.name;
                    }

                    // FILMS
                    const films = [];
                    if (res.films.length > 0) {
                        for (let i = 0; i < res.films.length; i++) {
                            let reqFilms = await fetch(res.films[i]);
                            let resFilms= await reqFilms.json();
                            films.push(resFilms.title);
                        }
                    }

                    // SPECIES
                    const species = [];
                    if (res.species.length > 0) {
                        for (let i = 0; i < res.species.length; i++) {
                            let reqSpecies = await fetch(res.species[i]);
                            let resSpecies= await reqSpecies.json();
                            species.push(resSpecies.name);
                        }
                    }

                    // VEHICLES
                    const vehicles = [];
                    if (res.vehicles.length > 0) {
                        for (let i = 0; i < res.vehicles.length; i++) {
                            let reqVehicles = await fetch(res.vehicles[i]);
                            let resVehicles= await reqVehicles.json();
                            vehicles.push(resVehicles.name);
                        }
                    }

                    // STARSHIPS
                    const starships = [];
                    if (res.starships.length > 0) {
                        for (let i = 0; i < res.starships.length; i++) {
                            let reqStarships = await fetch(res.starships[i]);
                            let resStarships= await reqStarships.json();
                            starships.push(resStarships.name);
                        }
                    }

                    // GET ALL PROMISES AND UPDATE FRONT
                    await Promise.all([res, planet, films, species, vehicles, starships])

                    if (res) {
                        this.name = res.name;
                        this.height = res.height;
                        this.mass = res.mass;
                        this.hairColor = res.hair_color;
                        this.eyeColor = res.eye_color;
                        this.birthYear = res.birth_year;
                        this.gender = res.gender;
                    }
                    if (planet) this.planet = planet;
                    if ( films.length > 0) this.films = films;
                    if ( species.length > 0) this.species = species;
                    if ( vehicles.length > 0) this.vehicles = vehicles;
                    if ( starships.length > 0) this.starships= starships;

                    this.isLoading = false;
                }
            } catch (error) {
                this.errorNotification();
                this.loadingMsg = "An error occured. Cannot load data.";
                console.log(error);
            }
        }
    },
    created() {
        this.getPeopleDetails();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
