<template>
  <v-main class="grey lighten-2">
    <v-container class="grey lighten-4">
      <v-row>
        <v-card-title>Datos de la Letra</v-card-title>
      </v-row>
      <v-row>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Moneda</v-card-title>
            <v-text-field
            readonly
            v-model="paymentLetter.currency">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Monto</v-card-title>
            <v-text-field
            readonly
            v-model="paymentLetter.amount">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Fecha de descuento</v-card-title>
            <v-text-field
            readonly
            v-model="paymentLetter.emisisonDate">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title class="font-weight-bold">Fecha de vencimiento</v-card-title>
            <v-text-field
                readonly
                v-model="paymentLetter.expirationDate">
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-card-title>Datos de la Operación</v-card-title>
      </v-row>
      <v-row>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Tipo de Año</v-card-title>
            <v-overflow-btn
                v-model="editedItem.year"
                :items="years">
            </v-overflow-btn>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Tipo de Tasa</v-card-title>
            <v-overflow-btn
                v-model="editedItem.rateType"
                :items="rates"
                @change="tipoTasa">
            </v-overflow-btn>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Plazo de Tasa</v-card-title>
            <v-overflow-btn
                v-model="editedItem.rateTime"
                :items="rateTimes">
            </v-overflow-btn>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Capitalización</v-card-title>
            <v-overflow-btn
                v-model="editedItem.capitalizationTime"
                :items="rateTimes"
                :disabled="!isNominal">
            </v-overflow-btn>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Periodo tasa efectiva</v-card-title>
            <v-overflow-btn
                v-model="editedItem.efectiveRateTime"
                :items="rateTimes"
                :disabled="!isNominal">
            </v-overflow-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Tasa</v-card-title>
            <v-text-field
                v-model="editedItem.rate">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Retención</v-card-title>
            <v-text-field
                v-model="editedItem.retention">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Gastos Iniciales</v-card-title>
            <v-text-field
                v-model="editedItem.initialExpense">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Gastos Finales</v-card-title>
            <v-text-field
                v-model="editedItem.finalExpense">
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn
                color="blue lighten-2"
                @click="calculate">
              Realizar Operación
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-card-title>Resultados de la Operación</v-card-title>
      </v-row>
      <v-row>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Tasa efectiva del periodo</v-card-title>
            <v-text-field
                readonly
                v-model="this.percTEP">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Tasa descontada</v-card-title>
            <v-text-field
                readonly
                v-model="this.percDiscounted">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Descuento</v-card-title>
            <v-text-field
            readonly
            v-model="discount">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Valor Neto</v-card-title>
            <v-text-field
            readonly
            v-model="netValue">
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Valor a recibir</v-card-title>
            <v-text-field
                readonly
                v-model="flow">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>Valor a entregar</v-card-title>
            <v-text-field
                readonly
                v-model="outputValue">
            </v-text-field>
          </v-card>
        </v-col>
        <v-col cols="2" md="2" sm="2">
          <v-card>
            <v-card-title>TCEA</v-card-title>
            <v-text-field
                readonly
                v-model="this.percTCEA">
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn
                color="grey">
              <router-link :to="{ name: 'paymentLetters', params: { userId: this.userID } }">
                <span class="mr-2">Volver</span>
              </router-link>
            </v-btn>
          </v-card-actions>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-btn
                color="blue lighten-2"
                @click="save">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
