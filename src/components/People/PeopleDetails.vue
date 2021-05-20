<template>
    <section class="container-fluid">
        <div>
            <h1>People detail</h1>
            <p>Name: {{ name }}</p>
            <p>Height: {{ height }}</p>
            <p>Mass: {{ mass }}</p>
            <p>Hair color: {{ hairColor }}</p>
            <p>Eye color: {{ eyeColor }}</p>
            <p>Birth year: {{ birthYear }}</p>
            <p>Gender: {{ gender }}</p>
            <p>Planet: {{ planet }}</p>
        </div>
        <div>
            <p v-if="films.length > 0">Films: <span v-for="(film, index) in films" :key="index">{{ film }}. </span></p>
        </div>
        <div>
            <p v-if="species.length > 0">Species: <span v-for="(specie, index) in species" :key="index">{{ specie }}. </span></p>
        </div>
        <div>
            <p v-if="vehicles.length > 0">Vehicles: <span v-for="(vehicle, index) in vehicles" :key="index">{{ vehicle }}. </span></p>
        </div>
        <div>
            <p v-if="starships.length > 0">Starships: <span v-for="(starship, index) in starships" :key="index">{{ starship }}. </span></p>
        </div>
        <div>
            <router-link to="/people/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PeopleList',
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

                // GET peopleId FROM ROUTE PARAMS
                const peopleId = this.$route.params.peopleId;

                if (peopleId) {
                
                    // GENERAL INFO
                    const req = await fetch('https://swapi.dev/api/people/'+peopleId); 
                    const res = await req.json();
                    
                    if (res) {
                        this.name = res.name;
                        this.height = res.height;
                        this.mass = res.mass;
                        this.hairColor = res.hair_color;
                        this.eyeColor = res.eye_color;
                        this.birthYear = res.birth_year;
                        this.gender = res.gender;
                    }

                    // HOMEWORLD
                    if (res.homeworld) {
                        const reqHomeworld = await fetch(res.homeworld); 
                        const resHomeworld = await reqHomeworld.json();

                        this.planet = resHomeworld.name;
                    }

                    // FILMS
                    if (res.films.length > 0) {
                        for (let i = 0; i < res.films.length; i++) {
                            let reqFilms = await fetch(res.films[i]);
                            let resFilms= await reqFilms.json();
                            this.films.push(resFilms.title);
                        }
                    }

                    // SPECIES
                    if (res.species.length > 0) {
                        for (let i = 0; i < res.species.length; i++) {
                            let reqSpecies = await fetch(res.species[i]);
                            let resSpecies= await reqSpecies.json();
                            this.species.push(resSpecies.name);
                        }
                    }

                    // VEHICLES
                    if (res.vehicles.length > 0) {
                        for (let i = 0; i < res.vehicles.length; i++) {
                            let reqVehicles = await fetch(res.vehicles[i]);
                            let resVehicles= await reqVehicles.json();
                            this.vehicles.push(resVehicles.name);
                        }
                    }

                    // STARSHIPS
                    if (res.starships.length > 0) {
                        for (let i = 0; i < res.starships.length; i++) {
                            let reqStarships = await fetch(res.starships[i]);
                            let resStarships= await reqStarships.json();
                            this.starships.push(resStarships.name);
                        }
                    }
                }
            } catch (error) {
                alert('Something went wrong...');
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
<style scoped>



</style>
