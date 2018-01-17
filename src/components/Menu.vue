<template>
  <ul class="menu">
    <li v-for="ruta in rutas" class="menu__item">
      <div class="menu__item__content" v-on:click="accionar(ruta)" v-if="ruta.meta ? !ruta.meta.esconder : true">
        <i class="fa fa-fw" v-bind:class="ruta.meta ? ruta.meta.icono : ''"></i>
        <span>{{ruta.meta.titulo}}</span>
      </div>
      <div class="menu__hijos" v-bind:class="{'menu__hijos--active': ruta.name === estirado}">
        <h1 class="menu__hijos__title">{{ruta.meta.titulo}}</h1>
        <ul>
          <li tag="li" v-on:click="accionar(hijo)" v-for="hijo in ruta.children" class="menu__hijos__item" v-if="hijo.meta ? !hijo.meta.esconder : true">
            <i class="fa fa-fw" v-bind:class="hijo.meta ? hijo.meta.icono : ''"></i>
            <span>{{hijo.meta.titulo}}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script type="text/javascript">
import pkg from "../../package.json";
import _ from "lodash";

export default {
  data,
  methods: {
    accionar,
    cerrar
  }
};

function data() {
  return {
    rutas: this.$router.options.routes[0].children,
    estirado: ""
  };
}

function accionar(ruta) {
  if (!ruta.children) {
    this.$router.push({ name: ruta.name });
    this.estirado = "";
  } else {
    if (ruta.name === this.estirado) {
      this.estirado = "";
    } else {
      this.estirado = ruta.name;
    }
  }
}

function cerrar() {
  this.estirado = "";
}

</script>
<style lang="scss">
@import "../sass/base/resets";
@import "../sass/base/colores";
@import "../sass/base/fondos";
@import "../sass/base/helpers";
@import "../sass/base/tipografia";
$ancho-menu: 200px;
$ancho-menu-movil: 160px;

.menu{
  outline:none;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu__item{
  @extend %sans;
  color: $gris6;
  cursor: pointer;
  font-size: .9em;

  &:hover{
    background: transparentize($negro2, .9);
  }

  &.router-link-active {
    @extend .text--blanco;
    background: transparentize($cyan, .8);
    cursor: default;
  }

  .menu__item__content {
    padding: 1em 0;
    font-size: 1em;
    padding-left: 17px;

    span {
      text-align: center;
    }

    @media (min-width: $reflex-md ) {
      visibility: visible;
    }
  }
}

.menu__hijos {
  border-right: 3px solid $turquesa;
  cursor: default;
  display: none;
  height: 0;
  opacity: 0;
  transition: all .5s;
  z-index: 5;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.menu__hijos--active {
  background: $blanco;
  box-shadow: 3px 0 3px transparentize($gris6, .4);
  color: $negro4;
  display: block;
  height: 100%;
  left: $ancho-menu-movil;
  list-style: none;
  margin: 0;
  opacity: 1;
  padding: 0;
  position: fixed;
  top: 52px;
  width: 12em;

  @media (min-width: $reflex-md ) {
    left: $ancho-menu;
  }
}

.menu__hijos__title {
  @extend %sans;
  @extend .text--center;
  @extend .text--negro2;
  font-size: 1.3em;
}

.menu__hijos__item {
  @extend %sans;
  @extend .text--left;
  background: inherit;
  cursor: pointer;
  padding: .5em 1em;

  &:hover {
    background: transparentize($verde, .8);
  }

  .fa {
    font-size: 1em;
  }

  span {
    display: inline;
  }
}

</style>
