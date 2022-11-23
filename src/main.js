import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'intl-tel-input/build/css/intlTelInput.css'

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
//App.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//App.use(IconsPlugin)

createApp(App).use(store).use(router).mount('#app')
