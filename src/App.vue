<script>
import { RouterView } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faPencil,
  faPhone,
  faShoppingCart,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import UsuarioApi from './api/userinfo'
import HeaderGestor from './components/HeaderGestor.vue'
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
const usuarioApi = new UsuarioApi()

export default {
  components: {
    FooterComp,
    HeaderGestor,
    HeaderComp,
    RouterView
  },
  data() {
    return {
      staff: false,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    async verificarStaff() {
      try {
        const response = await usuarioApi.buscarUsuario(this.token)
        console.log(response)
        const info = await usuarioApi.buscarUsuarioPorId(response.user_id)
        console.log(info)
        if (info.is_staff) {
          this.staff = true
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    if (this.token) {
      await this.verificarStaff()
    }
  }
}
library.add(
  faShoppingCart,
  faSearch,
  faBars,
  faTrashCan,
  faPencil,
  faGithub,
  faEnvelope,
  faPhone,
  faInstagram
)
</script>
<template>
  <body>
    <header>
      <HeaderGestor v-if="staff" />
      <HeaderComp v-else />
    </header>
    <div class="page-container">
      <div class="content-wrap">
        <RouterView :key="$route.fullPath" v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </div>
    <FooterComp />
  </body>
</template>

<style scoped>
.page-container {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem;
}

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
