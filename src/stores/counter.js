import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const prodId = ref('')
  const prodSelec = ref('')
  function selecionar(prodId) {
    prodSelec.value = prodId
  }

  return { prodId, prodSelec, selecionar }
})
