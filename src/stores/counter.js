import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const prodId = ref(0)
  const prodSelec = ref(0)
  function selecionar() {
    prodSelec.value = prodId.value
  }

  return { prodId, prodSelec, selecionar }
})
