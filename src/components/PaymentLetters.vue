<template>
  <v-main class="grey lighten-2">
    <v-container class="grey lighten-3">
      <v-data-table
          :headers="headers"
          :items="paymentLetters"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>Cartera de Letras</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  Agregar Letra
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                      >
                        <v-combobox
                           v-model="editedItem.currency"
                          :items="currencies"
                          label="Moneda">
                        </v-combobox>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                      >
                        <v-text-field
                            v-model="editedItem.amount"
                            label="Monto"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                      >
                        <v-menu
                          v-model="emissionMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.emisisonDate"
                              label="Fecha de emisión"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on">
                            </v-text-field>
                          </template>
                          <v-date-picker
                              v-model="editedItem.emisisonDate"
                              @input="emissionMenu = false">
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                      >
                        <v-menu
                            v-model="expirationMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editedItem.expirationDate"
                                label="Fecha de vencimiento"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on">
                            </v-text-field>
                          </template>
                          <v-date-picker
                              v-model="editedItem.expirationDate"
                              @input="expirationMenu = false">
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¿Está seguro de que quiere eliminar esta letra?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.operation="{ item }">
          <v-card-actions>
            <v-btn color="blue lighten-2" rounded depressed>
              <router-link :to="{ name: 'Operation', params: { paymentLetterId: item.paymentLetterId } }">
                <span class="mr-2">Seleccionar</span>
              </router-link>
            </v-btn>
          </v-card-actions>
        </template>
        <template v-slot:no-data>
          <h4>No tiene letras registradas</h4>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "paymentLetters",
  data: () => ({
    userId: 0,
    dialog: false,
    dialogDelete: false,
    loading: false,
    emissionMenu: false,
    expirationMenu: false,
    headers: [
      { text: 'Moneda', value: 'currency' },
      { text: 'Monto', value: 'amount' },
      { text: 'Fecha de emisión', value: 'emisisonDate' },
      { text: 'Fecha de vencimiento', value: 'expirationDate' },
      { text: 'Opciones', value: 'actions', sortable: false },
      { text: '', value: 'operation', sortable: false}
    ],
    currencies: [
      'Soles',
      'Dólares'
    ],
    paymentLetters: [],
    editedIndex: -1,
    editedItem: {
      currency: 'Soles',
      amount: 0,
    },
    defaultItem: {
      currency: 'Soles',
      amount: 0,
      emisisonDate: new Date().toISOString().substr(0, 10),
      expirationDate: new Date().toISOString().substr(0, 10)
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.userId = this.$route.params.userId
      this.paymentLetters = []
      axios.get('https://finanzas-api.herokuapp.com/api/paymentletter/id?userId=' + this.userId)
          .then(response =>{
            var aux = response.data;
            for (var i in aux)
            {
              var emisisonDateAux = aux[i].emisisonDate.substr(0, 10)
              var expirationDateAux = aux[i].expirationDate.substr(0, 10)
              aux[i].emisisonDate = emisisonDateAux
              aux[i].expirationDate = expirationDateAux
            }
            this.paymentLetters = aux;
          })
          .catch(e=> {
            this.errors.push(e);
          })
    },

    editItem (item) {
      this.editedIndex = this.paymentLetters.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.paymentLetters.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.paymentLetters.splice(this.editedIndex, 1)
      this.deletePaymentLetter()
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    postPaymentLetter() {
      const data = {
        "currency": this.editedItem.currency,
        "amount": parseInt(this.editedItem.amount),
        "emisisonDate": new Date(this.editedItem.emisisonDate).toISOString(),
        "expirationDate": new Date(this.editedItem.expirationDate).toISOString(),
      };
      axios.post('https://finanzas-api.herokuapp.com/api/paymentletter/1?userId=' + this.userId, data).catch(e=>{
        this.error.push(e);
      });
    },
    updatePaymentLetter() {
      const data = {
        "currency": this.editedItem.currency,
        "amount": parseInt(this.editedItem.amount),
        "emisisonDate": new Date(this.editedItem.emisisonDate).toISOString(),
        "expirationDate": new Date(this.editedItem.expirationDate).toISOString(),
      };
      axios.put('https://finanzas-api.herokuapp.com/api/paymentletter/' + this.editedItem.paymentLetterId, data).catch(e=>{
        this.error.push(e);
      });
    },
    deletePaymentLetter() {
      axios.delete('https://finanzas-api.herokuapp.com/api/paymentletter/' + this.editedItem.paymentLetterId).catch(e=>{
        this.error.push(e);
      });
    },
    save () {
      if (this.editedIndex > -1) {
        this.updatePaymentLetter()
        Object.assign(this.paymentLetters[this.editedIndex], this.editedItem)
      } else {
        this.postPaymentLetter()
        this.paymentLetters.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>