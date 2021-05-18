<template>
    <section class="container-fluid">
        <h1>People</h1>
        <div v-for="(p, index) in people"
            :key="index">
            <p>{{p.name}}</p>
            <p>{{p.height}}</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PeopleList',
    data() {
        return {
            people: []
        }
    },
    methods: {
        async getPeople() {
            
            const req = await fetch('https://swapi.dev/api/people'); 
            const res = await req.json();

            for (let p = 0; p < res.results.length; p++) {
                this.people.push(res.results[p])
            }
            console.log(this.people[0])
        },
        /** THEN */
        // getPeople() {
        //     fetch('https://swapi.dev/api/people').then((res) => {
        //         if (res.ok) {
        //             return res.json();
        //         }
        //     }).then((data) => {
        //         console.log(data)
        //     })
        // },
    },
    created() {
        this.getPeople();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
