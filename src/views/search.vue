  <template>
    <div class="main">
      <div class="container">
        <div class="wrapper">
          <div class="search-wrapper">
            <input class="search-input" type="text" @input="search" v-model="searchInput">
            <ul v-if="searchData.length && searchInput.length">
              <li v-for="link in searchData" :key="link.id">
                <router-link :to="{ path: `/${link.id}` }">{{link.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import axios from 'axios';

  
  export default {
    name: 'search-mov',
    data() {
      return {
        searchInput: '',
        searchData: []
      }
    },
    methods: {
      async search() {
        const isHaveQuery = !!this.searchInput.length
        const query = isHaveQuery ? `?query=${this.searchInput}` : ''
        if (isHaveQuery) {
          // Api https://developer.themoviedb.org/
          const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie${query}`)
          this.searchData = data.results
        }
      }
    },
  }
  </script>
  
  <style lang="sass" scoped>

    .main
      padding: 5rem 0

    .wrapper
      display: flex
      flex-direction: column
      align-items: center

    .search-wrapper
      width: 100%
      max-width: 60rem  
      position: relative

    .search-input
      width: 100%
      height: 36px
      padding: 1rem
      border: 1px solid #47535C
      border-radius: 5px
      background-color: #17232f
      color: #B6BEC2

      &:focus
        outline: none
        border: 1px solid #47535C

    ul
      position: absolute
      top: 100%
      left: 0
      width: 100%
      max-height: 20rem
      overflow-y: auto
      border: 1px solid #47535C
      background-color: #17232f
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
      z-index: 10

      li
        padding: 8px 10px
        cursor: pointer

        &:hover
          background-color: #343c43




  </style>
  