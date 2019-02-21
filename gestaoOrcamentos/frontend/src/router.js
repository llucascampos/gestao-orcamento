import Vue from 'vue'
import Router from 'vue-router'
import Clientes from './components/Clientes'
import Home from './components/Home'
import Orcamentos from './components/Orcamentos'
import CriarOrcamento from './components/CriarOrcamento'
import Materiais from './components/Materiais'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes
    },
    {
      path: '/orçamentos',
      name: 'orçamentos',
      component: Orcamentos
    },
    {
      path: '/novoOrçamento',
      name: 'novoOrçamento',
      component: CriarOrcamento
    },
    {
      path: '/materiais',
      name: 'materiais',
      component: Materiais
    },
  ]
})