name: "Operation",
  data: () => ({
    userID: 0,
    paymentLetterId: 0,
    paymentLetter: [],
    operationId: 0,
    operation: [],
    operationExist: false,
    TEP: 0,
    percTEP: '',
    discount: 0,
    discounted: 0,
    netValue: 0,
    outputValue: 0,
    flow: 0,
    percDiscounted: '',
    tcea: 0,
    percTCEA: '',
    days: 1,
    years: [
        360,
        365
    ],
    isNominal: false,
    rates: [
        'Efectiva',
        'Nominal'
    ],
    rateTimeInt: 360,
    capTimeInt: 30,
    efectRateTimeInt: 360,
    rateTimes: [
        'Diario',
        'Quincenal',
        'Mensual',
        'Bimestral',
        'Trimestral',
        'Cuatrimestral',
        'Semestral',
        'Anual'
    ],
    editedItem: {
      year: 360,
      rateType: 'Efectiva',
      rateTime: 'Anual',
      capitalizationTime: 'Mensual',
      efectiveRateTime: 'Anual',
      rate: 0,
      retention: 0,
      initialExpense: 0,
      finalExpense: 0
    }
  }),
  created() {
  this.initialize()
  },
  methods: {
  async initialize() {
    this.userID = this.$route.params.userId
    this.paymentLetterId = this.$route.params.paymentLetterId
    this.paymentLetter = []
    this.paymentLetter = await axios.get('https://finanzas-api.herokuapp.com/api/paymentletter')
        .then(response =>{
          var aux = response.data;
          for (var i in aux)
          {
            if(aux[i].paymentLetterId == this.paymentLetterId)
            {
              const auxPaymentLetter = aux[i]
              auxPaymentLetter.amount = parseFloat(aux[i].amount).toFixed(2)
              auxPaymentLetter.emisisonDate = aux[i].emisisonDate.substr(0, 10);
              auxPaymentLetter.expirationDate = aux[i].expirationDate.substr(0, 10);
              return auxPaymentLetter;
            }
          }
        })
        .catch(e=> {
          this.errors.push(e);
        })
    this.userId = this.paymentLetter
    this.operation = await axios.get('https://finanzas-api.herokuapp.com/api/operation/id?paymentLetterId=' + this.paymentLetterId)
        .then(response =>{
          var aux = response.data;
          return aux[0]
        })
        .catch(e=> {
          this.errors.push(e)
        })
    if (this.operation.operationId > 0)
    {
      this.operationId = this.operation.operationId
      this.operationExist = true
      this.editedItem.year = this.operation.year
      this.editedItem.rateType = this.operation.rateType
      this.editedItem.rateTime = this.operation.rareTime
      this.editedItem.capitalizationTime = this.operation.capitalizationTime
      this.editedItem.efectiveRateTime = this.operation.efectiveRateTime
      this.editedItem.rate = this.operation.rate
      this.editedItem.retention = this.operation.retention
      this.editedItem.initialExpense = this.operation.initialExpense
      this.editedItem.finalExpense = this.operation.finalExpense
    }
    this.calculateDays()
    this.calculateTEP()
    this.calculateDiscount()
    this.calculateNetValue()
    this.calculateInputValue()
    this.calculateOutputValue()
    this.calculateTCEA()
  },
  calculate() {
    this.convertDate()
    this.calculateDays()
    this.calculateTEP()
    this.calculateDiscount()
    this.calculateNetValue()
    this.calculateInputValue()
    this.calculateOutputValue()
    this.calculateTCEA()
  } ,
  tipoTasa() {
    if (this.editedItem.rateType == 'Efectiva')
    {
      this.isNominal = false
    }
    if (this.editedItem.rateType == 'Nominal')
    {
      this.isNominal = true
    }
  } ,
  convertDate() {
    var auxString = [this.editedItem.rateTime, this.editedItem.capitalizationTime, this.editedItem.efectiveRateTime];
    var auxInt = [this.rateTimeInt, this.capTimeInt, this.efectRateTimeInt];
    for (let i = 0; i < 3; i++)
    {
      if (auxString[i] == 'Diario')
      {
        auxInt[i] = 1;
      }
      if (auxString[i] == 'Quincenal')
      {
        auxInt[i] = 15;
      }
      if (auxString[i] == 'Mensual')
      {
        auxInt[i] = 30;
      }
      if (auxString[i] == 'Bimestral')
      {
        auxInt[i] = 60;
      }
      if (auxString[i] == 'Trimestral')
      {
        auxInt[i] = 90;
      }
      if (auxString[i] == 'Cuatrimestral')
      {
        auxInt[i] = 120;
      }
      if (auxString[i] == 'Semestral')
      {
        auxInt[i] = 180;
      }
      if (auxString[i] == 'Anual')
      {
        auxInt[i] = 360;
      }
      this.rateTimeInt = auxInt[0]
      this.capTimeInt = auxInt[1]
      this.efectRateTimeInt = auxInt[2]
    }
  },
  calculateDays() {
    this.days = Date(this.paymentLetter.expirationDate) - Date(this.paymentLetter.emisisonDate)
    var exprDate = new Date(this.paymentLetter.expirationDate)
    var emisDate = new Date(this.paymentLetter.emisisonDate)
    var auxDays = exprDate.getTime() - emisDate.getTime()
    this.days = auxDays / (1000*60*60*24)
  },
  calculateTEP() {
    var auxRate = 0
    var auxTime = 0
    if (this.editedItem.rateType == 'Efectiva')
    {
      auxRate = this.editedItem.rate;
      auxTime = this.rateTimeInt
    }
    if (this.editedItem.rateType == 'Nominal')
    {
      var m = parseFloat(this.rateTimeInt/this.capTimeInt);
      var n = parseFloat(this.efectRateTimeInt/this.capTimeInt);
      auxRate = parseFloat(100*(Math.pow(1 + parseFloat(this.editedItem.rate/(m*100)), (n)) - 1)).toFixed(7);
      auxTime = this.efectRateTimeInt
    }
    this.TEP = parseFloat(100*(Math.pow((1 + parseFloat(auxRate)/100), (this.days/auxTime))-1)).toFixed(7);
    this.percTEP = this.TEP + '%'
  },
  calculateDiscount() {
    this.discounted = parseFloat(100*(this.TEP/100)/(1+ (this.TEP/100))).toFixed(7)
    this.percDiscounted = this.discounted + '%'
    this.discount = parseFloat((this.discounted/100) * parseFloat(this.paymentLetter.amount)).toFixed(2);
  },
  calculateNetValue() {
    this.netValue = parseFloat(parseFloat(this.paymentLetter.amount) - parseFloat(this.discount)).toFixed(2);
  },
  calculateInputValue() {
    this.flow = parseFloat(parseFloat(this.netValue) - parseFloat(this.editedItem.initialExpense) - parseFloat(this.editedItem.retention)).toFixed(2);
  },
  calculateOutputValue() {
    this.outputValue = parseFloat(parseFloat(this.paymentLetter.amount) + parseFloat(this.editedItem.finalExpense) - parseFloat(this.editedItem.retention)).toFixed(2);
  },
  calculateTCEA() {
    this.tcea = parseFloat(100 * (Math.pow(((parseFloat(this.outputValue))/parseFloat(this.flow)), (this.editedItem.year/this.days)) - 1)).toFixed(7)
    this.percTCEA = this.tcea + '%'
  },
  postOperation() {
    const data = {
      "year": parseFloat(this.editedItem.year),
      "rateType": this.editedItem.rateType,
      "rareTime": this.editedItem.rateTime,
      "capitalizationTime": this.editedItem.capitalizationTime,
      "efectiveRateTime": this.editedItem.efectiveRateTime,
      "rate": parseFloat(this.editedItem.rate),
      "retention": parseFloat(this.editedItem.retention),
      "initialExpense": parseFloat(this.editedItem.initialExpense),
      "finalExpense": parseFloat(this.editedItem.finalExpense),
    };
    axios.post('https://finanzas-api.herokuapp.com/api/operation/1?paymentLetterId=' + this.paymentLetterId, data).catch(e=>{
      this.error.push(e);
    });
  } ,
  updateOperation() {
    const data = {
      "year": parseFloat(this.editedItem.year),
      "rateType": this.editedItem.rateType,
      "rareTime": this.editedItem.rateTime,
      "capitalizationTime": this.editedItem.capitalizationTime,
      "efectiveRateTime": this.editedItem.efectiveRateTime,
      "rate": parseFloat(this.editedItem.rate),
      "retention": parseFloat(this.editedItem.retention),
      "initialExpense": parseFloat(this.editedItem.initialExpense),
      "finalExpense": parseFloat(this.editedItem.finalExpense),
    };
    axios.put('https://finanzas-api.herokuapp.com/api/operation/' + this.editedItem.paymentLetterId, data).catch(e=>{
      this.error.push(e);
    });
  },
  save() {
    if (this.operationExist)
    {
      this.updateOperation()
    }
    else
    {
      this.postOperation()
    }
  }
  }
}
</script>

<style scoped>

</style>