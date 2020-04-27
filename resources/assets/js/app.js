
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import { Form, HasError, AlertError } from 'vform'
import Swal from 'sweetalert2'
window.Swal = Swal
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast
window.Fire = new Vue();

window.Form = Form
Vue.use(VueRouter)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
let routes = [
    // { path: '/', component: require('./components/Home.vue') },
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/developer', component: require('./components/Developer.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '/profile', component: require('./components/Profile.vue') }
  ]
  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })

  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })
  Vue.filter('myDate',function(created){
    return moment(created).format('MMMM Do YYYY, dddd');
  })
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component(
  'passport-clients',
  require('../../js/components/passport/Clients.vue')
);

Vue.component(
  'passport-authorized-clients',
  require('../../js/components/passport/AuthorizedClients.vue')
);

Vue.component(
  'passport-personal-access-tokens',
  require('../../js/components/passport/PersonalAccessTokens.vue')
);

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('home-component', require('./components/Home.vue'));

const app = new Vue({
    el: '#app',
    router
});
