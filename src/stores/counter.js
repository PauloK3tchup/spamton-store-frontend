import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const prodId = ref(0)
  const prodSelec = ref(0)
  const pesquisa = ref('')
  const selec = ref(0)
  function selecionar(prodId) {
    localStorage.setItem('prodSelec', String(prodId))
    prodSelec.value = localStorage.getItem('prodSelec')
    selec.value = 2
  }
  function pesquisar(pesquisa) {
    this.pesquisa = pesquisa
  }

  return { prodId, prodSelec, selecionar, pesquisa, pesquisar, selec }
})
