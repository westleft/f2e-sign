import { createApp } from 'vue';
import App from '@/App.vue';
import "@/style/_reset.scss";
import router from "@/router/index"
import store from '@/store/';

createApp(App).use(store).use(router).mount('#app');