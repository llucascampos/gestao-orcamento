<template>
    <v-app>
        <v-card class="pa-5">
            <h1>Orçamento</h1>
            <v-layout wrap class="my-5" justify-space-between>
                <v-flex xs5 sm5 d-flex>
                    <v-autocomplete
                    :items="nomeCliente"
                    label="Cliente"
                    v-model="novoOrcamento.nome"
                    ></v-autocomplete>
                </v-flex>

                <v-flex sm5>
                    <v-text-field
                        label="Serviço"
                        v-model="novoOrcamento.servico"
                    ></v-text-field>
                </v-flex>
            </v-layout>

                <v-toolbar flat>
                    <v-toolbar-title>Materiais</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn small fab dark color="indigo" @click="dialog=true">
                        <v-icon dark >add</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-dialog v-model="dialog" max-width="500px" max-height="800px">
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout>
                                <v-autocomplete
                                :items="materiais"
                                item-text="nome"
                                label="Materiais"
                                v-model="novoMaterial"
                                return-object
                                ></v-autocomplete>
                            </v-layout>
                            <v-layout>
                                <v-text-field
                                label="Quantidade."
                                type="number"
                                v-model="novoMaterial.quantidade"
                                ></v-text-field>
                            </v-layout>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="close()" flat >Cancelar</v-btn>
                            <v-btn color="blue darken-1" @click="save()" flat >Salvar</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>

                <v-data-table
                    :headers="headers"
                    :items="novoOrcamento.listaMateriais"
                    class="elevation-1"
                    hide-actions
                >
                    <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.nome}}</td>
                    <td class="text-xs-left">{{ props.item.quantidade}}</td>
                    <td class="text-xs-left">{{ "R$ "+props.item.preco}}</td>
                    <td class="text-xs-right">
                        <v-icon @click="editItem(props.item)"  class="mr-2">edit </v-icon>
                        <v-icon @click="deleteItem(props.item)" class="ml-2"> delete </v-icon>
                    </td>
                    </template>
                </v-data-table> 
                <v-btn  @click="salvarOrcamento()">Salvar</v-btn>
                {{novoOrcamento}} <br><br> {{novoMaterial}}
        </v-card>
             
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            
            dialog: false,
            headers: [
                { text: 'Nome',         value: 'nome',        sortable: false },
                { text: 'Quantidades',  value: 'quantidade',  sortable: false },
                { text: 'Valor',        value: 'valor',       sortable: false },
                { text: 'Ações',        value: 'açoes',   align: 'right',    sortable: false },
            ],

            novoOrcamento: {
                nome: '',
                servico: '',
                listaMateriais: []
            },
            novoMaterial:{},
            orcamentos:[],
            editedIndex: -1,
            
      
        }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Produto' : 'Editar Produto'
      },
      clientes(){
        return this.cliente =  this.$store.state.clientes
      },
      materiais(){
        return this.$store.state.materiais
      },

      ...mapGetters([
          'nomeCliente',
          
      ])
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
        this.editedIndex = this.novoOrcamento.listaMateriais.indexOf(item)
        this.novoMaterial = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.novoOrcamento.listaMateriais.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.novoOrcamento.listaMateriais.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.novoMaterial = {}
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.novoOrcamento.listaMateriais[this.editedIndex], this.editedItem)
        } else {
            this.novoOrcamento.listaMateriais.push(this.novoMaterial)
        }
        this.close()
      },

      salvarOrcamento(){
          this.Orcamentos.push(this.novoOrcamento)
      }
    },

      
    }



</script>

<style>

</style>
