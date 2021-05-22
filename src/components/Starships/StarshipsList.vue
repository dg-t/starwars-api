<template>
    <section class="container-fluid">
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <div class="container-list-header">
            <h1 class="list-header">Starships</h1>
        </div>
        <div class="container-filter">
            <input class="filter" type="text" v-model="filterStarships" placeholder="Search starships">
        </div>
        <div class="container-list-data">
            <transition name="routes" mode="out-in">
                <p key=1 v-if="isLoading" class="loading">{{ loadingMsg }}</p>
                <p key=2 v-else-if="filteredStarships == ''" class="alert alert-warning py-3 mt-3">No data found with this criteria. Please try again.</p>
                <div key=3 v-else>
                    <div v-for="(s, index) in filteredStarships" :key="index">
                        <router-link :to="'/starships/'+s.url.split('/').slice(1).slice(-2).join('/')" class="btn list-data">{{s.name}}</router-link>
                    </div>
                </div>
            </transition>
        </div>
        <div class="container-btngoback">
            <router-link to="/" class="btn btn-secondary btngoback">Go Back</router-link>
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
            filterStarships: ''
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
    computed: {
        filteredStarships() {
            return this.starships.filter(starship => {
                return starship.name.toLowerCase().match(this.filterStarships.toLowerCase())
            })
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
