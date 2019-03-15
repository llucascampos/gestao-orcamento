<template>
    <v-app>
        <v-toolbar flat>
        <v-toolbar-title>Materiais</v-toolbar-title>
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
                    v-model="novoMaterial.nome" 
                    label="Nome"
                    :rules="campoObrigatorio"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                    v-model="novoMaterial.preco" 
                    label="Preço"
                    :rules="campoObrigatorio"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="save" :disabled = !validad>Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>

      <v-data-table
        :headers="headers"
        :items="materiais"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.nome}}</td>
          <td class="text-xs-left">{{ props.item.preco}}</td>
          <td class="text-xs-right">
            <v-icon  class="mr-2" @click="editItem(props.item)"> edit </v-icon>
            <v-icon  class="ml-2" @click="deleteItem(props.item)"> delete </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-app>
</template>

<script>
export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Nome',       value: 'nome',       sortable: false },
        { text: 'Valor Uni',  value: 'Preço',      sortable: false },
        { text: 'Ações',      value: 'açoes',      sortable: false, align: 'right' },
      ],
      novoMaterial: {
        nome: '',
        preco: null,
      },
      editedIndex: -1,
      
      //rules
      validad: false,
      campoObrigatorio: [
        v => !!v || "Campo Obrigatorio."
      ]

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Produto' : 'Editar Produto'
      },
      materiais(){
        return this.$store.state.materiais
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
        this.editedIndex = this.produtos.indexOf(item)
        this.novoMaterial = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.materiais.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.materiais.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.novoMaterial = {}
        this.$refs.form.resetValidation()
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.materiais[this.editedIndex], this.editedItem)
        } else {
          this.$store.commit('addMaterial', this.novoMaterial)
        }
        this.close()
      }
    }

}

</script>

<style>

</style>
