<template>
    <section class="container-fluid">
        <h1>Starships</h1>
        <div v-for="(s, index) in starships"
            :key="index">
            <router-link :to="'/starships/'+s.url.split('/').slice(1).slice(-2).join('/')" class="btn btn-primary">{{s.name}}</router-link>
        </div>
        <div>
            <router-link to="/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    name: 'StarshipsList',
    data() {
        return {
            starships: []
        }
    },
    methods: {
        // GET ALL STARSHIPS FROM SWAPI - AXIOS
        async getStarships() {
            try {
                const res = await axios('https://swapi.dev/api/starships'); 
                const resStarships = res.data.results;
                const starships = [];
                if (resStarships) {
                    for (let i = 0; i < resStarships.length; i++) {
                        starships.push(resStarships[i])
                    }
                    this.starships = starships;
                } 
            } catch (error) { 
                console.log(error) 
            }
        }
    },
    created() {
        this.getStarships();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
