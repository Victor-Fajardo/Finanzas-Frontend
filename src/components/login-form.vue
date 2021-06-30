<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="12" md="8">
                <v-card-title class="text-center display-2 blue--text text--accent-3 mx-6">Iniciar Sesion</v-card-title>
                <v-card-text class="mt-12">
                  <v-form v-model="isValid">
                    <v-text-field
                        label="Correo electronico"
                        v-model="data.email"
                        :rules="[v => !!v || 'Se requiere correo electronico']"
                        required
                        prepend-icon="mdi-email"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Contraseña"
                        prepend-icon="mdi-lock"
                        v-model="data.password"
                        type="password"
                        autocomplete="off"
                        :rules="[v => !!v || 'Se requiere contraseña']"
                        required
                    >
                    </v-text-field>
                    <div v-if="message">
                      {{message}}
                    </div>
                    <v-card-actions>
                      <v-btn class="mx-9" rounded color="blue lighten-3" :disabled="loading" @click="Login">
                        <v-progress-circular indeterminate color="blue accent-3" v-if="loading"></v-progress-circular>
                        Iniciar Sesion
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-col>
              <v-col cols="11" md="4" class="blue lighten-2">
                <v-card-text class="black--text mt-12">
                 <h1 class="text-center display-1">¿No tiene cuenta?</h1>
                  <h5 class="text-center"></h5>
                  <v-card-actions>
                    <v-col cols="1"></v-col>
                    <v-col>
                      <v-btn class="mx-16" rounded outlined="" dark>
                        <router-link to="/register">
                          Registrarse
                        </router-link>
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "login-form",
  data:() => ({
      data: {
        email: '',
        password: ''
      },
      loading: false,
      message: '',
      isValid: true,
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
    if (localStorage.getItem('user') != null)
    {
      var aux = JSON.parse(localStorage.getItem('user')).userId
      this.$router.push('/letra/' + aux)
    }
  },
  methods: {
    Login() {
      this.loading = true;
      axios.post('https://finanzas-api.herokuapp.com/api/user/authenticate', this.data).then(response=>{
        if (response.data.token) {
          console.log('user' + response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          window.location.reload()
        }
      },
          error => {
            this.loading = false
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>

</style>