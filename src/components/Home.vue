<template>
  <div class="layout">
    <div class="layout__menu" tabindex="1" v-on:blur="cerrar" v-bind:class="{'layout__menu--active': estaMostrado}">
      <directorio></directorio>
    </div>
    <div class="layout__content">
      <navbar></navbar>
      <div class="layout__padding">
        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'app',
  components: {directorio: Menu, Navbar},
  created(){
    this.$auth.checkAuth();
    this.$on("mostrarMenu", function() {
      this.activarMenu();
    });
  },
  data() {
    return {
      estaMostrado: false
    };
  },
  methods: {
    activarMenu() {
      this.estaMostrado = !this.estaMostrado;
      setTimeout(() => {
        this.$el.querySelector(".layout__menu").focus();
      }, 100);
    },
    cerrar() {
      this.estaMostrado = false;
    }
  },
}
</script>

<style lang="scss">
  @import "../sass/base/colores";
  @import "../sass/base/helpers";
  @import "../sass/base/resets";
  .layout {
    height: 100%;
  }

  .layout__menu{
    @extend .sombra;
    background: $grise;
    z-index: 3;
    position: fixed;
    height: 100%;
    top: 52px;
    display: none;
    width: 160px;
    outline:none;

    @media (min-width: $reflex-md ) {
      display: inherit;
      width: 200px;
    }
  }

  .layout__menu--active {
    display: inherit !important;
  }

  .layout__content{
    background-attachment: fixed;
    background-size: cover;
    @media (min-width: $reflex-md ) {
      margin-left: 200px;
      margin-top: 43px;
    }
  }

  .layout__padding {
    padding: 1em;
    @media (min-width: $reflex-md ) {
      padding: 1em 3em;
    }
  }
</style>
