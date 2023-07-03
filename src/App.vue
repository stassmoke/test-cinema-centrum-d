<template>
  <div id="app">
    <Header/>
    <main>
      <template v-if="isMainPage">
        <main-app/>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </main>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/components/layout/Header-app.vue";
import Footer from "@/components/layout/Footer-app.vue";
import MainApp from "@/components/Main-app.vue";


export default {
  name: 'App',
  components: {
    Header,
    Footer,
    MainApp,
  },
  computed: {
    isMainPage() {
      return this.$route.path === '/';
    },
  }
}
</script>

<style>


</style>