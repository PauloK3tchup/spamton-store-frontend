import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const prodId = ref(0)
  const prodSelec = localStorage.getItem('prodSelec')
  const pesquisa = ref('')
  const selec = ref(0)
  function selecionar(prodId) {
    localStorage.setItem('prodSelec', String(prodId))
    this.prodSelec = localStorage.getItem('prodSelec')
  }
  function pesquisar(pesquisa) {
    this.pesquisa = pesquisa
  }
  function selecionar2(prodId) {
    localStorage.setItem('prodSelec', String(prodId))
    this.prodSelec = localStorage.getItem('prodSelec')
    selec.value = 2
  }

  return { prodId, prodSelec, selecionar, pesquisa, pesquisar, selec, selecionar2 }
})
