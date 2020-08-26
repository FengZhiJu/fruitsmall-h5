import Vue from 'vue'
import App from './App'
import store from "store/index.js"
import ourLoading from '@/components/our-loading/our-loading.vue'
import Toast from "@/components/toast/Toast.vue"

Vue.config.productionTip = false

Vue.component('ourLoading', ourLoading)
Vue.component('Toast', Toast)
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
