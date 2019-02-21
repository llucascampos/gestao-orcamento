<template>
    <div>
      <v-toolbar flat>
        <v-toolbar-title>Orçamentos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small fab dark color="indigo"  to="/novoOrçamento" >
            <v-icon dark >add</v-icon>
          </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="orcamentos"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.cliente}}</td>
          <td class="text-xs-left">{{ props.item.servico}}</td>
          <td class="text-xs-left">{{ props.item.status}}</td>
          <td class="text-xs-left">{{ props.item.valor}}</td>
          <td>
            <v-icon  class="mr-2 material-icons" @click="visualizar(props.item)"> visibility </v-icon>
            <v-icon  class="ml-2" @click="deleteItem(props.item)"> delete </v-icon>
          </td>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
      dialog: false,
      headers: [
        { text: 'Cliente',         value: 'Cliente',    sortable: false },
        { text: 'Serviço',         value: 'Servico',    sortable: false },
        { text: 'Status',          value: 'Status',     sortable: false },
        { text: 'Valor',           value: 'dataEntrega',sortable: false },
        { text: 'Ações',           value: 'Acoes',      sortable: false },
      ],

    orcamentos: [
        {
            cliente: 'Lucas',
            servico: 'Guarda-Roupa',
            status: 'aprovado',
            valor: 1.500
        },
    ],
      
    }),


    created () {
      this.initialize()
    },

    methods: {
      initialize () {
               
      },

      save(){
        
      }

    }
}
</script>

<style>

</style>
