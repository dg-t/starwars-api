<template>
  <!-- App header -->
  <app-header />
  <!-- Manage and display all routes-->
  <router-view v-slot="slotProps">
      <transition name="routes" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

/* GLOBAL */

* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    letter-spacing: 1px;;
}

html {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 300;
    text-rendering: optimizeLegibility;
}

/** LIST / DETAILS */

.container-list-header, .container-details-header {
  padding: 20px;
  margin-left: 30px;
  color: #2d3e60;
}

.list-header, .details-header {
  text-shadow: 1px 0;
  font-weight: 700;
}

.container-list-data, .container-details-data {
  padding: 20px 0 0 20px;
}

/** LISTS */

.list-data {
  box-shadow: 1px 2px 2px 2px #888888;
  margin: 10px 0 10px 20px;
  text-shadow: 0 0 1px #FF0000;
  background-color: #f0eeee;
  min-width: 220px;
  max-width: 220px;
  transition: 0.8s;
}

.list-data:hover {
  background-color: black;
  color: white;
  transition: 0.8s;
}

/** DETAILS */

.container-details-data {
  margin: 10px 10px 10px 20px;
}

.container-details-data > div,
.container-details-data > p {
  font-style: italic;
}

.container-details-data > div > span, 
.container-details-data > p > span {
  font-weight: 700;
  color:#2d3e60;
}

.container-details-data > div > ul > li {
  padding: 0 10px;
  line-height: 33px;
}

/** BUTTON GO BACK */

.container-btngoback {
  padding: 20px;
}

.btngoback {
  box-shadow: 1px 2px 2px 2px #888888;
  text-shadow: 0 1px 1px #90ee90;
  margin:50px 20px;
  transition: 0.8s;
}

.btngoback:hover {
  background-color: white;
  color: #6c757d;
  transition: 0.8s;
}

/** FILTER / SORT */

.container-filter,
.container-sort-details {
  padding: 20px;
  margin-left: 18px;
}

.filter,
.btn-sort {
  padding: 5px;
  border-radius: 5px;
}

/** SORT */

.container-sort {
  padding: 15px;
  margin-left: 15px;
}

.btn-sort {
  box-shadow: 1px 1px 1px 1px #888888;
  font-size: 15px;
  margin-right: 30px;
  background-color: #f0eeee;
  transition: transform .2s;
}

.btn-sort:active {
  transform: scale(1.05);
}

/** SORT ICONS */

.custom-icondown {
    display:block;
    font-size: 25px;
    line-height: 10px;
    width: 80px;
    height: 20px;
}

.custom-iconup {
    display:block;
    font-size: 25px;
    line-height: 40px;
    width: 80px;
    height: 20px;
}

/** LOADING */

.loading {
  font-size: 40px;
  text-align: center;
  padding: 30px;
}

/** ANIMATION ROUTE */

.routes-enter-active {
  animation: animate-routes 0.5s ease-in;
}

.routes-leave-from {
  opacity :0;
}

@keyframes animate-routes {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/** MEDIA QUERY */

@media only screen and (max-width: 768px)  {

  /** LIST / DETAILS */

  .list-header, 
  .details-header {
    text-align: center;
  }

  /** LIST */
  .container-list-data {
    margin: 10px 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .list-data {
    margin: 10px 0;
  }

  /** BUTTON GO BACK */

  .container-btngoback {
    display: flex;
    justify-content:center;
  }

  /** FILTER */

  .container-filter {
    display: flex;
    justify-content: center;
    margin-left: 0;
  }

  .filter {
    text-align: center;
    margin-left: 0;
  }

  /** SORT */

  .container-sort-details {
    padding: 10px 0;
    margin-left: 0;
  }

  .container-sort {
    display: flex;
    justify-content: center;
  }

  .btn-sort {
    text-align: center;
    margin-left: 3%;
  }

}

@media only screen and (max-width: 680px)  {

  /** FILTER */

  .filter {
    text-align: center;
    margin-left: 0;
  }

  /** SORT */

  .btn-sort {
    text-align: center;
    margin-left: 5%;
  }

  .container-sort-details {
    display: flex;
    justify-content: space-around;
  }

}

</style>