<template>
    <section class="container-fluid">
        <h1>People detail</h1>
        <p>name: {{ name }}</p>
        <p>height: {{ height }}</p>
        <p>mass: {{ mass }}</p>
        <p>hairColor: {{ hairColor }}</p>
        <p>eyeColor: {{ eyeColor }}</p>
        <p>birthYear: {{ birthYear }}</p>
        <p>gender: {{ gender }}</p>
        <p>planet: {{ planet }}</p>
        <div>
            <span>Films: <span v-for="(film, index) in films" :key="index">{{ film }}. </span></span>
        </div>
        <div>
            <span>Vehicles: <span v-for="(vehicle, index) in vehicles" :key="index">{{ vehicle }}. </span></span>
        </div>
        <div>
            <span>Starships: <span v-for="(starship, index) in starships" :key="index">{{ starship }}. </span></span>
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
            vehicles: [],
            starships: []

        }
    },
    methods: {
        async getDetails() {
            const peopleId = (this.$route.params.peopleId)*1+1;
            
            // GENERAL INFO
            const req = await fetch('https://swapi.dev/api/people/'+peopleId); 
            const res = await req.json();

            this.name = res.name;
            this.height = res.height;
            this.mass = res.mass;
            this.hairColor = res.hair_color;
            this.eyeColor = res.eye_color;
            this.birthYear = res.birth_year;
            this.gender = res.gender;

            // HOMEWORLD

            const reqHomeworld = await fetch(res.homeworld); 
            const resHomeworld = await reqHomeworld.json();

            this.planet = resHomeworld.name;

            // FILMS
            for (let i = 0; i < res.films.length; i++) {
                let reqFilms = await fetch(res.films[i]);
                let resFilms= await reqFilms.json();
                this.films.push(resFilms.title);
            }

            // SPECIES
            for (let i = 0; i < res.species.length; i++) {
                let reqSpecies = await fetch(res.species[i]);
                let resSpecies= await reqSpecies.json();
                this.films.push(resSpecies.name);
            }

            // VEHICLES
            for (let i = 0; i < res.vehicles.length; i++) {
                let reqVehicles = await fetch(res.vehicles[i]);
                let resVehicles= await reqVehicles.json();
                this.vehicles.push(resVehicles.name);
            }

            // STARSHIPS
            for (let i = 0; i < res.starships.length; i++) {
                let reqStarships = await fetch(res.starships[i]);
                let resStarships= await reqStarships.json();
                this.starships.push(resStarships.name);
                console.log(resStarships.name)
            }

        

        }
    },
    created() {
        this.getDetails();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
