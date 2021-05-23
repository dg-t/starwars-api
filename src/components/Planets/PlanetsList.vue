<template>
    <section class="container-fluid px-md-5 pt-md-3">

        <!-- Show error notification if something goes wrong -->
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <!-- Planets list header -->
        <div class="container-list-header">
            <h1 class="list-header">Planets</h1>
        </div>
        <!-- Sorting buttons -->
        <div class="container-sort">
            <button type="button" class="btn btn-sort" @click="sortDown(visiblePlanets)">Sort down<i class="fas fa-sort-down custom-icondown"></i></button>
            <button type="button" class="btn btn-sort ms-4" @click="sortUp(visiblePlanets)">Sort up<i class="fas fa-sort-up custom-iconup"></i></button>
        </div>
        <!-- Filter input -->
        <div class="container-filter">
            <input class="filter" type="text" v-model="filterPlanets" placeholder="Filter planets">
        </div>
        <!-- If loading/error show Loading/error text while retriving data -->
        <!-- If data is retrived correctly show data -->
        <div class="container-list-data">
            <transition name="routes" mode="out-in">
                <p key=1 v-if="isLoading" class="loading">{{ loadingMsg }}</p>
                <p key=2 v-else-if="filteredPlanets == ''" class="alert alert-warning py-3 mt-3">No data found with this criteria. Please try again.</p>
                <div key=3 v-else>
                    <div v-for="(p, index) in visiblePlanets" :key="index" :currentPage="currentPage">
                        <router-link v-if="p.name.toLowerCase().match(filterPlanets.toLowerCase())"  :to="'/planets/'+p.url.split('/').slice(1).slice(-2).join('/')" class="btn list-data">{{p.name}}</router-link>
                    </div>
                </div>
            </transition>
        </div>

        <!-- Pagination -->
        <pagination :visibleData="planets" @update-page="updatePage" :currentPage="currentPage" :resPerPage="resPerPage"></pagination>
        
        <!-- Go Back button -->
        <div class="container-btngoback">
            <router-link to="/" class="btn btn-secondary btngoback">Go Back</router-link>
        </div>
    </section>
</template>

<script>
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
import sortBy from '../mixins/sortBy.js';

export default {
    mixins: [notificationError, isLoading, sortBy],
    name: 'PlanetsList',
    data() {
        return {
            planets: [],
            visiblePlanets: [],
            filterPlanets: '',
            currentPage: 0,
            resPerPage: 3,
        }
    },
    methods: {
        // GET ALL PLANETS FROM SWAPI - THEN/CATCH
        getPlanets() {
            this.isLoading = true;
            fetch('https://swapi.dev/api/planets')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    const planets = [];
                    for (let p = 0; p < data.results.length; p++) {
                        planets.push(data.results[p]);
                    }
                    this.planets = planets;
                    this.isLoading = false;

                    this.updateVisiblePlanets();
                }
            })
            .catch(error => {
                this.errorNotification();
                this.loadingMsg = "An error occured. Cannot load data.";
                console.log(error);
            });
        },
        updatePage(pageNumber) {
            this.currentPage = pageNumber;
            this.updateVisiblePlanets();
        },
        updateVisiblePlanets() {
            this.visiblePlanets = this.planets.slice(this.currentPage * this.resPerPage, (this.currentPage * this.resPerPage) + this.resPerPage);
            if (this.visiblePlanets.length == 0 && this.currentPage > 0) {
                this.updatePage(this.currentPage -1);
            }
        }
    },
    computed: {
        filteredPlanets() {
            return this.visiblePlanets.filter(planet => {
                return planet.name.toLowerCase().match(this.filterPlanets.toLowerCase());
            });
        }
    },
    created() {
        this.getPlanets();
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
