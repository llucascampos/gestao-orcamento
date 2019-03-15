<template>
    <div>

      <!-- Snakebar -->
      <v-snackbar
        v-model="snackbar"
        :color="color"
        top
        right
        :timeout="timeout"
      >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>


      <v-toolbar flat>
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small fab dark color="indigo" @click="dialog=true">
            <v-icon dark >add</v-icon>
          </v-btn>
      </v-toolbar>
      <v-dialog v-model="dialog" max-width="500px" max-height="800px">
          <v-form v-model="validad" ref="form">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                    v-model="novoCliente.nome"
                    label="Nome"
                    :rules="campoNome"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                    v-model="novoCliente.email" 
                    label="E-mail"
                    :rules=" campoEmail"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                    v-model="novoCliente.telefone" 
                    label="telefone"
                    type="number"
                    :rules="campoTel"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="save" :disabled=!validad >Salvar</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-dialog>

      <v-data-table
        :headers="headers"
        :items="clientes"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.nome}}</td>
          <td class="text-xs-left">{{ props.item.email}}</td>
          <td class="text-xs-left">{{ props.item.telefone}}</td>
          <td>
            <v-icon  class="mr-2" @click="editItem(props.item)"> edit </v-icon>
            <v-icon  class="ml-2" @click="deleteItem(props.item)"> delete </v-icon>
          </td>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  data: () => ({
      dialog: false,
      headers: [
        { text: 'Nome',       value: 'nome',       sortable: false },
        { text: 'E-mail',     value: 'email',      sortable: false },
        { text: 'Telefone',   value: 'telefone',   sortable: false },
        { text: 'Ações',      value: 'açoes',      sortable: false },
      ],
      novoCliente: {
        nome: '',
        email: '',
        telefone: '',
      },
      editedIndex: -1,

      //Rules
      validad: false,
      campoNome: [
        v => !!v || 'Esse campo é obrigatorio.'
      ],

      campoEmail: [
        v => !! v || 'Esse campo é obrigatorio.',
        v => /.+@.+/.test(v) || 'Insira um e-mail valido.'
      ],
      campoTel: [ v => !!v || 'Esse campos é obrigatorio', v => (v && v.length ==9) || 'Insirá um numero valido'],

       snackbar: false,
        color: 'green',
        mode: '',
        timeout: 4000,
        text: 'Cadastrado com sucesso'
      

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Cliente' : 'Editar Cliente'
      },
      clientes(){
        return this.$store.state.clientes
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
               
      },

      editItem (item) {
        this.editedIndex = this.clientes.indexOf(item)
        this.novoCliente = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.clientes.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.clientes.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.novoCliente = {}
        this.$refs.form.resetValidation()
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.clientes[this.editedIndex], this.editedItem)
        } else {
          this.$refs.form.validate()
          this.$store.commit('addCliente',this.novoCliente)
          this.snackbar = true
        }
        this.close()
      }
    }

}
</script>

<style>

</style>
