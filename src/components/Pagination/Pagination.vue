<template>
  <!-- Pagination buttons logic -->
  <div v-if="totalPages() > 0" class="container-pagination">
    <button v-if="showPrevPage()" class="btn" v-on:click="updatePage(currentPage - 1)"> prev </button>
    <span class="px-4">{{ currentPage + 1 }} of {{ totalPages() }}</span>
    <button v-if="showNextPage()" class="btn" v-on:click="updatePage(currentPage + 1)"> next </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['visibleData', 'currentPage', 'resPerPage'],
  methods: {
    updatePage(pageNumber) {
      this.$emit('update-page', pageNumber);
    },
    totalPages() {
      return Math.ceil(this.visibleData.length / this.resPerPage);
    },
    showPrevPage() {
      return this.currentPage == 0 ? false : true;
    },
    showNextPage() {
      return this.currentPage == (this.totalPages() - 1) ? false : true;
    }
  }
}
</script>
<style scoped>

/** PAGINATION BUTTONS */

.container-pagination {
    padding: 30px 20px;
    margin-top: 50px;
}

button {
    box-shadow: 1px 1px 1px 1px #888888;
    text-shadow: 0 1px 1px #ffffff;
    background-color: #ccc;
    transition: 0.5s;
}

button:hover {
    background-color: rgb(235, 235, 235);
    text-shadow: none;
    color: black;
    transition: 0.5s;
}

/** MEDIA QUERY */

@media only screen and (max-width: 768px)  {

    .container-pagination {
        display: flex;
        justify-content: center;
    }
}

@media only screen and (max-width: 680px)  {

    button {
      font-size: 15px;
      height:40px;
    }

    span {
      font-size: 15px;
      padding: 12px !important;
    }
}
</style>