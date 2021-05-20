import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'

import AppController from './components/MainController/AppController.vue'
import AppHeader from './components/Header/AppHeader.vue';
import PeopleList from './components/People/PeopleList.vue';
import PeopleDetails from './components/People/PeopleDetails.vue';
import StarshipsList from './components/Starships/StarshipsList.vue';
import PlanetsList from './components/Planets/PlanetsList.vue';
import PlanetDetails from './components/Planets/PlanetDetails.vue';


const app = createApp(App);

app.component('app-controller', AppController);
app.component('app-header', AppHeader);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AppController },
        { path: '/people', component: PeopleList },
        { path: '/people/:peopleId', component: PeopleDetails },
        { path: '/starships', component: StarshipsList },
        { path: '/planets', component: PlanetsList },
        { path: '/planets/:planetId', component: PlanetDetails },
    ]
})

app.use(router);

app.mount('#app');