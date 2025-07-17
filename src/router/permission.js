import NProgress from 'nprogress'; // progress bar
import router, { asyncRoutes } from './index';
import store from '../store';
import authRouter from './modules/auth';
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

/**
 * Generate white list
 */
const whiteList = (['/landing', '/land']
  .concat(Array.from(authRouter, (route) => route.path))
  .concat(Array.from(authRouter, (route) => route.alias)))
  .filter((route) => route); // remove undefined element
console.log('[router.whiteList]', whiteList);

/**
 * Check user has permission for this routes.
 * 'admin' permission passed directly.
 * @param {Array} userRoles
 * @param {Array} routeRoles
 */
// eslint-disable-next-line no-unused-vars
function hasPermission(userRoles, routeRoles) {
  if (userRoles.includes('ROLE_ADMIN_ACS_ZEEP')) return true;
  if (!routeRoles) return true;
  return userRoles.some((role) => routeRoles.includes(role));
}

function getAllUserRoles(keycloak) {
  const realmRolesRaw = keycloak.tokenParsed?.realm_access?.roles || [];
  const clientId = process.env.VUE_APP_KEYCLOAK_CLIENT_ID;
  const clientRolesRaw = keycloak.tokenParsed?.resource_access?.[clientId]?.roles || [];
  const groupsRaw = keycloak.tokenParsed?.groups || [];

  // Normalize role names with prefix if needed
  const prefixIfMissing = (item, prefix) =>
    item.startsWith(prefix) ? item : `${prefix}${item}`;

  const realmRoles = realmRolesRaw.map(role => prefixIfMissing(role, 'ROLE_'));
  const clientRoles = clientRolesRaw.map(role => prefixIfMissing(role, 'ROLE_'));

  // Normalize groups
  const groups = groupsRaw.map(group => {
    // Keycloak group paths often look like "/group-name", so remove slash
    const groupName = group.replace(/^\//, '');
    return prefixIfMissing(groupName, 'GROUP_');
  });

  // Combine and deduplicate
  return [...new Set([...realmRoles, ...clientRoles, ...groups])];
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (router.app.$keycloak.authenticated) {
    const profile = await router.app.$keycloak.loadUserProfile();
    const userRoles = getAllUserRoles(router.app.$keycloak);
    console.log('[User Roles]', userRoles);
    console.log(profile);

    store.commit('SET_USER_INFO', {
      user: profile.username,
      name: `${profile.firstName} ${profile.lastName}`,
    });
    store.commit('SET_ROUTES', asyncRoutes);
    const requiredRoles = to.meta.roles;
    console.log(`[router.beforeEach] Checking permissions for ${to.path} with roles:`, requiredRoles);

    if (hasPermission(userRoles, requiredRoles)) {
      console.log(`[router.beforeEach] User has permission for ${to.path}`);
      next();
    } else {
      console.log(`[router.beforeEach] User lacks permission for ${to.path}`);
      next(false);
    }

  } else {
    const loginUrl = router.app.$keycloak.createLoginUrl({
      redirectUri: to.path,
    });
    window.location.replace(loginUrl);
  }
  NProgress.done();
});

// router.beforeEach(async (to, from, next) => {
//   NProgress.start();
//   let logMsg = '[router.beforeEach]';
//   try {
//     // determine if there has token
//     if (store.getters.token) {
//       logMsg += '\t[token]';
//       if (whiteList.includes(to.path)) {
//         logMsg += '\t[whiteList]';
//         next({ path: '/' });
//       } else {
//         logMsg += '\t[!whiteList]';
//         if (!store.getters.roles || store.getters.roles.length === 0) {
//           logMsg += `\t[roles=${store.getters.roles}]`;
//           // Determine whether the current user has pulled the user_info information
//           await store.dispatch('GetUserInfo');
//           if (!store.getters.user || !store.getters.user.roles) {
//             logMsg += '\t[LogOut]\t[next /]';
//             await store.dispatch('LogOut');
//             next({ path: '/' });
//           }

//           // note: roles must be a object array! such as:
//           // [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
//           await store.dispatch('GenerateRoutes', store.getters.user);
//           if (!store.getters.permissionRoutes) {
//             logMsg += '\t[Redirect]\t[next /]';
//             next({ path: '/' });
//           }

//           // Hack method to ensure that addRoutes is complete,
//           // set the replace: true so the navigation will not leave a history record
//           next({ ...to, replace: true });
//         } else {
//           logMsg += `\t[roles=${store.getters.roles}]`;
//           // No need to dynamically change permissions can be directly next()
//           // delete the following permission judgment ↓
//           if (hasPermission(store.getters.roles, to.meta.roles)) {
//             logMsg += `\t[Permission=${to.meta.roles}]\t[next]`;
//             next();
//           } else {
//             logMsg += `\t[!Permission=${to.meta.roles}]\t[next /401]`;
//             next({ path: '/401', replace: true, query: { noGoBack: true } });
//           }
//         }
//       }
//     } else {
//       logMsg += '\t[!token]';
//       if (whiteList.includes(to.path)) {
//         logMsg += '\t[whiteList]';
//         next();
//       } else {
//         logMsg += '\t[!whiteList]';
//         next(`/signin?redirect=${to.path}`);
//       }
//     }
//   } catch (err) {
//     console.warn(`[router.beforeEach]\t${to.path}: ${err}`);
//   }
//   console.log(logMsg, to.path);
//   NProgress.done();
// });

router.afterEach(async () => {
  NProgress.done();
});
