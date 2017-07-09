<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Annual Meeting Registrants</v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
    </v-toolbar>
    <main>
      <v-container>
        <listing-page></listing-page>
      </v-container>
    </main>
    <v-footer>
      <div>&copy; 2017 GCF Task Force</div>
    </v-footer>
  </v-app>
</template>
<script>

  export default {
    data () {
      return {
        title: '2017 GCF Annual Meeting',
      }
    },
    // created () {
    //   console.log('LISTO');
    // },
    methods: {
      setActiveLang: function(lang) {
        this.activeLang = lang;
        this.activeTranslationLookup = translationLookups[this.activeLang];
      },
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  main {
    /*background-color: #94a9a4;*/
  }
  main > .container {
    /*max-width: 800px;*/
  }
</style>
