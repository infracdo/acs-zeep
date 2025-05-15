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
              {{ formatCardValue(card) }}
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
            List of Access Points / Data Per Access Point
          </v-card-title>
        </v-col>
        <v-col
          class="pa-0"
          cols="auto"
        >
          <v-select
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
                {{ item.bandwidthMB }} MB
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-card>

    <!-- List of Connected Users -->
    <!-- <v-card>
      <v-card-title>
        List of Connected Users
      </v-card-title>
      <v-data-table
        dense
        :headers="headersConnectedUsers"
        :items="listOfConnectedUsers"
        item-key="macAddress"
        :loading="loading"
        loading-text="Loading... Please wait"
      />
    </v-card> -->
  </v-container>
</template>

<script>
import ApiService from '../../api.service';

export default {
  data() {
    return {
      cardsOverallSummary: [
        {
          title: 'Current Number of Connected Users',
          value: 0,
          color: '#66BB6A',
          key: 'connectedUsers',
        },
        {
          title: 'Current Number of Connected APs',
          value: 0,
          color: '#4DB6AC',
          key: 'connectedAPs',
        },
        {
          title: 'Total User Connections for Today',
          value: 0,
          color: '#FFB74D',
          key: 'totalUserConnectionsToday',
        },
        {
          title: 'Total Bandwidth Consumption for Today',
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
        // {
        //   title: 'Daily Average Connected Users',
        //   value: 0,
        //   color: '#4DB6AC',
        // },
        // {
        //   title: 'Daily Average User Connection Time',
        //   value: 0,
        //   color: '#FFB74D',
        // },
        // {
        //   title: 'Daily Average Bandwidth Consumption',
        //   value: 0,
        //   color: '#FDD835',
        // },
        // {
        //   title: 'Daily Average Bandwidth Consumption Per User',
        //   value: 0,
        //   color: '#1E88E5',
        // },
      ],
      headers: [
        {
          text: 'Account Number',
          align: 'start',
          sortable: true,
          value: 'accountNumber',
        },
        {
          text: 'Package',
          align: 'start',
          sortable: true,
          value: 'package',
        },
        {
          text: 'MAC Address',
          align: 'start',
          sortable: true,
          value: 'macAddress',
        },
        {
          text: 'Device',
          align: 'start',
          sortable: false,
          value: 'device',
        },
        {
          text: 'IP Address',
          align: 'start',
          sortable: true,
          value: 'ipAddress',
        },
        {
          text: 'SSID',
          align: 'start',
          sortable: true,
          value: 'ssid',
        },
        {
          text: 'Bandwidth Consumption',
          align: 'start',
          sortable: true,
          value: 'bandwidthMB',
        },
        {
          text: 'Time Connected',
          align: 'start',
          sortable: true,
          value: 'lastActive',
        },
      ],
      headersConnectedUsers: [
        {
          text: 'Account Number',
          align: 'start',
          sortable: true,
          value: 'accountNumber',
        },
        {
          text: 'Package',
          align: 'start',
          sortable: true,
          value: 'package',
        },
        {
          text: 'MAC Address',
          align: 'start',
          sortable: true,
          value: 'macAddress',
        },
        {
          text: 'Device',
          align: 'start',
          sortable: true,
          value: 'device',
        },
        {
          text: 'IP Address',
          align: 'start',
          sortable: true,
          value: 'ipAddress',
        },
        {
          text: 'Connection Time',
          align: 'start',
          sortable: true,
          value: 'connectionTime',
        },
        {
          text: 'Bandwidth Consumption',
          align: 'start',
          sortable: true,
          value: 'bandwidthConsumption',
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
          currentConnectedAPs,
        ] = await Promise.all([
          ApiService.getCountConnectedUsers(),
          ApiService.getCountCurrentConnectedAPs(),
          ApiService.getTotalUserConnectionsToday(),
          ApiService.getTotalBandwidthConsumptionToday(),
          ApiService.getAvgConnectionTime(),
          ApiService.getAverageBandwidthPerConnection(),
          ApiService.getCountCurrentlyConnectedUsersPerAP(),
          ApiService.getCurrentConnectedUsersPerAP(),
          ApiService.getCurrentConnectedAPs(),
        ]);

        // Update overall summary cards
        this.cardsOverallSummary[0].value = countConnectedUsersResponse.data.connectedUsers;
        this.cardsOverallSummary[1].value = countConnectedAPsResponse.data.connectedAPs;
        this.cardsOverallSummary[2].value = totalUserConnectionsTodayResponse.data.totalUserConnectionsToday;
        this.cardsOverallSummary[3].value = totalBandwidthConsumptionTodayResponse.data.totalBandwidthConsumptionToday;
        this.cardsOverallSummary[4].value = avgConnectionTimeResponse.data.averageConnectionTime;
        this.cardsOverallSummary[5].value = avgBandwidthConnectionResponse.data.averageBandwidthPerConnection;

        // Convert array to map
        this.connectedUsersPerAPMap = {};
        countConnectedUsersPerApResponse.data.forEach((item) => {
          this.connectedUsersPerAPMap[item.apMacAddress] = item.userCount;
        });

        // Store all connected users data
        this.allConnectedUsersData = connectedUsersPerApResponse.data;

        // Setup options for the select field
        this.currentConnectedAPs = currentConnectedAPs.data.data;
        this.accessPointOptions = this.currentConnectedAPs.map((ap) => ({
          text: ap,
          value: ap,
        }));

        // Optionally pre-select the first access point
        if (this.accessPointOptions.length > 0) {
          this.selectedAccessPoint = this.accessPointOptions[0].value;
          this.connectedUsersPerAP = this.connectedUsersPerAPMap[this.selectedAccessPoint] || 0;
          this.cardsAP[0].value = this.connectedUsersPerAP;
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
      // Update the card value
      this.cardsAP[0].value = this.connectedUsersPerAP;
      // Find the AP data in allConnectedUsersData
      const apData = this.allConnectedUsersData.find(
        (ap) => ap.apMacAddress === this.selectedAccessPoint,
      );
      // Update the connected users table data
      this.connectedUsers = apData ? apData.connectedUsers : [];
    },
    formatCardValue(card) {
      if (card.title === 'Total Bandwidth Consumption for Today' || card.title === 'Average Bandwidth Per Connection') {
        return `${card.value} MB`;
      }
      if (card.title === 'Average Connection Time') {
        return `${card.value} MINS`;
      }
      return card.value;
    },
  },
};
</script>

<style scoped>
/* Prevent header text wrapping and center vertically */
.header-nowrap >>> th {
  white-space: nowrap;
  vertical-align: middle !important;
}

/* Ensure table cells don't wrap either */
.header-nowrap >>> td {
  white-space: nowrap;
}

/* Optional: Add some padding to headers for better appearance */
.header-nowrap >>> th {
  padding: 0 16px !important;
}
</style>