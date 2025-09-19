import http from './http-common';

/* eslint-disable class-methods-use-this */
class ApiService {
  // FOR CAPTIVE PORTAL (WIFIDOG) DATA RETRIEVAL APIs
  // getCountCurrentlyConnectedUsers() {
  //   return http.get('/api/count-current-connected-users');
  // }

  // getCountCurrentlyConnectedAPs() {
  //   return http.get('/api/count-current-connected-aps');
  // }

  // getTotalUserConnectionsToday() {
  //   return http.get('/api/total-user-connections-today');
  // }

  // getTotalBandwidthConsumptionToday() {
  //   return http.get('/api/total-bandwidth-consumption-today');
  // }

  // getAverageConnectionTime() {
  //   return http.get('/api/avg-connection-time');
  // }

  // getAverageBandwidthPerConnection() {
  //   return http.get('/api/average-bandwidth-per-connection');
  // }

  // getCountCurrentlyConnectedUsersPerAP() {
  //   return http.get('/api/count-current-connected-users-per-ap');
  // }

  // getCurrentlyConnectedUsersPerAP() {
  //   return http.get('/api/current-connected-users-per-ap');
  // }

  // getAccessPoints() {
  //   return http.get('/api/current-connected-aps');
  // }

  // FOR RADIUS DATA RETRIEVAL APIs
  getCountOnlineUsers() {
    return http.get('/api/radius/count-online-users');
  }

  getAllCurrentOnlineUserDetails() {
    return http.get('/api/radius/users/online');
  }
  
  getAllSessionsByUsernameForCurrentOnlineUsers(username) {
    return http.get(`/api/radius/users/online/${username}/sessions`);
  }
  
  getCountForAllCurrentOnlineUsers() {
    return http.get('/api/radius/users/online/count');
  }
  
  getCountActiveUsers() {
    return http.get('/api/radius/count-active-users');
  }
  
  getAllActiveUsersForThePast7Days() {
    return http.get('/api/radius/users/active');
  }
  
  getCountForAllActiveUsersForThePast7Days() {
    return http.get('/api/radius/users/active/count');
  }
  
  getAllSessionsByUsernameForThePast7Days(username) {
    return http.get(`/api/radius/users/active/${username}/sessions`);
  }
  
  getAllRegisteredUsersWithSessions() {
    return http.get('/api/radius/users/registered');
  }
  
  getCountForAllRegisteredUsersWithSessions() {
    return http.get('/api/radius/users/registered/count');
  }
  
  getAllSessionsByUsername(username) {
    return http.get(`/api/radius/users/registered/${username}/sessions`);
  }

  getCountForAllCurrentOnlineApForTheLast30Mins() {
    return http.get('/api/radius/ap/online/count');
  }

  getAllCurrentOnlineApForTheLast30Mins() {
    return http.get('/api/radius/ap/online');
  }

  getCurrentOnlineApForTheLast30MinsByApId(apId) {
    return http.get(`/api/radius/ap/online/${apId}/users`);
  }
  
  getSessionForCurrentOnlineUsersByUsernameAndApId(apId, username) {
    return http.get(`/api/radius/ap/online/${apId}/${username}/session`);
  }
  
  getCountForAllActiveApForTheLast7Days() {
    return http.get('/api/radius/ap/active/count');
  }
  
  getAllActiveApForTheLast7Days(params) {
    return http.get('/api/radius/ap/active', { params });
  }

  getAllActiveApForTheLast7DaysByApId(apId, params) {
    return http.get(`/api/radius/ap/active/${apId}/users`, { params });
  }
  
  getCountForAllInActiveApForMoreThan7Days() {
    return http.get('/api/radius/ap/in-active/count');
  }

  getAllInactiveApForMoreThan7Days(params) {
    return http.get('/api/radius/ap/in-active', { params });
  }

  getAllInActiveApForTheLast7DaysByApId(apId, params) {
    return http.get(`/api/radius/ap/in-active/${apId}/users`, { params });
  }
  
  getCountInactiveUsers() {
    return http.get('/api/radius/count-inactive-users');
  }
  
  getCountRegisteredUsers() {
    return http.get('/api/radius/count-registered-users');
  }

  getCountOnlineAPs() {
    return http.get('/api/radius/count-online-aps');
  }

  getCountActiveAPs() {
    return http.get('/api/radius/count-active-aps');
  }

  getCountInactiveAPs() {
    return http.get('/api/radius/count-inactive-aps');
  }

  getTotalUserConnectionsToday() {
    return http.get('/api/radius/total-active-aps');
  }

  getTotalSessionTimeToday() {
    return http.get('/api/radius/total-session-time-today');
  }

  getTotalUserSessionsToday() {
    return http.get('/api/radius/total-user-sessions-today');
  }

  getTotalBandwidthConsumptionToday() {
    return http.get('/api/radius/total-bandwidth-consumption-today');
  }

  getAverageConnectionTimeForMonth() {
    return http.get('/api/radius/average-connection-time-for-month');
  }

  getAverageBandwidthForMonth() {
    return http.get('/api/radius/average-bandwidth-for-month');
  }

  getCountCurrentlyConnectedUsersPerAP() {
    return http.get('/api/radius/count-currently-connected-users-per-ap');
  }

  getCurrentlyConnectedUsersPerAP() {
    return http.get('/api/radius/currently-connected-users-per-ap');
  }
  
  getAPDeviceName(mac) {
    return http.get('/api/radius/ap-device-name', {
      params: {
        mac: mac
      }
    });
  }

  getAccessPoints() {
    return http.get('/api/radius/access-points');
  }
  
  getOnlineRegisteredAPs() {
    return http.get('/api/radius/access-points-online');
  }
  
  getOfflineRegisteredAPs() {
    return http.get('/api/radius/access-points-offline');
  }

  getAllRegisteredAPs() {
    return http.get('/api/radius/access-points-registered');
  }

  getAllRogueAPs() {
    return http.get('/api/radius/access-points-rogue');
  }

  getRegisteredDevicesByApId(apId) {
    return http.get(`/api/radius/access-points-offline-registered/${apId}`);
  }
  
}
/* eslint-enable class-methods-use-this */

export default new ApiService();
