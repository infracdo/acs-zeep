<template>
  <v-container
    fluid
    class="pa-5"
  >
    <!-- Overall Summary -->
    <v-card class="pa-4 mb-6">
      <v-card-title class="pa-0">
        Overall Summary
      </v-card-title>
      <v-row>
        <v-col
          v-for="(card, index) in cardsOverallSummary"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            :style="{backgroundColor: card.color}"
          >
            <v-card-title
              class="font-weight-bold text-h3 text-right"
              style="text-align: right; display: block; color: white;"
            >
              {{ card.value }}
            </v-card-title>
            <v-card-text
              class="text-right text-subtitle-2"
              style="color: white;"
            >
              {{ card.title }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- List of APs / Data per AP -->
    <v-card class="pa-4 mb-6">
      <v-row
        align="center"
        class="ma-0"
      >
        <v-col class="pa-0">
          <v-card-title class="pa-0 mb-3">
            List of Access Points
          </v-card-title>
        </v-col>
        <v-col
          class="pa-0"
          cols="auto"
        >
          <!-- NOTE: uncomment if the select options data in the future doesn't need formatting -->
          <!-- <v-select
            v-model="selectedAccessPoint"
            flat
            solo-inverted
            hide-details
            :items="accessPointOptions"
            item-text="text"
            item-value="value"
            style="width: 20em;"
            label="Select Access Point (AP)"
            @change="onAPChange"
          /> -->
          <v-select
            v-model="selectedAccessPoint"
            flat
            solo-inverted
            hide-details
            :items="formattedAccessPointOptions"
            item-text="text"
            item-value="value"
            style="width: 20em;"
            label="Select Access Point (AP)"
            @change="onAPChange"
          />
        </v-col>
      </v-row>
      <v-col class="pa-0">
        <v-row>
          <v-col
            v-for="(card, index) in cardsAP"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              :style="{backgroundColor: card.color}"
            >
              <v-card-title
                class="font-weight-bold text-h3 text-right"
                style="text-align: right; display: block; color: white;"
              >
                {{ card.value }}
              </v-card-title>
              <v-card-text
                class="text-right text-subtitle-2"
                style="color: white;"
              >
                {{ card.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Table for list of currently connected users per access point -->
        <v-card class="mt-3">
          <v-card-title>
            List of Currently Connected Users
            <!-- <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            /> -->
          </v-card-title>
          <div style="overflow-x: auto;">
            <v-data-table
              dense
              :headers="headers"
              :items="connectedUsers"
              item-key="macAddress"
              :loading="loading"
              loading-text="Loading... Please wait"
              style="min-width: 1000px"
              class="header-nowrap"
            >
              <template v-slot:item.bandwidthMB="{item}">
                {{ item.bandwidthMB }}
              </template>

              <template v-slot:item.timestamp="{item}">
                {{ formatTimestamp(item.timestamp) }}
              </template>

              <template v-slot:item.calling_station_id="{item}">
                {{ formatMacAddress(item.calling_station_id) }}
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import ApiService from '../../api.service';

export default {
  name: 'MonitoringDashboard',
  data() {
    return {
      cardsOverallSummary: [
        {
          title: 'Currently Connected Users',
          value: 0,
          color: '#66BB6A',
          key: 'connectedUsers',
        },
        {
          title: 'Currently Connected Access Points',
          value: 0,
          color: '#4DB6AC',
          key: 'connectedAPs',
        },
        {
          title: 'Total User Connections Today',
          value: 0,
          color: '#FFB74D',
          key: 'totalUserConnectionsToday',
        },
        {
          title: 'Total Bandwidth Consumption Today',
          value: 0,
          color: '#FDD835',
          key: 'totalBandwidthConsumptionToday',
        },
        {
          title: 'Average Connection Time',
          value: 0,
          color: '#1E88E5',
          key: 'averageConnectionTime',
        },
        {
          title: 'Average Bandwidth Per Connection',
          value: 0,
          color: '#E57373',
          key: 'averageBandwidthPerConnection',
        },
      ],
      cardsAP: [
        {
          title: 'Currently Connected Users',
          value: 0,
          color: '#66BB6A',
          key: 'connectedUsersPerAP',
        },
      ],
      // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
      // headers: [
      //   {
      //     text: 'Account Number',
      //     align: 'start',
      //     sortable: true,
      //     value: 'accountNumber',
      //   },
      //   {
      //     text: 'Package',
      //     align: 'start',
      //     sortable: true,
      //     value: 'package',
      //   },
      //   {
      //     text: 'MAC Address',
      //     align: 'start',
      //     sortable: true,
      //     value: 'macAddress',
      //   },
      //   {
      //     text: 'Device',
      //     align: 'start',
      //     sortable: false,
      //     value: 'device',
      //   },
      //   {
      //     text: 'IP Address',
      //     align: 'start',
      //     sortable: true,
      //     value: 'ipAddress',
      //   },
      //   {
      //     text: 'SSID',
      //     align: 'start',
      //     sortable: true,
      //     value: 'ssid',
      //   },
      //   {
      //     text: 'Bandwidth Consumption',
      //     align: 'start',
      //     sortable: true,
      //     value: 'bandwidthMB',
      //   },
      //   {
      //     text: 'Time Connected',
      //     align: 'start',
      //     sortable: true,
      //     value: 'lastActive',
      //   },
      // ],
      headers: [
        {
          text: 'Username',
          align: 'start',
          sortable: true,
          value: 'username',
        },
        {
          text: 'Account Input Octets',
          align: 'start',
          sortable: true,
          value: 'acctinputoctets',
        },
        {
          text: 'Account Output Octets',
          align: 'start',
          sortable: true,
          value: 'acctoutputoctets',
        },
        {
          text: 'NAS Port',
          align: 'start',
          sortable: false,
          value: 'nasport',
        },
        {
          text: 'Calling Station ID',
          align: 'start',
          sortable: true,
          value: 'calling_station_id',
        },
        {
          text: 'Timestamp',
          align: 'start',
          sortable: true,
          value: 'timestamp',
        },
      ],
      connectedUsersPerAP: 0,
      connectedUsersPerAPMap: {},
      connectedUsers: [],
      allConnectedUsersData: [],
      currentConnectedAPs: [],
      accessPointOptions: [],
      selectedAccessPoint: null,
      loading: false,
    };
  },
  computed: {
    formattedAccessPointOptions() {
      return this.accessPointOptions.map((item) => {
        const [macRaw, name] = item.value.split(':');
        const formattedMac = this.formatMacAddress(macRaw);
        return {
          text: `${formattedMac} - ${name}`,
          value: item.value,
        };
      });
    },
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;

        // Fetch all data in parallel
        const [
          countConnectedUsersResponse,
          countConnectedAPsResponse,
          totalUserConnectionsTodayResponse,
          totalBandwidthConsumptionTodayResponse,
          avgConnectionTimeResponse,
          avgBandwidthConnectionResponse,
          countConnectedUsersPerApResponse,
          connectedUsersPerApResponse,
          accessPointsResponse,
        ] = await Promise.all([
          ApiService.getCountCurrentlyConnectedUsers(),
          ApiService.getCountCurrentlyConnectedAPs(),
          ApiService.getTotalUserConnectionsToday(),
          ApiService.getTotalBandwidthConsumptionToday(),
          ApiService.getAverageConnectionTime(),
          ApiService.getAverageBandwidthPerConnection(),
          ApiService.getCountCurrentlyConnectedUsersPerAP(),
          ApiService.getCurrentlyConnectedUsersPerAP(),
          ApiService.getAccessPoints(),
        ]);

        // Update overall summary cards
        this.cardsOverallSummary[0].value = countConnectedUsersResponse.data.currentlyConnectedUsers;
        this.cardsOverallSummary[1].value = countConnectedAPsResponse.data.currentlyConnectedAPs;
        this.cardsOverallSummary[2].value = totalUserConnectionsTodayResponse.data.totalUserConnectionsToday;
        this.cardsOverallSummary[3].value = totalBandwidthConsumptionTodayResponse.data.totalBandwidthConsumptionToday;
        this.cardsOverallSummary[4].value = avgConnectionTimeResponse.data.averageConnectionTime;
        this.cardsOverallSummary[5].value = avgBandwidthConnectionResponse.data.averageBandwidthPerConnection;

        // Convert array to map
        this.connectedUsersPerAPMap = {};
        countConnectedUsersPerApResponse.data.forEach((item) => {
          // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
          // this.connectedUsersPerAPMap[item.apMacAddress] = item.userCount;
          this.connectedUsersPerAPMap[item.calledStationId] = item.currentlyConnectedUsers;
        });

        // Store all connected users data
        this.allConnectedUsersData = connectedUsersPerApResponse.data;

        // Setup options for the select field
        // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
        // this.currentConnectedAPs = currentConnectedAPs.data.data;
        // this.accessPointOptions = this.currentConnectedAPs.map((ap) => ({
        //   text: ap,
        //   value: ap,
        // }));
        this.accessPointOptions = accessPointsResponse.data.accessPoints.map((ap) => ({
          text: ap,
          value: ap,
        }));

        // Pre-select the first access point
        // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
        // if (this.accessPointOptions.length > 0) {
        //   this.selectedAccessPoint = this.accessPointOptions[0].value;
        //   this.connectedUsersPerAP = this.connectedUsersPerAPMap[this.selectedAccessPoint] || 0;
        //   this.cardsAP[0].value = this.connectedUsersPerAP;
        //   this.loadUsersForSelectedAP();
        // }
        if (this.accessPointOptions.length > 0) {
          this.selectedAccessPoint = this.accessPointOptions[0].value;
          this.loadUsersForSelectedAP();
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        this.loading = false;
      }
    },
    onAPChange(selectedAccessPoint) {
      this.selectedAccessPoint = selectedAccessPoint;
      this.loadUsersForSelectedAP();
    },
    loadUsersForSelectedAP() {
      if (!this.selectedAccessPoint) return;
      // Update the count of connected users
      this.connectedUsersPerAP = this.connectedUsersPerAPMap[this.selectedAccessPoint] || 0;
      this.cardsAP[0].value = this.connectedUsersPerAP;
      // Find the AP data in allConnectedUsersData
      const apData = this.allConnectedUsersData.find(
        // (ap) => ap.apMacAddress === this.selectedAccessPoint, // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
        (ap) => ap.called_station_id === this.selectedAccessPoint,
      );
      // Update the connected users table data
      // this.connectedUsers = apData ? apData.connectedUsers : []; // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
      this.connectedUsers = apData?.currently_connected_users?.map((user) => ({
        ...user,
        timestamp: Number(user.timestamp) || null,
      })) || [];
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return 'N/A';
      const date = new Date(timestamp * 1000);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    formatMacAddress(mac) {
      if (!mac) return '';
      const cleaned = mac.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
      return cleaned.match(/.{1,2}/g)?.join(':') || mac;
    },
  },
};
</script>

<style scoped>
.header-nowrap >>> th {
  white-space: nowrap;
  vertical-align: middle !important;
}

.header-nowrap >>> td {
  white-space: nowrap;
}

.header-nowrap >>> th {
  padding: 0 16px !important;
}
</style>
