import { createApp } from '../lib/mini-vue.esm.js'
import App from './App.js'

const app = createApp(App)
  .mount(document.querySelector('#root'))