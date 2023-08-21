import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

<<<<<<< HEAD
axios.defaults.baseURL = 'http://191.52.55.131:19002/'
=======
axios.defaults.baseURL = 'http://191.52.55.23:19003/'
>>>>>>> refs/remotes/origin/master
//axios.defaults.baseURL = 'http://localhost:8000/'

const app = createApp(App)

app.use(createPinia())
app.use(router, axios)

app.mount('#app')
