<template>
    <section class="container-fluid">

        <!-- Show error notification if something goes wrong -->
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <!-- People list header -->
        <div class="container-list-header">
            <h1 class="list-header">People</h1>
        </div>
        <!-- Sorting buttons -->
        <div class="container-sort">
            <button type="button" class="btn btn-sort" @click="sortDown(people)">Sort down<i class="fas fa-sort-down custom-icondown"></i></button>
            <button type="button" class="btn btn-sort ms-4" @click="sortUp(people)">Sort up<i class="fas fa-sort-up custom-iconup"></i></button>
        </div>
        <!-- Filter input -->
        <div class="container-filter">
            <input class="filter" type="text" v-model="filterPeople" placeholder="Search people">
        </div>
        <!-- If loading/error show Loading/error text while retriving data -->
        <!-- If data is retrived correctly show data -->
        <div class="container-list-data">
            <transition name="routes" mode="out-in">
                <p key=1 v-if="isLoading" class="loading">{{ loadingMsg }}</p>
                <p key=2 v-else-if="filteredPeople == ''" class="alert alert-warning py-3 mt-3">No data found with this criteria. Please try again.</p>
                <div key=3 v-else>
                    <div v-for="(p, index) in filteredPeople" :key="index">
                        <router-link :to="'/people/'+p.url.split('/').slice(1).slice(-2).join('/')" class="btn list-data">{{p.name}}</router-link>
                    </div>
                </div>
            </transition>
        </div>

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
    name: 'PeopleList',
    data() {
        return {
            people: [],
            filterPeople: ''
        }
    },
    methods: {
        // GET ALL PEOPLE FROM SWAPI - ASYNC/AWAIT
        async getPeople() {
            try {
                this.isLoading = true;
                const req = await fetch('https://swapi.dev/api/people'); 
                const res = await req.json();
                
                const people = [];
                if (res) {
                    for (let p = 0; p < res.results.length; p++) {
                        people.push(res.results[p])
                    }
                    this.people = people;
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
        filteredPeople() {
            return this.people.filter(person => {
                return person.name.toLowerCase().match(this.filterPeople.toLowerCase())
            })
        }
    },
    created() {
        this.getPeople();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
