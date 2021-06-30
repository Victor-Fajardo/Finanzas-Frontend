<template>
  <v-app>
    <v-app-bar app color="red darken-2">
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="text-h4" v-if="keyStatus">Descuento de Letras</v-toolbar-title>
        <v-divider
            class="mx-5"
            vertical>
        </v-divider>
        <div v-if="currentUser">
          <v-btn
              depressed
              rounded
              target="_blank"
              color="white"
              @click="logout">
            Cerrar Sesion
          </v-btn>
        </div>
        <v-divider
            class="mx-5"
            vertical>
        </v-divider>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    key: 0,
    keyStatus: true
  }),
  components: {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    rerender() {
      this.key += 1
      if (this.key > 0)
      {
        this.keyStatus = true
      }
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
}
</script>
