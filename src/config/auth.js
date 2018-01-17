const Auth = {
  install(Vue, axios, options) {
    Vue.auth = {
      usuario: {},

      login(login, password, recuerdame) {
        return axios
          .post(`${axios.defaults.baseUrl}/api/auth/login`, {
            login,
            password,
          })
          .then((resp) => {
            const storage = recuerdame ? localStorage : sessionStorage;
            storage.setItem(options.pkg, JSON.stringify(resp.data));
            this.usuario = resp.data.usuario;
            this.usuario.estaAutenticado = true;

            /* Se desactivó el lint porque axios no tiene una función para agregar los headers,
            sólo reasignando la variable como sale en la documentación */
            axios.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;
            return resp.data;
          });
      },

      logout() {
        sessionStorage.removeItem(options.pkg);
        localStorage.removeItem(options.pkg);
        this.usuario.estaAutenticado = false;
      },

      checkAuth() {
        const credenciales =
          JSON.parse(localStorage.getItem(options.pkg)) ||
          JSON.parse(sessionStorage.getItem(options.pkg));
        if (credenciales) {
          this.usuario = credenciales.usuario;
          this.usuario.estaAutenticado = !!credenciales.token;
          axios.defaults.headers.common.Authorization = `Bearer ${credenciales.token}`;
        }
      },
    };

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          return Vue.auth;
        },
      },
    });
  },
};

export default Auth;
