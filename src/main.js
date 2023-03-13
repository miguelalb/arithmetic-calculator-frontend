import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'

import './assets/main.css'
// Primevue
import "primevue/resources/themes/lara-light-indigo/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Button from "primevue/button"
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.component('InputNumber', InputNumber)

app.mount('#app')
