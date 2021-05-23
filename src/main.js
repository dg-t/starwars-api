import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';

import AppHeader from './components/Header/AppHeader.vue';
import Pagination from './components/Pagination/Pagination.vue';

const app = createApp(App);

app.component('app-header', AppHeader);
app.component('pagination', Pagination);



app.use(router);

app.mount('#app');