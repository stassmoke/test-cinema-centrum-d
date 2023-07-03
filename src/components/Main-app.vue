<template>
  <main class="main">
    <div class="container" v-if="topMov.length">
      <h1>Top movies</h1>
      <div class="wrapper">
        <div  class="card_grid">
          <template v-for="mov in pageOfItems">
            <item :itemData="mov" :key="mov.id"/>
          </template>
        </div>
        <pagination
          :items="topMov" 
          @changePage="onChangePage" 
          :labels="customLabels" 
          :styles="customStyles"
          pageSize="8"
        />
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import pagination from './Pagination-app.vue'
import item from './Movie-item.vue'

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

const customStyles = {
    ul: {
        paddingTop: '2rem'
    },
};


export default {
  components: { 
    pagination,
    item,
  },
  data() {
    return {
      topMov: [],
      customLabels,
      customStyles,
      pageOfItems: []
    }
  },
  methods: {
    async getTopMov() {
      // Api https://developer.themoviedb.org/
      await axios.get('https://api.themoviedb.org/3/movie/top_rated')
      .then(({data}) => {
        this.topMov = data.results;
      })
    },
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
  },
  created() {
    this.getTopMov()
  }
}
</script>

<style lang="sass" scoped>

.main
  padding: 5rem 0

.wrapper
  display: flex
  flex-direction: column
  align-items: center


.card_grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  grid-column-gap: 3rem
  grid-row-gap: 2rem




</style>