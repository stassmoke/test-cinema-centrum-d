<template>
    <router-link :to="{path: `/${itemData.id}`}" :key="itemData.id" class="card">
        <div class="card-image__wrapper">
            <img class="card-image" :src="`https://image.tmdb.org/t/p/w500/${itemData.poster_path}`" :alt="itemData.title">
        </div>
        <div class="card-info__wrapper">
            <div class="card-title">{{itemData.title}}</div>
            <div class="card-avg">{{itemData.vote_average}}</div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        itemData: {}
    }
}
</script>

<style lang="sass">

.card
  padding: 2rem
  border: 1px solid #47535C

  &-image__wrapper
    width: 100%
    max-height: 100%

  &-image
    width: 100%
    height: auto
    object-fit: cover

  &-info__wrapper
    display: flex
    align-items: center
    justify-content: space-between
    padding-top: 2rem

  &-title,
  &-avg
    font-size: 1.4rem
    font-weight: 400

</style>