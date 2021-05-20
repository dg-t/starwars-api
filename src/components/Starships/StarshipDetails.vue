<template>
    <section class="container-fluid">
        <div>
            <h1>Starships details</h1>
            <p>Name: {{ name }}</p>
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
        <div>
            <p v-if="films.length > 0">Films: <span v-for="(film, index) in films" :key="index">{{ film }}. </span></p>
        </div>
        <div>
            <p v-if="pilots.length > 0">Pilots: <span v-for="(pilot, index) in pilots" :key="index">{{ pilot }}. </span></p>
        </div>
        <div>
            <router-link to="/starships/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
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
        // GET STARSHIP DETAIL FROM SWAPI - ASYNC/AWAIT
        async getStarshipsDetails() {
            try {
                // GET starshipId FROM ROUTE PARAMS
                const starshipId = this.$route.params.starshipId;

                if (starshipId) {
                
                    // GENERAL INFO
                    const res = await axios('https://swapi.dev/api/starships/'+starshipId); 
                    const starshipDetails = res.data;
                    if (res) {
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

                    // PILOTS
                    if (starshipDetails.pilots.length > 0) {
                        for (let i = 0; i < starshipDetails.pilots.length; i++) {
                            let resPilots = await axios(starshipDetails.pilots[i]);
                            this.pilots.push(resPilots.data.name);
                        }
                    }

                    // FILMS
                    if (starshipDetails.films.length > 0) {
                        for (let i = 0; i < starshipDetails.films.length; i++) {
                            let resFilms = await axios(starshipDetails.films[i]);
                            this.films.push(resFilms.data.title);
                        }
                    }

                }
            } catch (error) {
                // alert('Something went wrong...');
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
