<template>
    <section class="container-fluid">
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <transition name="routes" mode="out-in">
            <p v-if="isLoading" class="loading">{{ loadingMsg }}</p>
            <div v-else>
                <div>
                    <div class="container-details-header">
                        <h3 class="details-header">{{ name }}</h3>
                    </div>
                    <div class="container-details-data">
                        <p>Model: {{ model }}</p>
                        <p>Manufacturer: {{ manufacturer }}</p>
                        <p>Cost In credits: {{ costInCredits }}</p>
                        <p>Length: {{ length }}</p>
                        <p>Max atmosphering speed: {{ maxAtmospheringSpeed }}</p>
                        <p>Crew: {{ crew }}</p>
                        <p>Passengers: {{ passengers }}</p>
                        <p>Cargo capacity: {{ cargoCapacity }}</p>
                        <p>Consumables: {{ consumables }}</p>
                        <p>Hyperdrive rating: {{ hyperdriveRating }}</p>
                        <p>MGLT: {{ MGLT }}</p>
                        <p>Starships class: {{ starshipsClass }}</p>
                    </div>
                </div>
                <div class="container-details-data">
                    <div v-if="films.length > 0">
                        <span>Films: </span>
                        <ul class="pt-2">
                            <li v-for="(film, index) in films" :key="index">{{ film }}. </li>
                        </ul>
                    </div>
                    <div v-if="pilots.length > 0">
                        <span>Pilots:</span> 
                        <ul class="pt-2">
                            <li v-for="(pilot, index) in pilots" :key="index">{{ pilot }}. </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <div>
            <router-link to="/starships/" class="btn btn-secondary btngoback">Go back</router-link>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
export default {
    mixins: [notificationError, isLoading],
    name: 'StarshipDetails',
    data() {
        return {
            name: '',
            model: '',
            manufacturer: '',
            costInCredits: '',
            length: '',
            maxAtmospheringSpeed: '',
            crew: '',
            passengers: '',
            cargoCapacity:'',
            consumables: '',
            hyperdriveRating: '',
            MGLT: '',
            starshipsClass: '',
            films: [],
            pilots: []
        }
    },
    methods: {
        // GET STARSHIP DETAIL FROM SWAPI - AXIOS ASYNC/AWAIT
        async getStarshipsDetails() {
            try {
                this.isLoading = true;
                // GET starshipId FROM ROUTE PARAMS
                const starshipId = this.$route.params.starshipId;

                if (starshipId) {
                
                    // GET STARSHIP GENERAL INFO
                    const res = await axios('https://swapi.dev/api/starships/'+starshipId); 
                    const starshipDetails = res.data;

                    // GET PILOTS
                    const pilots = [];
                    if (starshipDetails.pilots.length > 0) {
                        for (let i = 0; i < starshipDetails.pilots.length; i++) {
                            let resPilots = await axios(starshipDetails.pilots[i]);
                            pilots.push(resPilots.data.name);
                        }
                    }

                    // GET FILMS
                    const films = [];
                    if (starshipDetails.films.length > 0) {
                        for (let i = 0; i < starshipDetails.films.length; i++) {
                            let resFilms = await axios(starshipDetails.films[i]);
                            films.push(resFilms.data.title);
                        }
                    }

                    // GET ALL PROMISES AND UPDATE FRONT
                    await Promise.all([starshipDetails, pilots, films])

                    if (starshipDetails) {
                        this.name = starshipDetails.name;
                        this.model = starshipDetails.model;
                        this.manufacturer = starshipDetails.manufacturer;
                        this.costInCredits = starshipDetails.cost_in_credits;
                        this.length = starshipDetails.length;
                        this.maxAtmospheringSpeed = starshipDetails.max_atmosphering_speed;
                        this.crew = starshipDetails.crew;
                        this.passengers = starshipDetails.passengers;
                        this.cargoCapacity = starshipDetails.cargo_capacity;
                        this.consumables = starshipDetails.consumables;
                        this.hyperdriveRating = starshipDetails.hyperdrive_rating;
                        this.MGLT = starshipDetails.MGLT;
                        this.starshipsClass = starshipDetails.starship_class;
                    }
                    if (starshipDetails.pilots.length > 0) this.pilots = pilots;
                    if (starshipDetails.films.length > 0) this.films = films;

                    this.isLoading = false;
                }
            } catch (error) {
                this.errorNotification();
                this.loadingMsg = "An error occured. Cannot load data."
                console.log(error);
            }
        }
    },
    created() {
        this.getStarshipsDetails();
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
