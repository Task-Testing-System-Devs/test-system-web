import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

import router from './router' // Импортируйте ваш router

createApp(App)
    .use(router) // Используйте ваш router
    .mount('#app')
