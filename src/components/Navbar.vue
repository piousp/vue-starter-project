<template lang="html">
  <nav class="navbar">
    <div class="navbar__left">
      <div class="navbar__logo">
        <i class="fa fa-fw fa-bars fa-2x" v-on:click="mostrarMenu"></i>
        <img src="/static/Ciris-contraforma.png" alt="Ciris" height="40px">
      </div>
    </div>
    <div class="navbar__right text--left">
      <i class="fa fa-fw" v-bind:class="titulo.meta.icono"></i>
      <span class="text text--grisc">{{titulo.meta.titulo}}</span>
      <popover name="default" class="popover float--right">
        <div slot="face" class="navbar__popover">
          <i class="fa fa-fw fa-user-circle-o"></i>
          <span>{{nombreUsuario}}</span>
          <i class="fa fa-fw fa-caret-down"></i>
        </div>
        <div slot="content">
          <ul class="popover__list">
            <router-link class="popover__list__item" tag="li" :to="{ name: 'parametros' }">
              <i class="fa fa-fw fa-cog"></i>
              <span>Configuración</span>
            </router-link>
            <li class="popover__list__item" v-on:click="logout">
              <i class="fa fa-fw fa-sign-out"></i>
              <span>Cerrar sesión</span>
            </li>
            <li class="popover__list__divider"></li>
            <li class="text--small text--italic navbar__version">
              <i class="fa fa-fw fa-tags"></i>
              <span>Versión: {{version}}</span>
            </li>
          </ul>
        </div>
      </popover>
    </div>
  </nav>
</template>

<script>//
import popover from "vue-popover";
import pkg from "../../package.json";

export default {
  data,
  methods: {
    mostrarMenu() {
      this.$parent.$emit("mostrarMenu");
    },
    logout
  },
  watch: {
    $route: route
  },
  components: {
    popover
  },
  computed: {
    nombreUsuario,
    version
  }
};

function data() {
  return {
    titulo: this.$router.currentRoute
  };
}

function route(val) {
  this.titulo = val;
}

function logout() {
  this.$auth.logout();
  this.$router.push("/login");
}

function nombreUsuario() {
  const usuario = this.$auth.usuario;
  return `${usuario.nombre}`;
}

function version() {
  return pkg.version;
}

</script>

<style lang="scss">
  @import "../sass/base/colores";
  @import "../sass/base/helpers";
  @import "../sass/base/resets";
  $ancho-menu: 200px;
  $ancho-menu-movil: 160px;
  .navbar {
    top: 0;
    left: 0;
    height: 52px;
    width: 100%;
    z-index: 2;
    background: $negro2;
    box-shadow: inset 0 -1px 0 $grisc;

    @media (min-width: $reflex-md ) {
      position: fixed;
    }
  }
  .navbar__left {
    width: 50px;
    float:left;

    @media (min-width: $reflex-md ) {
      width: $ancho-menu;
    }
  }
  .navbar__right {
    margin-left: 50px;
    text-align: center;
    padding: 15px;
    color: $grisc;

    @media (min-width: $reflex-md ) {
      margin-left: $ancho-menu;
      text-align: left;
    }
  }
  .navbar__logo {
    padding: 5px;
    height: 100%;
    .fa {
      color: $grisc;
      display: inherit;
    }
    img {
      display: none;
    }
    span {
      display: none
    }
    @media (min-width: $reflex-md ) {
      img {
        display: inherit;
        position: absolute;
        left: 12px;
      }
      span {
        display: inherit;
        left: 46px;
        top: 12px;
        position: absolute;
      }
      .fa {
        display: none;
      }
    }
  }
  .navbar__menu__interno{
    padding: 0 .5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .navbar__popover {
    cursor: pointer;
    text-align: right;
    margin-bottom: 9px;
  }
  .navbar__version {
    padding: 8px 16px;
  }
</style>
