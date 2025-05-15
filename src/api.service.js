import http from './http-common';

/* eslint-disable class-methods-use-this */
class ApiService {
  getCountConnectedUsers() {
    return http.get('/api/count-current-connected-users');
  }

  getCountCurrentConnectedAPs() {
    return http.get('/api/count-current-connected-aps');
  }

  getTotalUserConnectionsToday() {
    return http.get('/api/total-user-connections-today');
  }

  getTotalBandwidthConsumptionToday() {
    return http.get('/api/total-bandwidth-consumption-today');
  }

  getAvgConnectionTime() {
    return http.get('/api/avg-connection-time');
  }

  getAverageBandwidthPerConnection() {
    return http.get('/api/average-bandwidth-per-connection');
  }

  getCountCurrentlyConnectedUsersPerAP() {
    return http.get('/api/count-current-connected-users-per-ap');
  }

  getCurrentConnectedUsersPerAP() {
    return http.get('/api/current-connected-users-per-ap');
  }

  getCurrentConnectedAPs() {
    return http.get('/api/current-connected-aps');
  }
}
/* eslint-enable class-methods-use-this */

export default new ApiService();
