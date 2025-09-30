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
            <v-card :style="{backgroundColor: card.color}" class="hover-card" @click="openModal(card)">
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
            v-for="(card, index) in cardsRadiusAP"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}" class="hover-card" @click="openModal(card)">
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
        <v-row>
          <v-col
            v-for="(card, index) in cardsAcsAP"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}" class="hover-card" @click="openModal(card)">
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
          AP for Deployment
        </v-card-title>
        <v-row>
          <v-col
            v-for="(card, index) in cardsAcsDownAP"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card :style="{backgroundColor: card.color}" class="hover-card" @click="openModal(card)">
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
            List of Online Users per Active AP
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
            :disabled="isAccessPointDropdownDisabled"
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
              <template v-slot:item.timestamp="{item}">
                {{ formatTimestamp(item.timestamp) }}
              </template>

              <!-- Format MAC address -->
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
              :items="onlineAPRegisteredData"
              item-key="serial_number"
              :loading="loading"
              loading-text="Loading... Please wait"
              style="min-width: 1000px"
              class="header-nowrap"
            />
          </div>
        </v-card>
      </v-col>
    </v-card>

    <v-card class="pa-4 mb-6" style="height: 700px;">
      <v-card-title class="d-flex justify-space-between align-center pa-0 mb-3">
        <span>Zeep Access Point Locations</span>
        <v-btn-toggle
          v-model="showMainMarkersMode"
          dense
          mandatory
          class="ml-auto"
        >
          <v-btn value="all" small>All</v-btn>
          <v-btn value="online" small>Online</v-btn>
          <v-btn value="offline" small>Offline</v-btn>
        </v-btn-toggle>
      </v-card-title>

      <v-card-text class="pa-0 pt-2" style="height: 94%;">
        <l-map
          ref="mainMapRef"
          :zoom="6"
          :center="[12.2, 121.7740]"
          style="height: 100%; width: 100%;"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <l-marker
            v-for="marker in mainMapMarkers"
            :key="marker.id"
            :lat-lng="[marker.lat, marker.lng]"
            :icon="marker.icon"
          >
            <l-tooltip direction="top">
              <b>MAC:</b> {{ marker.mac }} <br />
              <b>Status:</b> {{ marker.status }}
            </l-tooltip>
          </l-marker>
        </l-map>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showModal" max-width="1400px" :style="{ 'z-index': 1400 }">
      <v-card>
        <v-card-title class="text-h6">
          {{ selectedCard?.title }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchQuery"
            label="Search"
            dense
            outlined
            hide-details
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
          />
          <v-btn icon @click="showModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div v-if="enableFirstModalTab">
          <v-tabs v-model="activeFirstModalTab" :background-color="selectedCard?.color" :slider-color="'white'">
            <v-tab :style="{ color: 'white' }" @click="showFirstModalTable = true; showFirstModalMap = false">Data</v-tab>
            <v-tab :style="{ color: 'white' }" @click="showFirstModalTable = false; showFirstModalMap = true">Location</v-tab>
          </v-tabs>
        </div>
        
        <v-card-text>
          <div v-if="selectedCard" style="margin-top: 16px;">

            <div v-if="showFirstModalTable" style="margin-top: 16px;">
              <v-data-table
                :search="searchQuery"
                :headers="selectedCard.headers"
                :loading="fetchingData"
                loading-text="Fetching... Please wait"
                :key="rowsKey"
                :items="rows"
                :items-per-page="10"
                class="solid-shadow"
              >
                <template v-slot:no-data>
                  <div v-if ="!fetchingData">
                    No data available
                  </div>
                </template>
              
                <template v-slot:item.calledStationId="{ item }">
                  <div v-if="selectedCard && (selectedCard?.title == 'Total Active Users' || selectedCard?.title == 'Total Registered Users')">
                    {{ formatApId(item.calledStationId) }}
                  </div>

                  
                  <div v-if="selectedCard && (selectedCard?.title == 'Current Online APs' || selectedCard?.title == 'Total Active APs' || selectedCard?.title == 'Total Inactive APs')">
                    <span @click.stop.prevent="openSecondaryModal(item, selectedCard.title)" style="cursor: pointer; color: #1976d2;">
                      {{ formatApId(item.calledStationId) }}
                    </span>
                  </div>
                </template>
                
                <template v-slot:item.callingStationId="{ item }">
                  <div v-if="selectedCard && (selectedCard?.title == 'Total Active Users' || selectedCard?.title == 'Total Registered Users')">
                    {{ formatMacAddress(item.callingStationId) }}
                  </div>
                </template>
                  
                <template v-slot:item.username="{ item }">
                  <span @click.stop.prevent="openSecondaryModal(item, selectedCard.title)" style="cursor: pointer; color: #1976d2;">
                    {{ item.username || 'N/A' }}
                  </span>
                </template>

                <template v-slot:item.device_name="{ item }">
                  <div v-if="selectedCard && (selectedCard?.title == 'Total Down AP')">
                    <span @click.stop.prevent="openSecondaryModal(item, selectedCard.title)" style="cursor: pointer; color: #1976d2;">
                      {{ item.device_name || 'N/A' }}
                    </span>
                  </div>

                  <div v-if="selectedCard && (selectedCard?.title != 'Total Down AP')">
                      {{ item.device_name || 'N/A' }}
                  </div>
                </template>
                
                <template v-slot:item.status="{ item }">
                  <span :style="{ color: statusColor(item.status) }">
                    {{ item.status }}
                  </span>
                </template>

                <template v-slot:item.coordinates="{ item }">
                  <span class="text-blue-600 cursor-pointer underline"@click="focusOnMarkerForFirstModal(item)" style="cursor: pointer; color: #1976d2;">
                    {{ item.coordinates }}
                  </span>
                </template>
              </v-data-table>
            </div>
          </div>

          <div v-if="enableFirstModalTab && showFirstModalMap" style="height: 700px; width: 100%; margin-top: 16px;">
            <l-map
              ref="mapRef"
              :zoom="6"
              :center="[12.2, 121.7740]"
              style="height: 100%; width: 100%;"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <l-marker
                v-for="marker in firstMapMarkers"
                :key="marker.id"
                :lat-lng="[marker.lat, marker.lng]"
                :icon="blueMarkerIcon"
              >
                <l-popup>{{ marker.name }}</l-popup>
              </l-marker>
            </l-map>
          </div>

          <!-- <v-card-actions>
            <v-btn text @click="showSecondaryModal = false">Close</v-btn>
          </v-card-actions> -->
        </v-card-text>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="showSecondaryModal" max-width="1500px" :style="{ 'z-index': 2000 }">
      <v-card>
        <v-card-title style="display: flex; align-items: center; justify-content: space-between;">
          <span>{{ secondaryModalTitle }}</span>
          <v-btn icon @click="showSecondaryModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div v-if="enableSecondaryModalTab">
          <v-tabs v-model="activeSecondaryModalTab" :background-color="selectedCard?.color" :slider-color="'white'">
            <v-tab :style="{ color: 'white' }" @click="showSecondaryModalTable = true; showSecondaryModalMap = false">Data</v-tab>
            <v-tab :style="{ color: 'white' }" @click="showSecondaryModalTable = false; showSecondaryModalMap = true">Location</v-tab>
          </v-tabs>
        </div>

        <v-card-text>
          
          <div v-if="showSecondaryModalTable" style="margin-top: 16px;">
            <v-data-table
              :headers="secondaryModalHeaders"
              :loading="fetchingData"
              loading-text="Fetching... Please wait"
              :items="secondaryModalItems"
              :items-per-page="10"
              class="solid-shadow"
            >
              <template v-slot:no-data>
                <div>No data available</div>
              </template>
              <template v-slot:item.calledStationId="{ item }">
                {{ formatApId(item.calledStationId) }}
              </template>

              <template v-slot:item.callingStationId="{ item }">
                {{ formatMacAddress(item.callingStationId) }}
              </template>

              <template v-slot:item.userName="{ item }">
                <div v-if="selectedCard && (selectedCard?.title == 'Current Online APs')">
                  <span @click.stop.prevent="openTertiaryModal(item, selectedCard.title)" style="cursor: pointer; color: #1976d2;">
                    {{ item.userName || 'N/A' }}
                  </span>
                </div>
                <div v-else>
                  {{ item.userName || 'N/A' }}
                </div>
              </template>
              
              <template v-slot:item.status="{ item }">
                <span :style="{ color: statusColor(item.status) }">
                  {{ item.status }}
                </span>
              </template>
              
              <template v-slot:item.coordinates="{ item }">
                <span class="text-blue-600 cursor-pointer underline"@click="focusOnMarkerForSecondModal(item)" style="cursor: pointer; color: #1976d2;">
                  {{ item.coordinates }}
                </span>
              </template>
            </v-data-table>
          </div>

          <div v-if="enableSecondaryModalTab && showSecondaryModalMap" style="height: 700px; width: 100%; margin-top: 16px;">
            <l-map
              ref="secondaryMapRef"
              :zoom="6"
              :center="[12.2, 121.7740]"
              style="height: 100%; width: 100%;"
            >
              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              <l-marker
                v-for="marker in secondaryMapMarkers"
                :key="marker.id"
                :lat-lng="[marker.lat, marker.lng]"
                :icon="blueMarkerIcon"
                >
                <l-popup>{{ marker.name }}</l-popup>
              </l-marker>
            </l-map>
          </div>
        </v-card-text>
        <!-- <v-card-actions>
          <v-btn text @click="showSecondaryModal = false">Close</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>

    <v-dialog v-model="showTertiaryModal" max-width="1800px" :style="{ 'z-index': 2000 }">
      <v-card>
        <v-card-title style="display: flex; align-items: center; justify-content: space-between;">
          <span>{{ tertiaryModalTitle }}</span>
          <v-btn icon @click="showTertiaryModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="tertiaryModalHeaders"
            :loading="fetchingData"
            loading-text="Fetching... Please wait"
            :items="tertiaryModalItems"
            :items-per-page="10"
            class="solid-shadow"
          >
            <template v-slot:no-data>
              <div>No data available</div>
            </template>
            
            <template v-slot:item.calledStationId="{ item }">
              {{ formatApId(item.calledStationId) }}
            </template>

            <template v-slot:item.callingStationId="{ item }">
              {{ formatMacAddress(item.callingStationId) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import L from "leaflet";
import ApiService from "../../api.service";


export default {
  name: "MonitoringDashboard",
  data() {
    return {
      showFirstModalTable: true,
      showFirstModalMap: false,
      enableFirstModalTab: false,
      showSecondaryModalTable: true,
      showSecondaryModalMap: false,
      enableSecondaryModalTab: false,
      showMainMarkersMode: "all",

      fetchingData: false,
      showModal: false,
      showSecondaryModal: false,
      showTertiaryModal: false,
      searchQuery: "",
      selectedCard: null,
      rowsKey: 0,
      rows: [],
      secondaryModalHeaders: [],
      secondaryModalItems: [],
      tertiaryModalHeaders: [],
      tertiaryModalItems: [],
      cardsUsers: [
        {
          title: "Current Online Users",
          value: "-",
          color: "#66BB6A",
          key: "connectedUsers",
          page: 1,
          itemsPerPage: 10,
          totalPageCount: 0,
          headers: [
            { text: "User", value: "username" },
            { text: "Active Sessions", value: "totalActiveSessionCount" },
            { text: "Total Duration", value: "totalSessionDuration" },
            { text: "Total Bandwidth Usage", value: "totalBandwidthUsage" },
          ],
        },
        {
          title: "Total Active Users",
          value: "-",
          color: "#4C925E",
          key: "totalUsers",
          page: 1,
          itemsPerPage: 10,
          totalPageCount: 0,
          headers: [
            { text: "User", value: "username" },
            { text: "Total Sessions", value: "sessionCount" },
            { text: "Total Time", value: "totalTime" },
            { text: "Total Bandwidth", value: "totalBandwidthUsage" },
            { text: "Avg. Session Length", value: "avgSessionLength" }
          ],
        },
        {
          title: "Total Registered Users",
          value: "-",
          color: "#336951",
          key: "totalUsers",
          headers: [
            { text: "User", value: "username" },
            { text: "Total Sessions", value: "sessionCount" },
            { text: "Total Time", value: "totalTime" },
            { text: "Total Bandwidth", value: "totalBandwidthUsage" },
            { text: "Avg. Session Length", value: "avgSessionLength" }
          ],
        },
      ],
      cardsRadiusAP: [
        {
          title: "Current Online APs",
          value: "-",
          color: "#75C6A6",
          key: "connectedAPs",
          headers: [
            { text: "AP ID", value: "calledStationId" },
            { text: "Sessions", value: "totalSessions" },
            { text: "Total Bandwidth", value: "totalBandwidth" },
            { text: "Avg. Session Duration", value: "avgSessionDuration" },
            { text: "Peak Time", value: "peakHour" },
            { text: "AP Location", value: "coordinates" },
          ],
        },
        {
          title: "Total Active APs",
          value: "-",
          color: "#3B897E",
          key: "allConnectedAPData",
          headers: [
            { text: "AP ID", value: "calledStationId" },
            { text: "Sessions", value: "totalSessions" },
            { text: "Total Bandwidth", value: "totalBandwidth" },
            { text: "Avg. Session Duration", value: "avgSessionDuration" },
            { text: "Peak Time", value: "peakHour" },
            { text: "AP Location", value: "coordinates" },
          ],
        },
        {
          title: "Total Inactive APs",
          value: "-",
          color: "#004B56",
          key: "allConnectedAPData",
          headers: [
            { text: "AP ID", value: "calledStationId" },
            { text: "Sessions", value: "totalSessions" },
            { text: "Total Bandwidth", value: "totalBandwidth" },
            { text: "Avg. Session Duration", value: "avgSessionDuration" },
            { text: "Peak Time", value: "peakHour" },
            { text: "AP Location", value: "coordinates" },
          ],
        },
      ],
      cardsAcsAP: [
        // {
        //   title: "Online Registered APs",
        //   value: "-",
        //   color: "#4B8F78",
        //   key: "allConnectedAPData",
        // },
        // {
        //   title: "Offline Registered APs",
        //   value: "-",
        //   color: "#2C665A",
        //   key: "allConnectedAPData",
        // },
        // {
        //   title: "Total Registered APs",
        //   value: "-",
        //   color: "#0E3C3C",
        //   key: "allConnectedAPData",
        // },
        {
          title: "Total Online AP",
          value: "-",
          color: "#4B8F78",
          key: "allConnectedAPData",
          headers: [
            { text: "Device Name", value: "device_name" },
            { text: "Model", value: "model" },
            { text: "Serial Number", value: "serial_number" },
            { text: "Group", value: "parent" },
            { text: "Mac Address", value: "mac_address" },
            { text: "Status", value: "status" },
            { text: "AP Location", value: "coordinates" },
          ],
        },
        {
          title: "Total Down AP",
          value: "-",
          color: "#2C665A",
          key: "allConnectedAPData",
          headers: [
            { text: "Device Name", value: "device_name" },
            { text: "Model", value: "model" },
            { text: "Serial Number", value: "serial_number" },
            { text: "Status", value: "status" },
          ],
        },
        {
          title: "Total Deployed AP",
          value: "-",
          color: "#0E3C3C",
          key: "allConnectedAPData",
          headers: [
            { text: "Device Name", value: "device_name" },
            { text: "Model", value: "model" },
            { text: "Serial Number", value: "serial_number" },
            { text: "Group", value: "parent" },
            { text: "Mac Address", value: "mac_address" },
            { text: "Status", value: "status" },
            { text: "AP Location", value: "coordinates" },
          ],
        },
      ],
      cardsAcsDownAP: [
        {
          title: "Total Device for Deployment",
          value: "-",
          color: "#15676b",
          key: "allDeviceForDeploymentData",
          headers: [
            { text: "Serial Number", value: "serial_number" },
            { text: "Group", value: "parent" },
            { text: "Mac Address", value: "mac_address" },
            { text: "Status", value: "status" },
            // { text: "AP Location", value: "coordinates" },
          ],
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
          color: "#6C85CC",
          key: "totalBandwidthConsumptionToday",
        },
        {
          title: "Total User Sessions",
          value: "-",
          color: "#4E5BAE",
          key: "totalUserSessionsToday",
        },
      ],
      cardsAvg: [
        {
          title: "Average Bandwidth Usage",
          value: "-",
          color: "#5271AB",
          key: "averageBandwidthPerConnection",
        },
        {
          title: "Average Session Time",
          value: "-",
          color: "#18346B",
          key: "averageConnectionTime",
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
      allOnlineUsersData: [],
      rogueAPRegisteredData: [],
      onlineAPRegisteredData: [],
      offlineAPRegisteredData: [],
      totalRegisteredAPData: [],
      currentConnectedAPs: [],
      accessPointOptions: [],
      formattedAccessPointOptions: [],
      selectedAccessPoint: null,
      loading: false,
      fetchInterval: null,
      apLocations: [],
      blueMarkerIcon: L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      redMarkerIcon: L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [0, -29],
        shadowSize: [41, 41]
      }),
      greenMarkerIcon: L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [0, -29],
        shadowSize: [41, 41]
      }),
    };
    
  },
  computed: {
    isAccessPointDropdownDisabled() {
      return (
        !this.accessPointOptions.length ||
        (this.accessPointOptions.length === 1 && this.accessPointOptions[0].value === null)
      );
    },
    firstMapMarkers() {
      if (!this.rows || !this.rows.length) return [];
      return this.rows
        .filter(row => row.coordinates)
        .map(row => {
          const [lng, lat] = row.coordinates.split(",").map(Number);
          return {
            id: row.calledStationId || row.username || row.device_name,
            name: row.calledStationId || row.username || row.device_name,
            lat,
            lng
          };
        });
    },
    secondaryMapMarkers() {
      if (!this.secondaryModalItems || !this.secondaryModalItems.length) return [];
      return this.secondaryModalItems
        .filter(row => row.coordinates)
        .map(row => {
          const [lng, lat] = row.coordinates.split(",").map(c => Number(c.trim()));
          return {
            id: row.calledStationId || row.username || row.acctSessionId,
            name: row.calledStationId || row.username || row.acctSessionId,
            lat,
            lng
          };
        });
    },
    mainMapMarkers() {
      const markers = [];

      this.onlineAPRegisteredData.forEach((ap, index) => {
        if (ap.coordinates) {
          const [lng, lat] = ap.coordinates.split(",").map(Number);
          markers.push({
            id: `online-${index}`,
            lat,
            lng,
            mac: ap.mac_address,
            status: "online",
            icon: this.greenMarkerIcon
          });
        }
      });

      this.offlineAPRegisteredData.forEach((ap, index) => {
        if (ap.coordinates) {
          const [lng, lat] = ap.coordinates.split(",").map(Number);
          markers.push({
            id: `offline-${index}`,
            lat,
            lng,
            mac: ap.mac_address,
            status: "offline",
            icon: this.redMarkerIcon
          });
        }
      });

      if (this.showMainMarkersMode === "online") {
        return markers.filter(m => m.status === "online");
      } else if (this.showMainMarkersMode === "offline") {
        return markers.filter(m => m.status === "offline");
      }
      return markers;
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
    async loadFormattedAccessPointOptions() {
      const formatted = await Promise.all(
        this.accessPointOptions.map(async (item) => {
          if (!item.value) {
            return item;
          }
          let mac = item.value;
          let name = '';

          // Only get device name if MAC address doesn't contain colon
          if (!item.value.includes(':')) { // if station id does not contain colon then it is a lowercased mac
            try {
              mac = this.formatMacAddress(item.value); // format lowercased mac 
              const response = await ApiService.getAPDeviceName(mac); // get device name of ap from mac
              name = response.data.deviceName;
              if (!name) {
                name = 'No Device Name';
              }
            } catch {
              name = 'No Device Name';
            }
          } else { // if it contains a colon then it has ssid
            const [macRaw, ssid] = item.value.split(":");
            mac = this.formatMacAddress(macRaw); // format mac address
            name = ssid;
          }

          return {
            text: `${mac} - ${name}`,
            value: item.value,
          };
        })
      );

      // Add ALL_APS option if there are 2 or more APs
      if (this.accessPointOptions.length >= 2) {
        this.formattedAccessPointOptions = [
          { text: 'ALL APs', value: 'ALL_APS' },
          ...formatted,
        ];
      } else {
        this.formattedAccessPointOptions = formatted;
      }
    },
    async fetchData() {
      try {
        this.loading = true;

        // Fetch all data in parallel
        const [ // user insights
          countOnlineUsersResponse, // current online users
          countActiveUsersResponse, // total active users
          countRegisteredUsersResponse, // total registered users
        ] = await Promise.all([
          ApiService.getCountForAllCurrentOnlineUsers(),
          ApiService.getCountForAllActiveUsersForThePast7Days(),
          ApiService.getCountForAllRegisteredUsersWithSessions(),
        ]);

        const [ // ap insights
          countOnlineAPsResponse, // current online aps
          countActiveAPsResponse, // total active aps
          countInactiveAPsResponse, // total offline aps
        ] = await Promise.all([
          ApiService.getCountForAllCurrentOnlineApForTheLast30Mins(),
          ApiService.getCountForAllActiveApForTheLast7Days(),
          ApiService.getCountForAllInActiveApForMoreThan7Days(),
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
          ApiService.getAverageBandwidthForMonth(),
          ApiService.getAverageConnectionTimeForMonth(),
        ]);

        const [ // acs aps
          onlineAPsResponse, // online aps
          offlineAPsResponse, // offline aps
          registeredAPsResponse, // all registered aps
        ] = await Promise.all([
          ApiService.getOnlineRegisteredAPs(),
          ApiService.getOfflineRegisteredAPs(),
          ApiService.getAllRegisteredAPs(),
        ]);

        const [ // acs aps
          rogueAPsResponse, // all registered aps
        ] = await Promise.all([
          ApiService.getAllRogueAPs(),
        ]);

        const [ // tables
          countConnectedUsersPerApResponse,
          onlineUsersPerApResponse,
          accessPointsResponse,
        ] = await Promise.all([
          ApiService.getCountCurrentlyConnectedUsersPerAP(),
          ApiService.getCurrentlyConnectedUsersPerAP(),
          ApiService.getAccessPoints(),
        ]);

        // Update overall summary cards
        this.cardsUsers[0].value = countOnlineUsersResponse.data.totalCount;
        this.cardsUsers[1].value = countActiveUsersResponse.data.totalCount;
        this.cardsUsers[2].value = countRegisteredUsersResponse.data.totalCount;

        this.cardsRadiusAP[0].value = countOnlineAPsResponse.data.totalCount;
        this.cardsRadiusAP[1].value = countActiveAPsResponse.data.totalCount;
        this.cardsRadiusAP[2].value = countInactiveAPsResponse.data.totalCount;

        this.cardsTotal[0].value = totalBandwidthConsumptionTodayResponse.data.totalBandwidthConsumptionToday;
        this.cardsTotal[1].value = totalSessionTimeTodayResponse.data.totalSessionTimeToday;
        this.cardsTotal[2].value = totalUserSessionsTodayResponse.data.totalUserSessionsToday;

        this.cardsAvg[0].value =
          avgBandwidthConnectionResponse.data.averageBandwidthForMonth;
        this.cardsAvg[1].value =
          avgConnectionTimeResponse.data.averageConnectionTimeForMonth;

        // Convert array to map
        this.connectedUsersPerAPMap = {};
        countConnectedUsersPerApResponse.data.forEach((item) => {
          // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
          // this.connectedUsersPerAPMap[item.apMacAddress] = item.userCount;
          this.connectedUsersPerAPMap[item.calledStationId] =
            item.currentlyConnectedUsers;
        });

        // Store all connected users data
        this.allOnlineUsersData = onlineUsersPerApResponse.data;

        this.onlineAPRegisteredData = onlineAPsResponse.data.registeredAPs;
        this.offlineAPRegisteredData = offlineAPsResponse.data.registeredAPs;
        this.totalRegisteredAPData = registeredAPsResponse.data.registeredAPs;
        
        this.cardsAcsAP[0].value = this.onlineAPRegisteredData.length;
        this.cardsAcsAP[1].value = this.offlineAPRegisteredData.length;
        this.cardsAcsAP[2].value = this.totalRegisteredAPData.length;
        
        this.rogueAPRegisteredData = rogueAPsResponse.data.rogueAPs;
        
        this.cardsAcsDownAP[0].value = this.rogueAPRegisteredData.length;
        
        // Setup options for the select field
        // NOTE: commented since this displays data retrieved from the wifidog (captive portal) database
        // this.currentConnectedAPs = currentConnectedAPs.data.data;
        // this.accessPointOptions = this.currentConnectedAPs.map((ap) => ({
        //   text: ap,
        //   value: ap,
        // }));
        const aps = accessPointsResponse.data.accessPoints || [];

        if (aps.length === 0) {
          this.accessPointOptions = [{ text: 'NO ACTIVE APS FOUND', value: null }];
          this.selectedAccessPoint = null;
        } else {
          this.accessPointOptions = aps
            .filter(ap => ap != null)
            .map(ap => ({ text: ap, value: ap }));

          if (!this.selectedAccessPoint) {
            this.selectedAccessPoint = aps.length >= 2 ? 'ALL_APS' : aps[0];
          }
        }

        await this.loadFormattedAccessPointOptions();
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

      const uniqueUsersMap = new Map();

      // Helper to add users uniquely by username or MAC
      const addUniqueUsers = (users, apId = null, map = uniqueUsersMap) => {
        const seenUsers = new Set();

        for (const user of users || []) {
          const key = user.username || user.calling_station_id;
          if (!key || seenUsers.has(key)) continue;

          seenUsers.add(key);
          map.set(apId ? `${key}_${apId}` : key, {
            ...user,
            timestamp: Number(user.timestamp) || null,
            called_station_id: apId || user.called_station_id,
          });
        }
      };

      // === ALL APs Mode ===
      if (this.selectedAccessPoint === "ALL_APS") {
        for (const ap of this.allOnlineUsersData) {
          const apId = ap.called_station_id;
          addUniqueUsers(ap.currently_connected_users, apId);
        }
      } 
      // === Single AP Mode ===
      else {
        const apData = this.allOnlineUsersData.find(
          ap => ap.called_station_id === this.selectedAccessPoint
        );
        if (apData) {
          addUniqueUsers(apData.currently_connected_users);
        }
      }

      this.connectedUsers = Array.from(uniqueUsersMap.values());
    },
    async openModal(card) {
      this.selectedCard = card;
      this.searchQuery = "";
      this.fetchingData = true;
      this.rows = [];
      this.showModal = true;
      this.showFirstModalTable = true;
      this.showFirstModalMap = false;
      this.activeFirstModalTab = 0;
      this.enableFirstModalTab = card.headers.some(h => h.value === "coordinates");

      const apiMap = {
        "Current Online Users": ApiService.getAllCurrentOnlineUserDetails,
        "Total Registered Users": ApiService.getAllRegisteredUsersWithSessions,
        "Total Active Users": ApiService.getAllActiveUsersForThePast7Days,
        "Current Online APs": ApiService.getAllCurrentOnlineApForTheLast30Mins,
        "Total Active APs": ApiService.getAllActiveApForTheLast7Days,
        "Total Inactive APs": ApiService.getAllInactiveApForMoreThan7Days,
        "Total Device for Deployment": ApiService.getAllRogueAPs,
        "Total Down AP": ApiService.getOfflineRegisteredAPs,
        "Total Deployed AP": ApiService.getAllRegisteredAPs,
        "Total Online AP": ApiService.getOnlineRegisteredAPs,
      };

      try {
        const apiCall = apiMap[card.title];
        if (!apiCall) throw new Error(`No API mapped for card: ${card.title}`);

        const { data } = await apiCall();
        this.rows = Object.values(data)[0] || data.row || [];
        this.rowsKey = Date.now();
        // console.log("Fetched data:", data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        this.fetchingData = false;
      }
    },
    async openSecondaryModal(item, selectedCardTitle) {
      // console.log("openSecondaryModal:", item.username);
      this.showSecondaryModal = true;
      this.secondaryModalItems = [];
      this.fetchingData = true;
      this.showSecondaryModalTable = true;
      this.showSecondaryModalMap = false;
      this.activeSecondaryModalTab = 0;
      this.enableSecondaryModalTab = false;
      
      try {
        let url, title, headers, items;

        if (["Current Online Users", "Total Active Users", "Total Registered Users"].includes(selectedCardTitle)) {
          this.enableSecondaryModalTab = true;
          url =
            selectedCardTitle === "Current Online Users"
              ? ApiService.getAllSessionsByUsernameForCurrentOnlineUsers(item.username)
              : selectedCardTitle === "Total Active Users"
              ? ApiService.getAllSessionsByUsernameForThePast7Days(item.username)
              : ApiService.getAllSessionsByUsername(item.username);
          const { data } = await url;
          title = `User Session Details for ${item.username}`;
          items = data.userSessions || [];
          headers = [
            { text: "Session ID", value: "acctSessionId" },
            { text: "Start Time", value: "startTime" },
            { text: "Duration", value: "duration" },
            { text: "Bandwidth Used", value: "bandwidthUsage" },
            { text: "Device", value: "callingStationId" },
            { text: "AP ID", value: "calledStationId" },
            { text: "AP Location", value: "coordinates" },
          ];
        }else if (["Current Online APs", "Total Active APs", "Total Inactive APs"].includes(selectedCardTitle)) {
          url =
            selectedCardTitle === "Current Online APs"
              ? ApiService.getCurrentOnlineApForTheLast30MinsByApId(item.calledStationId)
              : selectedCardTitle === "Total Active APs"
              ? ApiService.getAllActiveApForTheLast7DaysByApId(item.calledStationId)
              : ApiService.getAllInActiveApForTheLast7DaysByApId(item.calledStationId);
          const { data } = await url;
          title = `Access Point Session Details for ${this.formatApId(item.calledStationId)}`;
          items = (Object.values(data)[0] || []).map(u => ({ ...u, calledStationId: item.calledStationId }));
          headers = [
            { text: "User", value: "userName" },
            { text: "Total Sessions", value: "totalSessions" },
            { text: "Total Time", value: "totalTime" },
            { text: "Total Bandwidth", value: "totalBandwidth" },
            { text: "avg. Session Length", value: "avgSessionLength" },
          ];
        }else if (selectedCardTitle === "Total Down AP") {
          this.enableSecondaryModalTab = true;
          const { data } = await ApiService.getRegisteredOfflineDevicesByApId(item.mac_address);
          title = `${selectedCardTitle} Details for ${item.mac_address}`;
          items = data.registeredAPs || [];
          headers = [
            { text: "Device Name", value: "device_name" },
            { text: "Model", value: "model" },
            { text: "Serial Number", value: "serial_number" },
            { text: "Group", value: "parent" },
            { text: "Mac Address", value: "mac_address" },
            { text: "Status", value: "status" },
            { text: "Date Offline", value: "date_offline" },
            { text: "AP Location", value: "coordinates" },
          ];
        }

        this.secondaryModalTitle = title;
        this.secondaryModalItems = items;
        this.secondaryModalHeaders = headers;
      } catch (error) {
        // console.error(error);
      } finally {
        this.fetchingData = false;
      }
    },
    async openTertiaryModal(item, selectedCardTitle) {
      this.showTertiaryModal = true;
      this.fetchingData = true;
      this.tertiaryModalItems = [];
      
      if(selectedCardTitle == "Current Online APs"){
        try{
          console.log("Fetching tertiary modal for:", item.calledStationId, item.userName);
          const { data } = await ApiService.getSessionForCurrentOnlineUsersByUsernameAndApId( item.calledStationId, item.userName );

          this.tertiaryModalTitle = `User Session Details for ${item.userName}`;
          this.tertiaryModalItems = data.currentOnlineApByUserAndApId || [];
          this.tertiaryModalHeaders = [
            { text: "Session ID", value: "acctSessionId" },
            { text: "Start Time", value: "startTime" },
            { text: "Duration", value: "duration" },
            { text: "Bandwidth", value: "bandwidthUsage" },
            { text: "Device", value: "callingStationId" },
            { text: "AP ID", value: "calledStationId" },
          ];
          // console.log("Fetched data:", this.tertiaryModalItems);
        } catch (error) {
          // console.error("Error fetching data:", error);
        } finally {
          this.fetchingData = false;
        }
      }
    },
    //TODO: implement pagination in modal
    async fetchRows(page) {
      this.selectedCard.page = page;
      await this.openModal(this.selectedCard);
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
    formatApId(value) {
      if (!value) return '';
      const part = value.split(':')[0];
      const upper = part.toUpperCase();
      return upper.match(/.{1,2}/g).join(':');
    },
    statusColor(status) {
      if (status.toLowerCase() === 'online') return 'green';
      if (status.toLowerCase() === 'offline') return 'red';
      return 'gray';
    },
    focusOnMarkerForFirstModal(row) {
      if (!row.coordinates) return;
      const [lng, lat] = row.coordinates.split(",").map(c => Number(c.trim()));
      this.showFirstModalMap = true;
      this.showFirstModalTable = false;
      this.activeFirstModalTab = 1;
      this.$nextTick(() => {
        if (this.$refs.mapRef) {
          this.$refs.mapRef.mapObject.setView([lat, lng], 13);
        }
      });
    },
    focusOnMarkerForSecondModal(row) {
      if (!row.coordinates) return;
      const [lng, lat] = row.coordinates.split(",").map(c => Number(c.trim()));
      this.showSecondaryModalMap = true;
      this.showSecondaryModalTable = false;
      this.activeSecondaryModalTab = 1;
      this.$nextTick(() => {
        if (this.$refs.secondaryMapRef) {
          this.$refs.secondaryMapRef.mapObject.setView([lat, lng], 13);
        }
      });
    },
    
  },
  // TODO: optimize by fetching data only when modal is opened
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.page = 1;
        this.fetchRows();
      }
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

.hover-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 8px rgba(0,0,0,0.3);
}

.solid-shadow {
  box-shadow: 0 0 5px rgba(0,0,0,0.3) !important;
}

</style>
