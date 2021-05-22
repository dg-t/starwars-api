<template>
    <section class="container-fluid">
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <h1>Starships</h1>
        <p v-if="isLoading">{{ loadingMsg }}</p>
        <div v-else>
            <div v-for="(s, index) in starships"
                :key="index">
                <router-link :to="'/starships/'+s.url.split('/').slice(1).slice(-2).join('/')" class="btn btn-primary">{{s.name}}</router-link>
            </div>
        </div>
        <div>
            <router-link to="/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
export default {
    mixins: [notificationError, isLoading],
    name: 'StarshipsList',
    data() {
        return {
            starships: [],
        }
    },
    methods: {
        // GET ALL STARSHIPS FROM SWAPI - AXIOS
        async getStarships() {
            try {
                this.isLoading = true;
                const res = await axios('https://swapi.dev/api/starships'); 
                const resStarships = res.data.results;
                const starships = [];
                if (resStarships) {
                    for (let i = 0; i < resStarships.length; i++) {
                        starships.push(resStarships[i])
                    }
                    this.starships = starships;
                    this.isLoading = false;
                } 
            } catch (error) { 
                this.errorNotification();
                this.loadingMsg = "An error occured. Cannot load data."
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
