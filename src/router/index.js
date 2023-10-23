import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import TelaProdutoComp from '../components/TelaProdutoComp.vue'
import TabelaView from '../views/TabelaView.vue'
import CadastrarProdutosView from '../views/CadastrarProdutosView.vue'
import CarrinhoView from '../components/CarrinhoComp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/produto',
      name: 'produto',
      component: TelaProdutoComp
    },
    {
      path: '/tabela',
      name: 'tabela',
      component: TabelaView
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: CadastrarProdutosView
    },
    {
      path: '/registro',
      name: 'registro',
      component: AboutView
    },
    {
      path: '/conta',
      name: 'conta',
      component: AboutView
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: CarrinhoView
    }
  ]
})

export default router
