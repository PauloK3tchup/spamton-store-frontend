import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const prodId = ref(0)
  const prodSelec = ref(0)
  const pesquisa = ref('')
  function selecionar(prodId) {
    prodSelec.value = prodId
  }
  function pesquisar(pesquisa) {
    this.pesquisa = pesquisa
  }

  return { prodId, prodSelec, selecionar, pesquisa, pesquisar }
})
