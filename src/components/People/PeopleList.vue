<template>
    <section class="container-fluid">
        <p v-if='isError'  class="fixed-top alert alert-warning">Something went wrong...</p>
        <h1>People</h1>
        <p v-if="isLoading">{{ loadingMsg }}</p>
        <div v-else>
            <div v-for="(p, index) in people"
                :key="index">
                <router-link :to="'/people/'+p.url.split('/').slice(1).slice(-2).join('/')" class="btn btn-primary">{{p.name}}</router-link>
            </div>
        </div>
        <div>
            <router-link to="/" class="btn btn-primary">Go back</router-link>
        </div>
    </section>
</template>

<script>
import notificationError from '../mixins/notificationError.js';
import isLoading from '../mixins/isLoading.js';
export default {
    mixins: [notificationError, isLoading],
    name: 'PeopleList',
    data() {
        return {
            people: [],
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
    created() {
        this.getPeople();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
