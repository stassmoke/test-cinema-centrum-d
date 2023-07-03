<template>
  <main class="main">
    <div class="container" v-if="popularMov.length">
      <h1>Popular movies</h1>
      <div class="wrapper">
        <div  class="card_grid">
          <template v-for="mov in pageOfItems">
            <item :itemData="mov" :key="mov.id"/>
          </template>
        </div>
        <pagination 
          :items="popularMov" 
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
import pagination from '../components/Pagination-app.vue'
import item from '../components/Movie-item.vue'

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
  name: 'popular-mov',
  components: { 
    pagination,
    item,
  },
  data() {
    return {
      popularMov: [],
      customLabels,
      customStyles,
      pageOfItems: []
    }
  },
  methods: {
    async getPopularMov() {
      await axios.get('https://api.themoviedb.org/3/movie/popular')
      .then(({data}) => {
        this.popularMov = data.results;
      })
    },
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
  },
  created() {
    this.getPopularMov()
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