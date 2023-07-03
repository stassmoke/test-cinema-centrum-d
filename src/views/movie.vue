<template>
    <div class="movie">
      <div class="container">
        <div class="wrapper" v-if="movieFields">
          <div class="card-image__wrapper">
            <img class="card-image" :src="`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`" :alt="oneMovie.title">
          </div>
          <div class="movie-card">
            <p
              v-if="editingMode"
              class="movie-card__title"
            >
              Title
            </p>
            <h2
              v-if="!editingMode"
              class="movie-title"
            >
              {{movieFields.title}}
            </h2>
            <input
              class="edit-field"
              v-if="editingMode"
              v-model="movieFields.title"
              placeholder="Title"
            >
            <p 
              class="movie-card__title"
            >
              Description
            </p>
            <textarea
              class="edit-field edit-field__area"
              v-if="editingMode" 
              v-model="movieFields.overview" 
              placeholder="Title"
            ></textarea>
            <p 
              v-if="!editingMode"
              class="movie-overview movie-card__text"
            >
              {{movieFields.overview}}
            </p>
            <p 
              class="movie-card__title"
            >
              Tagline
            </p>
            <input
              class="edit-field"
              v-if="editingMode" 
              v-model="movieFields.tagline" 
              placeholder="Title">
            <div 
              v-if="!editingMode" 
              class="movie-tagline movie-card__text"
            >
              {{movieFields.tagline}}
            </div>
            <p class="movie-card__title">Rating</p>
            <input
              class="edit-field"
              v-if="editingMode" 
              v-model="movieFields.vote_average" 
              placeholder="Title"
            >
            <div 
              v-if="!editingMode" 
              class="movie-vote_average movie-card__text"
            >
              {{movieFields.vote_average}}
            </div>
            <div class="movie-card__btns">
              <button v-if="!editingMode"  class="movie-edit btn" @click="editMovie">Edit</button>
              <template v-else>
                <button class="movie-edit__save btn" @click="saveMovie">Save</button>
                <button class="movie-edit__cancel btn" @click="cancelEditMovie">Cancel</button>
              </template>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import axios from 'axios';

  
  export default {
    name: 'movie-one',
    components: {
    },
    data() {
      return {
        oneMovie: null,
        movieId: null,
        editingMode: false,
        movieFields: null
      }
    },
    computed: {
     
    },
    methods: {
      setFields() {
        this.movieFields = {
          title: this.oneMovie.title,
          overview: this.oneMovie.overview,
          tagline: this.oneMovie.tagline,
          vote_average: this.oneMovie.vote_average,
        }
      },
      editMovie() {
        this.editingMode = true;
      },
      cancelEditMovie() {
        this.editingMode = false;
        this.setFields()
      },
      saveMovie() {
        this.editingMode = false;
        // Save the edited movie to local storage
        const editedMovies = JSON.parse(localStorage.getItem("editedMovies")) || [];
        let found = false;
        for (let i = 0; i < editedMovies.length; i++) {
          if (editedMovies[i].id === this.oneMovie.id) {
            editedMovies[i] = { ...this.oneMovie, ...this.movieFields};
            found = true;
            break;
          }
        }

        if (!found) {
          editedMovies.push({ ...this.oneMovie, ...this.movieFields});
        }

        
        localStorage.setItem("editedMovies", JSON.stringify(editedMovies));
      },
      getMovId() {
        this.movieId = this.$route.params.id || null;
      },
      async getMov() {
        await axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}`)
        .then(({data}) => {
          this.oneMovie = data;
          // if (!this.findEditedMovieAndReplaceData()) {
            this.setFields()
          // }
        })
    },
    // findEditedMovieAndReplaceData() {
    //   const editedMovies = JSON.parse(localStorage.getItem("editedMovies")) || [];
    //   for (let i = 0; i < editedMovies.length; i++) {
    //     if ( editedMovies[i].id === Number(this.$route.params.id)) {
    //       this.movieFields = { ...this.oneMovie, ...editedMovies[i]}
    //       return editedMovies[i].id === Number(this.$route.params.id)
    //     }
    //   }
    // }
  },
  created() {
      this.getMovId()
      this.getMov()
  }
}
  </script>
  
<style lang="sass" scoped>

.wrapper
  padding: 5rem 0
  display: flex
  align-items: center

.card-image__wrapper
  width: 100%
  max-width: 40rem
  height: auto

  .card-image
    width: 100%
    height: 100%
    object-fit: cover 

.movie

  &-card
    padding-left: 4rem
    align-self: flex-start
    width: 100%

    &__text
      margin-bottom: 3rem
      font-size: 1.4rem

    &__btns
      display: flex
      align-items: center

  &-title
    font-size: 4rem
    font-weight: 500
    margin-bottom: 4rem

  &-card__title
    font-size: 1.6rem
    font-weight: 400
    margin-bottom: 2rem

.edit-field
  width: 100%
  max-width: 50rem
  margin-bottom: 3rem

  &__area
    min-height: 9rem

.movie-edit
  margin-right: 1.5rem

  &__cancel
    &:hover
      background: #950d1c

  &__save
    margin-right: 2rem

    &:hover
        background: #2f732e

</style>
