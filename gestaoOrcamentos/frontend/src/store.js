import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioAutenticado: '',
    orcamentos: [],
    clientes: [
      {
        nome: 'Lucas',
        email: 'lucascampos07@hotmai.com',
        telefone: 951789926
      },
      {
        nome: 'Paholla',
        email: 'pahollad@hotmai.com',
        telefone: 552156
      },
    ],
    materiais:[
      {
        nome: 'Dobradiça', 
        preco: 5
      },
      {
        nome: 'Chapa MDF', 
        preco: 150
      }
    ]
    
  },

  getters:{
    nomeCliente: state =>{
      return state.clientes.map(cliente => cliente.nome)
    },
    nomeMaterial: state =>{
      return state.materiais.map(material => material.nome)
    }
  },

  mutations: {
    addCliente(state, payload){
      this.state.clientes.push(payload)
    },
    addMaterial(state, payload){
      this.state.materiais.push(payload)
    },
    addOrcamento(state, payload){
      this.state.orcamentos.push(payload)
    }

  },
  actions: {

  }
})
