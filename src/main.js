import { createApp } from 'vue'
import { createUnhead, headSymbol } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const head = createUnhead()

app.provide(headSymbol, head)
app.use(router)

app.mount('#app')
