import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
// import Vconsole from 'vconsole';//手机调试控制台
// const vConsole =new Vconsole();
// Vue.use(vConsole);

import {
	BootstrapVue,
	IconsPlugin
} from 'bootstrap-vue'
import '@/custom.scss'
import jsencrypt from '@/assets/js/jsencrypt.min.js'
Vue.prototype.JSEncrypt = jsencrypt;


import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
Viewer.setDefaults({
	Options: {
		'inline': true,
		'button': true,
		'navbar': true,
		'title': true,
		'toolbar': true,
		'tooltip': true,
		'movable': true,
		'zoomable': true,
		'rotatable': true,
		'scalable': true,
		'transition': true,
		'fullscreen': true,
		'keyboard': true,
		'url': 'data-source'
	}
})
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import '@/assets/icons/home/iconfont.css';
// import '@/assets/css/overrall.css';

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

// import 'vue-video-player/src/custom-theme.css'
Vue.use(VueVideoPlayer,
	/* {
  options: global default options,
  events: global videojs events
} */
)
import uploader from 'vue-simple-uploader'
Vue.use(uploader)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
