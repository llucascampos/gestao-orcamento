<template>
  <v-app>
    <app-header></app-header>
    <v-container fluid>
      <router-view />
    </v-container>
    <app-footer style="position:absolute;	bottom:0;	width:100%;" ></app-footer>
  </v-app>
</template>

<script>
  import AppHeader from './components/AppHeader'
  import AppFooter from './components/AppFooter'

  export default {
    components: {
      AppHeader, 
      AppFooter
    }
  }
</script>
<style scoped>

</style>

