import { createApp } from 'vue'
import { createUnhead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const head = createUnhead()

app.use(head)
app.use(router)

app.mount('#app')
