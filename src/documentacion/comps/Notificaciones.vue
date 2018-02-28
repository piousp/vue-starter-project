<template lang="html">
  <section>
    <h1 class="titulo">Notificaciones Toastr</h1>
    <p class="text">Documentación: <a href="https://github.com/CodeSeven/toastr">https://github.com/CodeSeven/toastr</a></p>
    <pre class="javascript">
      <code v-cis-code>
        import toastr from "toastr";
        export default {
        methods: {
        mostrar
        }
        };
        function mostrar( ) {
        toastr.success( "Esto es una notificación de éxito", "Título de éxito" );
        toastr.info( "Esto es una notificación informativa", "Título informativo" );
        toastr.warning( "Esto es una notificación de advertencia", "Título de advertencia" );
        toastr.error( "Esto es una notificación de error", "Título de error" );
        }
      </code>
    </pre>
    <div class="grid">
      <div class="col-auto">
        <button class="boton boton--verde"
                @click="mostrar('success')">
          Éxito
        </button>
      </div>
      <div class="col-auto">
        <button class="boton boton--morado"
                @click="mostrar('info')">
          Informativa
        </button>
      </div>
      <div class="col-auto">
        <button class="boton boton--ambar"
                @click="mostrar('warning')">
          Advertencia
        </button>
      </div>
      <div class="col-auto">
        <button class="boton boton--rojo"
                @click="mostrar('error')">
          Error
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    mostrar,
  },
};

function mostrar(tipo) {
  this.$toastr("add", {
    title: "Título", msg: "Este es el mensaje", timeout: 60000, type: tipo,
  });
}
</script>
