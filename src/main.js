import 'normalize.css/normalize.css';
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import axios from 'axios';
import VueAxios from 'vue-axios';

import vuetify from './plugins/vuetify';
import i18n from './locale'; // Internationalization

import App from './App.vue';
import router from './router';
import store from './store';

import './router/permission';

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
        } else {
          console.log("Token still valid");
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

function setupAxiosInterceptor(keycloak) {
  axios.interceptors.request.use(
    async (config) => {
      try {
        if (keycloak.isTokenExpired?.()) {
          await keycloak.updateToken(30);
        }
        if (keycloak.token) {
          config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
      } catch (err) {
        console.warn("Token refresh failed. Logging out.");
        keycloak.logout({ redirectUri: window.location.origin });
        return Promise.reject(err);
      }
    },
    (error) => Promise.reject(error)
  );
}

Vue.use(VueAxios, axios);

Vue.use(VueKeyCloak, {
  init: {
    onLoad: 'login-required', "checkLoginIframe" : false
  },
  config: {
    realm: 'workconnect-test',
    url: 'https://wcdssi.apolloglobal.net:8443/auth',
    clientId: 'acs-zeep-test',
  },
  onReady: (keycloak) => {
    setupAxiosInterceptor(keycloak);
    scheduleTokenRefresh(keycloak);

    new Vue({
      router,
      store,
      i18n,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  },
});
