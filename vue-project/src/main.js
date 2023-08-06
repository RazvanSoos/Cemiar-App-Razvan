import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import vue3GoogleLogin from 'vue3-google-login';
import axios from 'axios';

const CLIENT_ID = '778240840487-25pto03q3ie75s3sjqelbt70sm0818oi.apps.googleusercontent.com';

const API_BASE_URL = 'http://localhost:3000/api';

const app = createApp(App);

app.config.globalProperties.$http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

app.use(vue3GoogleLogin, { clientId: CLIENT_ID }).mount('#app');
