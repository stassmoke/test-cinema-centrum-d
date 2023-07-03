<template>
    <div class="main">
        <div class="container" v-if="editedMovies.length">
            <div class="wrapper">
            <div  class="card_grid">
                <template v-for="mov in pageOfItems">
                <item :itemData="mov" :key="mov.id"/>
                </template>
            </div>
            <pagination :items="editedMovies" @changePage="onChangePage" :labels="customLabels" :styles="customStyles"/>
            </div>
        </div>
    </div>
</template>

<script>

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
    name: 'edited-movies',
    components: {
        pagination,
        item
    },
    data() {
        return {
            editedMovies: [],
            pageOfItems: [],
            customStyles,
            customLabels
        }
    },
    methods: {
        getEditedItems() {
            this.editedMovies = JSON.parse(localStorage.getItem("editedMovies")) || [];

        },
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        }
    },
    created() {
        this.getEditedItems()
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
  