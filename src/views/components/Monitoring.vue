<template>
  <v-container fluid class="pa-5">
    <!-- Overall Summary -->
    <v-card class="pa-4 mb-6">
      <v-card-title class="pa-0 pb-2 text-h5">
        Overall Summary
      </v-card-title>
      <v-card class="pa-4 elevation-0">
        <v-card-title class="pa-0 pb-2">
          User Insights
        </v-card-title>
        <v-row>
          <v-col
            v-for="(card, index) in cardsUsers"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}">
              <v-card-title
                class="font-weight-bold text-h3 text-right"
                style="text-align: right; display: block; color: white"
              >
                {{
                  card.value !== null && card.value !== undefined
                    ? card.value
                    : "-"
                }}
              </v-card-title>
              <v-card-text
                class="text-right text-subtitle-2"
                style="color: white"
              >
                {{ card.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4 elevation-0">
        <v-card-title class="pa-0 pb-2">
          AP Insights
        </v-card-title>
        <v-row>
          <v-col
            v-for="(card, index) in cardsAP"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}">
              <v-card-title
                class="font-weight-bold text-h3 text-right"
                style="text-align: right; display: block; color: white"
              >
                {{
                  card.value !== null && card.value !== undefined
                    ? card.value
                    : "-"
                }}
              </v-card-title>
              <v-card-text
                class="text-right text-subtitle-2"
                style="color: white"
              >
                {{ card.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4 elevation-0">
        <v-card-title class="pa-0 pb-2">
          Today’s Overview
        </v-card-title>
        <v-row>
          <v-col
            v-for="(card, index) in cardsTotal"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}">
              <v-card-title
                class="font-weight-bold text-h3 text-right"
                style="text-align: right; display: block; color: white"
              >
                {{
                  card.value !== null && card.value !== undefined
                    ? card.value
                    : "-"
                }}
              </v-card-title>
              <v-card-text
                class="text-right text-subtitle-2"
                style="color: white"
              >
                {{ card.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4 elevation-0">
        <v-card-title class="pa-0 pb-2">
          Cumulative Averages
        </v-card-title>
        <v-row>
          <v-col
            v-for="(card, index) in cardsAvg"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}">
              <v-card-title
                class="font-weight-bold text-h3 text-right"
                style="text-align: right; display: block; color: white"
              >
                {{
                  card.value !== null && card.value !== undefined
                    ? card.value
                    : "-"
                }}
              </v-card-title>
              <v-card-text
                class="text-right text-subtitle-2"
                style="color: white"
              >
                {{ card.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-card>

    <!-- List of APs / Data per AP -->
    <v-card class="pa-4 mb-6">
      <v-row align="center" class="ma-0">
        <v-col class="pa-0">
          <v-card-title class="pa-0 mb-3">
            List of Online Users per AP
          </v-card-title>
        </v-col>
        <v-col class="pa-0" cols="auto">
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
            style="width: 20em"
            label="Select Access Point (AP)"
            @change="onAPChange"
          />
        </v-col>
      </v-row>
      <v-col class="pa-0">
        <!-- Table for list of currently connected users per access point -->
        <v-card class="mt-3">
          <!-- <v-card-title>
            List of Currently Connected Users
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title> -->
          <div style="overflow-x: auto">
            <v-data-table
              dense
              :headers="userHeaders"
              :items="connectedUsers"
              item-key="macAddress"
              :loading="loading"
              loading-text="Loading... Please wait"
              style="min-width: 1000px"
              class="header-nowrap"
            >
              <!-- Format Date Created column -->
              <template v-slot:item.date_created="{item}">
                {{ formatTimestamp(item.date_created) }}
              </template>

              <!-- Format MAC address -->
              <template v-slot:item.mac_address="{item}">
                {{ formatMacAddress(item.mac_address) }}
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-card>

    <!-- List of Online APs -->
    <v-card class="pa-4 mb-6">
      <v-row align="center" class="ma-0">
        <v-col class="pa-0">
          <v-card-title class="pa-0 mb-3">
            List of Online APs
          </v-card-title>
        </v-col>
        <!-- <v-col
          class="pa-0"
          cols="auto"
        >
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
        </v-col> -->
      </v-row>
      <v-col class="pa-0">
        <v-row class="mb-2">
          <v-col
            v-for="(card, index) in cardsACS"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}">
              <v-card-title
                class="font-weight-bold text-h3 text-right"
                style="text-align: right; display: block; color: white"
              >
                {{
                  card.value !== null && card.value !== undefined
                    ? card.value
                    : "-"
                }}
              </v-card-title>
              <v-card-text
                class="text-right text-subtitle-2"
                style="color: white"
              >
                {{ card.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Table for list of currently connected users per access point -->
        <v-card class="mt-3">
          <!-- <v-card-title>
            List of Currently Connected Users
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title> -->
          <div style="overflow-x: auto">
            <v-data-table
              dense
              :headers="apHeaders"
              :items="allConnectedAPData"
              item-key="serial_number"
              :loading="loading"
              loading-text="Loading... Please wait"
              style="min-width: 1000px"
              class="header-nowrap"
            >
              <template v-slot:item.bandwidthMB="{item}">
                {{ item.bandwidthMB }}
              </template>

              <template v-slot:item.timestamp="{item}">
                {{ formatTimestamp(item.date_created) }}
              </template>

              <template v-slot:item.calling_station_id="{item}">
                {{ formatMacAddress(item.calling_station_id) }}
              </template>

              <template v-slot:item.acctinputoctets="{item}">
                {{ item.acctinputoctets ?? "-" }}
              </template>

              <template v-slot:item.acctoutputoctets="{item}">
                {{ item.acctoutputoctets ?? "-" }}
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import ApiService from "../../api.service";

export default {
  name: "MonitoringDashboard",
  data() {
    return {
      cardsUsers: [
        {
          title: "Current Online Users",
          value: "-",
          color: "#66BB6A",
          key: "connectedUsers",
        },
        {
          title: "Total Active Users",
          value: "-",
          color: "#336951",
          key: "totalUsers",
        },
      ],
      cardsAP: [
        {
          title: "Current Online APs",
          value: "-",
          color: "#75C6A6",
          key: "connectedAPs",
        },
        {
          title: "Total Active APs",
          value: "-",
          color: "#135959",
          key: "allConnectedAPData",
        },
      ],
      cardsTotal: [
        {
          title: "Total Bandwidth Usage",
          value: "-",
          color: "#8BAEEA",
          key: "totalBandwidthConsumptionToday",
        },
        {
          title: "Total Session Time",
          value: "-",
          color: "#E7A877",
          key: "totalBandwidthConsumptionToday",
        },
        {
          title: "Total User Sessions",
          value: "-",
          color: "#C7B28B",
          key: "totalUserSessionsToday",
        },
      ],
      cardsAvg: [
        {
          title: "Average Bandwidth Usage",
          value: "-",
          color: "#18346B",
          key: "averageBandwidthPerConnection",
        },
        {
          title: "Average Session Time",
          value: "-",
          color: "#6D2E1B",
          key: "averageConnectionTime",
        },
      ],
      cardsACS: [
        {
          title: "Online APs",
          value: "-",
          color: "#6B6580",
          key: "allConnectedAPData",
        },
        {
          title: "Total APs",
          value: "-",
          color: "#4C4F64",
          key: "allConnectedAPData",
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
      userHeaders: [
        {
          text: "Username",
          align: "start",
          sortable: true,
          value: "username",
        },
        {
          text: "Account Input Octets",
          align: "start",
          sortable: true,
          value: "acctinputoctets",
        },
        {
          text: "Account Output Octets",
          align: "start",
          sortable: true,
          value: "acctoutputoctets",
        },
        {
          text: "NAS Port",
          align: "start",
          sortable: false,
          value: "nasport",
        },
        {
          text: "Calling Station ID",
          align: "start",
          sortable: true,
          value: "calling_station_id",
        },
        {
          text: "Timestamp",
          align: "start",
          sortable: true,
          value: "timestamp",
        },
      ],
      apHeaders: [
        {
          text: "Serial Number",
          align: "start",
          sortable: true,
          value: "serial_number",
        },
        {
          text: "Device Name",
          align: "start",
          sortable: true,
          value: "device_name",
        },
        {
          text: "Mac Address",
          align: "start",
          sortable: true,
          value: "mac_address",
        },
        {
          text: "Status",
          align: "start",
          sortable: true,
          value: "status",
        },
        {
          text: "Group",
          align: "start",
          sortable: true,
          value: "parent",
        },
        {
          text: "Date Created",
          align: "start",
          sortable: true,
          value: "date_created",
        },
      ],
      connectedUsersPerAP: 0,
      connectedUsersPerAPMap: {},
      connectedUsers: [],
      allConnectedUsersData: [],
      allConnectedAPData: [],
      currentConnectedAPs: [],
      accessPointOptions: [],
      selectedAccessPoint: null,
      loading: false,
      fetchInterval: null,
    };
  },
  computed: {
    formattedAccessPointOptions() {
      const formatted = this.accessPointOptions.map((item) => {
        const [macRaw, name] = item.value.split(":");
        const formattedMac = this.formatMacAddress(macRaw);
        return {
          text: `${formattedMac} - ${name}`,
          value: item.value,
        };
      });

      if (this.accessPointOptions.length >= 2) {
        return [{ text: "ALL APs", value: "ALL_APS" }, ...formatted];
      } else {
        return formatted;
      }
    },
  },
  async created() {
    await this.fetchData();

    // Fetch data every 30 seconds
    this.fetchInterval = setInterval(() => {
      this.fetchData();
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.fetchInterval);
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;

        // Fetch all data in parallel
        const [ // user insights
          countConnectedUsersResponse, // current online users
          countTotalUsersResponse, // total active users
        ] = await Promise.all([
          ApiService.getCountCurrentlyConnectedUsers(),
          ApiService.getCountTotalUsers(),
        ]);

        const [ // ap insights
          countConnectedAPsResponse, // current online aps
          countActiveAPsResponse, // total active aps
        ] = await Promise.all([
          ApiService.getCountCurrentlyConnectedAPs(),
          ApiService.getCountTotalActiveAPs(),
        ]);

        const [ // today's overview
          totalBandwidthConsumptionTodayResponse, // total bandwidth usage
          totalSessionTimeTodayResponse, // total session time
          totalUserSessionsTodayResponse, // total user sessions
        ] = await Promise.all([
          ApiService.getTotalBandwidthConsumptionToday(),
          ApiService.getTotalSessionTimeToday(),
          ApiService.getTotalUserSessionsToday(),
        ]);
        
        const [ // cumulative averages
          avgBandwidthConnectionResponse, // average bandwidth usage
          avgConnectionTimeResponse, // average session time
        ] = await Promise.all([
          ApiService.getAverageBandwidthPerConnection(),
          ApiService.getAverageConnectionTime(),
        ]);

        const [ // acs aps
          accessPointsOnlineResponse, // online aps
          accessPointsAllResponse, // online aps
        ] = await Promise.all([
          ApiService.getAccessPointsOnline(),
          ApiService.getAccessPointsAll(),
        ]);

        const [ // tables
          countConnectedUsersPerApResponse,
          connectedUsersPerApResponse,
          accessPointsResponse,
        ] = await Promise.all([
          ApiService.getCountCurrentlyConnectedUsersPerAP(),
          ApiService.getCurrentlyConnectedUsersPerAP(),
          ApiService.getAccessPoints(),
        ]);

        // Update overall summary cards
        this.cardsUsers[0].value =
          countConnectedUsersResponse.data.currentlyConnectedUsers;
        this.cardsUsers[1].value = countTotalUsersResponse.data.totalUsers;

        this.cardsAP[0].value =
          countConnectedAPsResponse.data.currentlyConnectedAPs;
        this.cardsAP[1].value = countActiveAPsResponse.data.totalAPs;

        this.cardsTotal[0].value =
          totalBandwidthConsumptionTodayResponse.data.totalBandwidthConsumptionToday;
        this.cardsTotal[1].value =
          totalSessionTimeTodayResponse.data.totalSessionTimeToday;
        this.cardsTotal[2].value =
          totalUserSessionsTodayResponse.data.totalUserSessionsToday;

        this.cardsAvg[0].value =
          avgBandwidthConnectionResponse.data.averageBandwidthPerConnection;
        this.cardsAvg[1].value =
          avgConnectionTimeResponse.data.averageConnectionTime;

        // Convert array to map
        this.connectedUsersPerAPMap = {};
        countConnectedUsersPerApResponse.data.forEach((item) => {
          // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
          // this.connectedUsersPerAPMap[item.apMacAddress] = item.userCount;
          this.connectedUsersPerAPMap[item.calledStationId] =
            item.currentlyConnectedUsers;
        });

        // Store all connected users data
        this.allConnectedUsersData = connectedUsersPerApResponse.data;

        this.allConnectedAPData = accessPointsOnlineResponse.data;

        this.cardsACS[0].value = this.allConnectedAPData.length;
        this.cardsACS[1].value = accessPointsAllResponse.data.length;

        // Setup options for the select field
        // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
        // this.currentConnectedAPs = currentConnectedAPs.data.data;
        // this.accessPointOptions = this.currentConnectedAPs.map((ap) => ({
        //   text: ap,
        //   value: ap,
        // }));
        this.accessPointOptions = accessPointsResponse.data.accessPoints.map(
          (ap) => ({
            text: ap,
            value: ap,
          })
        );

        // Pre-select the first access point
        // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
        // if (this.accessPointOptions.length > 0) {
        //   this.selectedAccessPoint = this.accessPointOptions[0].value;
        //   this.connectedUsersPerAP = this.connectedUsersPerAPMap[this.selectedAccessPoint] || 0;
        //   this.cardsAP[0].value = this.connectedUsersPerAP;
        //   this.loadUsersForSelectedAP();
        // }
        if (this.accessPointOptions.length) {
          if (!this.selectedAccessPoint) {
            if (this.accessPointOptions.length >= 2) {
              this.selectedAccessPoint = "ALL_APS";
            } else {
              this.selectedAccessPoint = this.accessPointOptions[0].value;
            }
          }
          this.loadUsersForSelectedAP();
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
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

      if (this.selectedAccessPoint === "ALL_APS") {
        this.connectedUsers = this.allConnectedUsersData.flatMap(
          (ap) =>
            ap.currently_connected_users?.map((user) => ({
              ...user,
              timestamp: Number(user.timestamp) || null,
            })) || []
        );
      } else {
        const apData = this.allConnectedUsersData.find(
          (ap) => ap.called_station_id === this.selectedAccessPoint
        );
        this.connectedUsers =
          apData?.currently_connected_users?.map((user) => ({
            ...user,
            timestamp: Number(user.timestamp) || null,
          })) || [];
      }
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return "N/A";
      const date = new Date(timestamp * 1000);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    formatMacAddress(mac) {
      if (!mac) return "";
      const cleaned = mac.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
      return cleaned.match(/.{1,2}/g)?.join(":") || mac;
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
