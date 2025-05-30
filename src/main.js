import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import index from '@/mock/index'
import { Button, Icon } from 'vant'

createApp(App).use(router).use(index).use(Button).use(Icon).mount('#app')
