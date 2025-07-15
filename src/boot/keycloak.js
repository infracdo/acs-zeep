// import { boot, route } from "quasar/wrappers";
// import Keycloak from "keycloak-js";
// import axios from "axios";

// const store = auth();

// const keycloak = new Keycloak({
//   url: process.env.VITE_KEYCLOAK_URL,
//   realm: process.env.VITE_KEYCLOAK_REALM,
//   clientId: process.env.VITE_KEYCLOAK_CLIENT_ID,
// });

// console.log("Keycloak URL: ", process.env.VITE_KEYCLOAK_URL);
// console.log("Keycloak Realm: ", process.env.VITE_KEYCLOAK_REALM);
// console.log("Keycloak Client ID: ", process.env.VITE_KEYCLOAK_CLIENT_ID);

// function scheduleTokenRefresh() {
//   const tokenParsed = keycloak.tokenParsed || {};
//   if (!tokenParsed?.exp) {
//     console.warn("Missing exp in token, cannot schedule refresh.");
//     return;
//   }

//   const expiresAt = tokenParsed.exp * 1000;
//   const now = Date.now();
//   const refreshTime = Math.max(expiresAt - now - 30000, 10000);

//   console.log(`Scheduling token refresh in ${Math.round(refreshTime / 1000)}s`);

//   setTimeout(() => {
//     keycloak
//       .updateToken(30)
//       .then((refreshed) => {
//         if (refreshed) {
//           console.log("Token refreshed");
//         } else {
//           console.log("Token still valid");
//         }
//         scheduleTokenRefresh();
//       })
//       .catch(() => {
//         console.warn("Token refresh failed. Attempting logout in 5 seconds.");
//         setTimeout(() => keycloak.logout({
//           redirectUri: window.location.origin,
//         }), 5000);
//       });
//   }, refreshTime);
// }

// export function attachAuthInterceptor(axios) {
//   axios.interceptors.request.use(
//     async (config) => {
//       try {
//         if (keycloak.isTokenExpired && keycloak.isTokenExpired()) {
//           await keycloak.updateToken(30);
//         }
//         if (keycloak.token) {
//           config.headers.Authorization = `Bearer ${keycloak.token}`;
//         }
//         return config;
//       } catch (err) {
//         console.warn("Token refresh failed. Logging out.");
//         keycloak.logout({
//           redirectUri: window.location.origin,
//         });
//         return Promise.reject(err);
//       }
//     },
//     (error) => Promise.reject(error)
//   );
// }

// export default boot( ({ app, router }) => {
//   let isKeycloakInitialized = false;

//   const getUsername = () => {
//     return keycloak.tokenParsed?.preferred_username || "Unknown User";
//   };

//   keycloak
//     .init({
//       onLoad: "login-required",
//       checkLoginIframe: false,
//       enableLogging: true,
//     })
//     .then(async (authenticated) => {
//       if (authenticated) {
//         // set up bearer token for api requests
//         app.config.globalProperties.$keycloak = keycloak;
//         axios.defaults.headers.common["Authorization"] = `Bearer ${keycloak.token}`;
//         console.log(
//           "Auth Header: ",
//           axios.defaults.headers.common["Authorization"]
//         );

//         // initialize profile and roles
//         const profile = await keycloak.loadUserProfile();
//         const tokenParsed = keycloak.tokenParsed || {};
//         const realmAccess = tokenParsed.realm_access || {};
//         const realmRoles = Array.isArray(realmAccess.roles) ? realmAccess.roles : [];
//         const groupRoles = Array.isArray(tokenParsed.groups) ? tokenParsed.groups : [];
//         let resourceRoles = [];

//         // logout user if no roles are found for acs zeep client
//         if (keycloak.tokenParsed?.resource_access?.[process.env.VITE_KEYCLOAK_CLIENT_ID]) {
//           resourceRoles = keycloak.tokenParsed?.resource_access[
//             process.env.VITE_KEYCLOAK_CLIENT_ID
//           ].roles;
//         } else {
//           keycloak.logout();
//         }

//         app.config.globalProperties.$userRoles = realmRoles;
//         app.config.globalProperties.$resourceRoles = resourceRoles;
//         app.config.globalProperties.$userGroups = groupRoles;
//         console.log(`Bearer ${keycloak.token}, User: ${getUsername()}, Realm Roles: ${realmRoles}, Resource Roles: ${resourceRoles}, Groups: ${groupRoles}`);

//         store.setKeycloak(keycloak);
//         store.setUserProfile(profile);
//         isKeycloakInitialized = true;

//         for (const route of routes) {
//           if (route.children) {
//             for (const child of route.children) {
//               if (
//                 child.meta?.roles &&
//                 child.meta.roles.some((role) => resourceRoles.includes(role))
//               ) {
//                 router.push(child.path);
//                 return; 
//               }
//             }
//           }

//           if (
//             route.meta?.roles &&
//             route.meta.roles.some((role) => resourceRoles.includes(role))
//           ) {
//             router.push(route.path);
//             return;
//           }
//         }
//       } else {
//         console.warn("User not authenticated");
//         keycloak.logout();
//       }
//     })
//     .catch((error) => {
//       console.error("Keycloak initialization failed:", error);
//     });

//   scheduleTokenRefresh();

//   router.beforeEach((to, from, next) => {
//     if (!isKeycloakInitialized) {
//       return next(false);
//     }

//     if (to.meta.requiresAuth !== false && !keycloak.authenticated) {
//       keycloak.login();
//       return;
//     }

//     const userRoles = app.config.globalProperties.$userRoles;
//     const resourceRoles = keycloak.tokenParsed?.resource_access[
//       KEYCLOAK_CLIENTID
//     ].roles;

//     if (
//       (to.meta.requiredRoles)?.some(
//         (role) => !resourceRoles.includes(role)
//       )
//     ) {
//       console.warn("Access denied: Insufficient role");
//       next("/unauthorized");
//     }

//     console.log("User Roles: ", app.config.globalProperties.$userRoles);
//     console.log("Resource Roles: ", app.config.globalProperties.$resourceRoles);

//   });
// });

// export { keycloak };
