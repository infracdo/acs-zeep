import axios from 'axios';

// Create a custom axios instance
const http = axios.create({
  baseURL: process.env.VUE_APP_ZEEP_MONITORING_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Keycloak token to all requests
export function attachAuthInterceptor(keycloak) {
  http.interceptors.request.use(
    async (config) => {
      if (keycloak.isTokenExpired()) {
        await keycloak.updateToken(30);
      }

      config.headers.Authorization = `Bearer ${keycloak.token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default http;
