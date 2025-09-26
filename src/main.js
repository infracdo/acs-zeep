import 'normalize.css/normalize.css';
import 'vuetify/dist/vuetify.min.css';

import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';

import i18n from './locale'; // Internationalization
import vuetify from './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';

import "leaflet/dist/leaflet.css";

import { attachAuthInterceptor } from './http-common';
import './router/permission';


import { LMap, LMarker, LPopup, LTileLayer } from "vue2-leaflet";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-popup", LPopup);

function scheduleTokenRefresh(keycloak) {
  const tokenParsed = keycloak.tokenParsed || {};
  if (!tokenParsed?.exp) {
    console.warn("Missing exp in token, cannot schedule refresh.");
    return;
  }

  const expiresAt = tokenParsed.exp * 1000;
  const now = Date.now();
  const refreshTime = Math.max(expiresAt - now - 30000, 10000);

  console.log(`Scheduling token refresh in ${Math.round(refreshTime / 1000)}s`);

  setTimeout(() => {
    keycloak
      .updateToken(30)
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token refreshed");
        }
        scheduleTokenRefresh(keycloak);
      })
      .catch(() => {
        console.warn("Token refresh failed. Attempting logout in 5 seconds.");
        setTimeout(() => keycloak.logout({
          redirectUri: window.location.origin,
        }), 5000);
      });
  }, refreshTime);
}

Vue.use(VueAxios, axios);

Vue.use(VueKeyCloak, {
  init: {
    onLoad: 'login-required', "checkLoginIframe" : false
  },
  config: {
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    url: process.env.VUE_APP_KEYCLOAK_URL,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  },
  onReady: (keycloak) => {
    attachAuthInterceptor(keycloak);
    scheduleTokenRefresh(keycloak);
    // console.log(keycloak.token);

    new Vue({
      router,
      store,
      i18n,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  },
});
