<script setup>
import { RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import HeaderComp from './components/HeaderGestor.vue'

library.add(faShoppingCart, faSearch, faBars)
</script>
<template>
  <body>
    <header>
      <HeaderComp />
    </header>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </body>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
  transform: scale(0.9);
}

.fade-enter-active {
  transform: scale(1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  margin: 0;
}
</style>
