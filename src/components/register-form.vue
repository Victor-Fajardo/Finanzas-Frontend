<template>
  <v-content>
    <v-container class="fill-height" fluio>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="12" md="8">
                <v-card-title class="text-center display-2 blue--text text--accent-3 mx-6">Crear Cuenta</v-card-title>
                <v-card-text class="mt-12">
                  <v-form v-model="isValid" @submit.prevent="handleRegister">
                    <v-text-field
                        label="Nombre de usuario"
                        v-model="user.userName"
                        :rules="[v=> !!v || 'Se requiere un nombre']"
                        required
                        prepend-icon="mdi-account">
                    </v-text-field>
                    <v-text-field
                      label="Nombre de la empresa"
                      v-model="user.companyName"
                      :rules="[v=> !!v || 'Se requiere un nombre']"
                      required
                      prepend-icon="mdi-account">
                    </v-text-field>
                    <v-text-field
                        label="RUC de la empresa"
                        v-model="user.ruc"
                        :rules="[v=> !!v || 'Se requiere un RUC']"
                        required
                        prepend-icon="mdi-account">
                    </v-text-field>
                    <v-text-field
                        label="Contraseña"
                        v-model="user.password"
                        type="password"
                        autocomplete="off"
                        :rules="passwordRules"
                        required
                        prepend-icon="mdi-lock">
                    </v-text-field>
                    <v-text-field
                        label="Correo electronico"
                        v-model="user.email"
                        :rules="emailRules"
                        required
                        prepend-icon="mdi-email">
                    </v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="mx-9" rounded color="white" :disabled="!isValid" @click="postUser()">
                    Registrarse
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col cols="11" md="4" class="blue lighten-2">
                <v-card-text class="black--text mt-12">
                  <h1 class="text-center display-1">Bienvenido</h1>
                  <h5 class="text-center">Si ya tiene una cuenta, inicie sesion</h5>
                  <v-card-actions>
                    <v-col>
                      <v-btn class="mx-16" rounded color="white">
                        <router-link to="/">
                          Iniciar Sesion
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
  </v-content>
</template>

<script>
import User from "@/models/user";
import axios from "axios";

export default {
name: "register-form",
  data() {
  return{
    user: new User('','','','','',''),
    submitted: false,
    successful: false,
    message: '',
    password:null,
    email:null,
    isValid:null,
    emailRules: [
        v=> !!v || 'Se requiere correo electronico',
        v=> /.+@.+/.test(v) || 'El correo electronico debe ser valido'
    ],
    passwordRules: [
        v=> !!v || 'Se requiere contraseña'
    ],
    nameRules: [
        v=> !!v || 'Se requiere un nombre'
    ],
  }
  },
  computed: {
  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }
  },
  mounted() {
  if (this.loggedIn) {
    this.$router.push('/');
  }
  },
  methods: {
  postUser() {
    const data = {
      "userName": this.user.userName,
      "password": this.user.password,
      "companyName": this.user.companyName,
      "ruc": parseInt(this.user.ruc),
      "email": this.user.email
    };
    axios.post('https://finanzas-api.herokuapp.com/api/user/1', data).catch(e=>{
      this.error.push(e);
    });
    this.$router.push('/');
  },
    handleRegister() {
    this.message = '';
    this.submitted = true;
    if (this.isValid) {
      this.$store.dispatch('auth/register', this.user).then(
          data => {
            this.message = data.message;
            this.successful = true;
          },
          error => {
            this.message = (error.response && error.response.data)
              || error.message || error.toString();
            this.successful = false;
          }
      )
    }
    }
  }
}
</script>

<style scoped>

</style>