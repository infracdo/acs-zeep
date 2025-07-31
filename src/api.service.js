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
  getCountCurrentlyConnectedUsers() {
    return http.get('/api/radius/count-currently-connected-users');
  }

  getCountCurrentlyConnectedAPs() {
    return http.get('/api/radius/count-currently-connected-aps');
  }

  getTotalUserConnectionsToday() {
    return http.get('/api/radius/total-user-connections-today');
  }

  getTotalBandwidthConsumptionToday() {
    return http.get('/api/radius/total-bandwidth-consumption-today');
  }

  getAverageConnectionTime() {
    return http.get('/api/radius/average-connection-time');
  }

  getAverageBandwidthPerConnection() {
    return http.get('/api/radius/average-bandwidth-per-connection');
  }

  getCountCurrentlyConnectedUsersPerAP() {
    return http.get('/api/radius/count-currently-connected-users-per-ap');
  }

  getCurrentlyConnectedUsersPerAP() {
    return http.get('/api/radius/currently-connected-users-per-ap');
  }

  getAccessPoints() {
    return http.get('/api/radius/access-points');
  }
  
  getAccessPointsInfo() {
    return http.get('/api/radius/access-points-info');
  }
}
/* eslint-enable class-methods-use-this */

export default new ApiService();
