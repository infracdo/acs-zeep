<template>
<v-container>
  <v-card>
  <v-data-table
    :headers="headers"
    :items="ssid"
    class="elevation-1"
    :loading="isLoad"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-row no-gutters class="mx-4">
        <v-col
            cols="4"
            md="4"
        >
        <v-autocomplete
        :items="group_list"
        v-model="editedItem.parent"
        item-value="editedItem.parent[0]"
        hide-selected
        hint="Select Group"
        persistent-hint
        dense
        @input="ssidlist"
        ></v-autocomplete>
        </v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="primary"
              dark
              icon
              v-on="{ ...tooltip }"
              @click="initialize"
            >
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </template>
          <span>Refresh</span>
        </v-tooltip>
        </v-row>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          persistent
          :retain-focus="false"
          max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="addrules"
            >
              New SSID
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card-text>
                    <v-row no-gutters>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>WLAN ID</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-select
                        :items="wlanid"
                        :disabled="formTitle!='New SSID'"
                        v-model="editedItem.wlan_id"
                        :label="editedItem.wlan_id.toString()"
                        outlined
                        dense
                        ></v-select>
                    </v-col>
                    <v-spacer />
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Forward Mode</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-select
                        :items="['Bridge', 'Nat']"
                        v-model="editedItem.forward_mode"
                        outlined
                        dense
                        ></v-select>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'SSID <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.ssid"
                        :rules="ssidRules"
                        @keydown="filterKeyPress($event)"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    <v-spacer />
                    <v-col
                        cols="1"
                        md="1"
                        v-if="editedItem.forward_mode=='Bridge'"
                    >
                    <v-subheader><div v-html="'VLAN ID <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                        v-if="editedItem.forward_mode=='Bridge'"
                    >
                        <v-text-field
                        v-model="editedItem.vlan_id"
                        :rules="vlanRules"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Encryption Mode</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-select
                        :items="['Open', 'WPA-PSK', 'WPA-PSK2']"
                        v-model="editedItem.encryption_mode"
                        outlined
                        dense
                        ></v-select>
                    </v-col>
                    </v-row>
                    <v-row no-gutters v-if="editedItem.encryption_mode!='Open'">
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'Password <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.passphrase"
                        :rules="[v => (v || '').length >= 8 || 'Password too short']"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Limit by SSID</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-switch
                        v-model="editedItem.limitless"
                        ></v-switch>
                    </v-col>
                    </v-row>
                    <v-row no-gutters v-if="editedItem.limitless">
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Uplink</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.uplink"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    <v-spacer />
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Downlink</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.downlink"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Auth</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-switch
                        v-model="editedItem.auth"
                        ></v-switch>
                    </v-col>
                    </v-row>
                    <v-row no-gutters v-if="editedItem.auth">
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'Portal URL <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.portal_url"
                        required
                        outlined
                        :rules="portalRules"
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters v-if="editedItem.auth">
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'Portal IP <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.portal_ip"
                        :rules="ipRules"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters v-if="editedItem.auth">
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Gateway ID</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        @keydown="filterKeyPress($event)"
                        v-model="editedItem.gateway_id"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters v-if="editedItem.auth">
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader>Seamless Online</v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-checkbox
                        v-model="editedItem.seamless"
                        ></v-checkbox>
                    </v-col>
                    </v-row>
            <v-subheader><div v-html="'<strong>* </strong> indicates required field'"></div></v-subheader>
            </v-card-text>
          </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="!valid || !!!editedItem.ssid || (!!!editedItem.passphrase&&editedItem.encryption_mode!='Open')"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogCancel" max-width="470px">
          <v-card>
            <v-card-title class="headline">Data has not been saved. Are you sure you want to proceed?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelClose">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="cancelConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data to display
    </template>
  </v-data-table>
  </v-card>
  
  <v-card class="mt-4">
  <v-expansion-panels
    multiple
  >
  <v-expansion-panel>
  <v-expansion-panel-header>Advance Settings(Optional)</v-expansion-panel-header>
  <v-expansion-panel-content>
  <v-data-table
    :headers="cliheaders"
    :items="command"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>CLI Commands</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          max-width="800px"
          persistent
          :retain-focus="false"
          v-model="cdialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="citems.model='ALL'"
            >
              New Command
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Command</span>
            </v-card-title>
          <v-form
            ref="cform"
            v-model="cvalid"
            lazy-validation
          >
            <v-card-text>
                    <v-row no-gutters>
                    <v-col
                        cols="4"
                        md="4"
                    >
                    <v-subheader><div v-html="'Model <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="8"
                        md="8"
                    >
                        <v-select
                        v-model="modelArray"
                        :items="['ALL','AP520(W2)', 'AP520-I(G2)', 'AP630(IDA2)']"
                        :rules="[v => !!v || 'Group is required']"
                        small-chips
                        multiple
                        outlined
                        dense
                        ></v-select>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="4"
                        md="4"
                    >
                    <v-subheader><div v-html="'Description <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="8"
                        md="8"
                    >
                        <v-text-field
                        v-model="citems.description"
                        required
                        outlined
                        :rules="[v => !!v || 'Description is required']"
                        dense
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="4"
                        md="4"
                    >
                    <v-subheader><div v-html="'Command <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    </v-row>
                    <v-row no-gutters class="mx-4">
                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-textarea
                        v-model="citems.command"
                        rows="9"
                        outlined
                        :rules="[v => !!v || 'Command cannot be empty']"
                        densed
                        ></v-textarea>
                    </v-col>
                    </v-row>
            <v-subheader><div v-html="'<strong>* </strong> indicates required field'"></div></v-subheader>
            </v-card-text>
          </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="cclose"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="!cvalid || !!!citems.model || !!!citems.description || !!!citems.command"
                @click="csave"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogCancel" max-width="470px">
          <v-card>
            <v-card-title class="headline">Data has not been saved. Are you sure you want to proceed?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelClose">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="cancelConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="cdialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="ccloseDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="cdeleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="mr-2"
        @click="ceditItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        @click="cdeleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data to display
    </template>
  </v-data-table>
            </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>
  </v-card>
</v-container>
</template>

<script>
import http from "@/http-common";
import config from "@/http-config";

  export default {
    data: () => ({
      modelArray: [],
      dataloaded: 0,
      requestFailed: 0,
      isCancel: false,
      isSave: false,
      valid: false,
      cvalid: false,
      cdialog: false,
      dialog: false,
      dialogDelete: false,
      cdialogDelete: false,
      dialogCancel: false,
      dataTracker: [],
      parent_watcher: '',
      headers: [
        {
          text: 'SSID',
          align: 'start',
          sortable: false,
          value: 'ssid',
        },
        { text: 'WLAN ID', value: 'wlan_id' },
        { text: 'Encryption Mode', value: 'encryption_mode' },
        { text: 'Portal URL', value: 'portal_url' },
        { text: 'Gateway ID', value: 'gateway_id' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      cliheaders: [
        { text: 'Model', value: 'model' },
        { text: 'Description', value: 'description' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      list: [],
      timer: '',
      group_list: [],
      ssidList: [],
      group_parent: '',
      ssid: [],
      all_ssid: [],
      device: [],
      all_device: [],
      device: [],
      all_device: [],
      wlanid: [],
      all_command: [],
      command: [],
      editedIndex: -1,
      cIndex: -1,
      allssidIndex: -1,
      editedItem: {
        id: 0,
        wlan_id: '',
        ssid: '',
        forward_mode: 'Bridge',
        encryption_mode: 'Open',
        passphrase: '',
        portal_url: '',
        vlan_id: 1,
        uplink: 0,
        downlink: 0,
        limitless: false,
        auth: false,
        portal_ip: '',
        parent: '',
        gateway_id: '',
        seamless: false,
      },
      defaultItem: {
        model: 'ALL',
        wlan_id: '',
        ssid: '',
        forward_mode: 'Bridge',
        encryption_mode: 'Open',
        portal_url: '',
        vlan_id: 1,
        uplink: 14400,
        downlink: 14400,
        limitless: false,
        auth: false,
        portal_ip: '',
        gateway_id: '',
        seamless: false,
      },
      citems: {
        model: '',
        description: '',
        command: '',
        parent: '',
      },
      vlanRules: [
        v => !!v || 'VLAN is required',
        v =>!/\D/.test(v) || 'Invalid Vlan',
      ],
      ssidRules: [
        v => !!v || 'SSID is required',
      ],
      portalRules: [
        v => !!v || 'URL is required',
        v => /.+\..+/.test(v) || 'URL must must be valid',
      ],
      ipRules: [
        v => !!v || 'IP is required',
        v => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || 'IP must must be valid',
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New SSID' : 'Edit SSID'
      },
      isLoad () {
        if(this.dataloaded>=4) return false;
        else if(this.requestFailed>=4) return false;
        else return true;
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      cdialog (val) {
        val || this.cclose()
      },
      cdialogDelete (val) {
        val || this.ccloseDelete()
      },
      dialogCancel (val) {
        val || this.cancelClose()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      filterKeyPress (e) {
        if(!e.key.match(/^[a-zA-Z]|^-|^ |^_|^\d*$/))
        {
            e.preventDefault();
        }
      },

      initialize () {
        this.dataloaded = 0
        this.requestFailed = 0
        this.updatessid()
        this.updatecommand()
        this.updatedevice()
        this.updategroup()
        for (var i = 1; i <= 32; i++) {
            this.wlanid.push(i);
        }
        console.log("initialized dataloaded: " + this.dataloaded)
        console.log("initialized request: " + this.requestFailed)
        this.dataTracker = this.editedItem;
      },

      updatessid () {
        http
          .get("/getssid", {timeout: 5000})
          .then(response => {
            this.all_ssid = response.data; // JSON are parsed automatically.
            console.log("group2: loaded" );
            console.log(response.data);
            this.dataloaded++;
            if(this.dataloaded>=4) this.ssidlist();
          })
          .catch(e => {
            this.requestFailed++;
          });
      },
      updatedevice () {
        http
          .get("/getdevice", {timeout: 5000})
          .then(response => {
            this.all_device = response.data; // JSON are parsed automatically.
            console.log(response.data);
            this.dataloaded++;
            if(this.dataloaded>=4) this.ssidlist()
          })
          .catch(e => {
            console.log(e);
            this.requestFailed++;
          });
      },

      updatecommand () {
        http
          .get("/getcommand", {timeout: 5000})
          .then(response => {
            this.all_command = response.data; // JSON are parsed automatically.
            console.log(response.data);
            this.dataloaded++;
            if(this.dataloaded>=4) this.ssidlist()
          })
          .catch(e => {
            console.log(e);
            this.requestFailed++;
          });
      },

      updategroup () {
        http
          .get("/getgroup", {timeout: 5000})
          .then(response => {
            var i, x = new Array();
            for (i in response.data) {
              x[i] = response.data[i].parent+'/'+response.data[i].group_name;
            };
            this.group_list = x;
            this.editedItem.parent = x[0];
            console.log(response.data);
            this.dataloaded++;
            if(this.dataloaded>=4) this.ssidlist()
          })
          .catch(e => {
            console.log(e);
            this.requestFailed++;
          });
      },

      wlanid_array () {

        for (var i = 1; i < 32; i++) {
            this.wlanid.push(i);
        }
      },

      editItem (item) {
        this.dialog = true
        this.parent_watcher = this.editedItem.parent
        this.editedIndex = this.ssid.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.parent = this.parent_watcher
        this.ssidRules.splice(this.ssidRules.lastIndexOf(), 1)
      },

      ceditItem (item) {
        this.cIndex = this.command.indexOf(item)
        this.citems = Object.assign({}, item)
        this.modelArray = this.citems.model.split(",")
        this.cdialog = true
      },

      cancelConfirm () {
        this.editedItem.auth = false;
        this.editedItem.limitless = false;
        this.editedItem.ssid = '';
        this.citems.description = ''
        this.citems.command = ''
        if (this.dialog) this.close()
        else this.cclose()
        this.cancelClose()
      },

      deleteItem (item) {
        this.editedIndex = this.ssid.indexOf(item)
        this.allssidIndex = this.all_ssid.indexOf(item)
        this.parent_watcher = this.editedItem.parent
        this.editedItem = Object.assign({}, item)
        this.editedItem.parent = this.parent_watcher
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.ssid.splice(this.editedIndex, 1)
        this.all_ssid.splice(this.allssidIndex, 1)
        this.closeDelete()
        var i;
        http
            .delete("/deletessid/" + this.editedItem.id)
            .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
        for (i in this.device) {
          config
              .get("/DeleteObject/"+this.device[i].serial_number+", Device.WiFi.SSID."+this.editedItem.wlan_id+".")
              .then(response => {
              console.log(response.data);
              })
              .catch(e => {
              console.log(e);
              });
        }

      },

      cdeleteItem (item) {
        this.cIndex = this.command.indexOf(item)
        this.citems = Object.assign({}, item)
        this.cdialogDelete = true
      },

      cdeleteItemConfirm () {
        this.command.splice(this.cIndex, 1)
        this.ccloseDelete()
        http
            .delete("/deletecommand/" + this.citems.id)
            .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
      },

      cancelClose () {
        this.dialogCancel = false;
      },

      close () {
        if((!this.editedItem.ssid && !this.editedItem.limitless && !this.editedItem.auth) || this.isSave){
          if (this.dialog) this.$refs.form.resetValidation();
          this.parent_watcher = this.editedItem.parent;
          this.valid = false;
          this.dialog = false;
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedItem.parent = this.parent_watcher
            this.editedIndex = -1
            this.isSave = false
          })
        }else {
          this.dialogCancel = true;
        }
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      ccloseDelete () {
        this.cdialogDelete = false
        this.$nextTick(() => {
          this.citems = Object.assign({}, this.defaultItem)
          this.cIndex = -1
        })
      },

      ssidlist () {
          var i, x = new Array(), y = new Array(), z = new Array();
          for (i in this.all_ssid) {
            if(this.editedItem.parent.startsWith(this.all_ssid[i].parent)){
              x[i] = this.all_ssid[i];
              this.ssidList.push(this.all_ssid[i].ssid)
            }
            if(this.editedItem.parent.startsWith(this.all_ssid[i].parent)||this.editedItem.parent.includes(this.all_ssid[i].parent)){
              this.wlanid.splice(this.wlanid.indexOf(this.all_ssid[i].wlan_id), 1)
            }
          };
          for (i in this.all_device) {
            if(this.all_device[i].parent.includes(this.editedItem.parent)) y[i] = this.all_device[i];
          };
          for (i in this.all_command) {
            if(this.editedItem.parent.startsWith(this.all_command[i].parent)) z[i] = this.all_command[i];
          };
          this.ssid = x;
          this.device = y;
          this.command = z;
      },

      addrules () {
        this.ssidRules.push(v => this.ssidList.indexOf(v) < 0|| 'SSID already exist');
        this.editedItem.wlan_id=this.wlanid[0];
      },

      cclose () {
          if((!this.citems.description && !this.citems.command) || this.isSave){
          this.$refs.cform.resetValidation()
          this.cdialog = false
          this.$nextTick(() => {
            this.citems = Object.assign({}, this.defaultItem)
            this.cIndex = -1
            this.isSave = false
          })
        }else {
          this.dialogCancel = true;
        }
      },
      csave () {
        if (this.cIndex > -1) {
          this.citems.parent = this.editedItem.parent
          try{
          this.citems.model = this.modelArray.toString()
          }catch(err){
            console.log("try again")
          }
          Object.assign(this.command[this.cIndex], this.citems)
          var input_command= this.citems.command.split(/\n/g);
          var i, x = new Array(), body = '{';

          for (i in input_command) {
            if(input_command[i]!='!') body += ', Command: ' + input_command[i];
          };

          body += ',}';
          

            http
              .put("/updatecommand/" + this.citems.id, this.citems)
              .then(response => {
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
                console.log("hehe");
              });
          for (i in this.device) {
            console.log("if executing")
            if(this.modelArray.indexOf(this.device[i].model)>0 || this.modelArray.indexOf("ALL")>0){
              console.log("executing")
              config
                  .get("/ExecuteGroupCommand/"+this.device[i].serial_number+", "+this.citems.id)
                  .then(response => {
                  console.log(response.data);
                  })
                  .catch(e => {
                  console.log(e);
                  });
            }
          }

        } else {
          this.citems.parent = this.editedItem.parent
          this.citems.model = this.modelArray.toString()
          var input_command= this.citems.command.split(/\n/g);
          var i, x = new Array(), body = '{';

          for (i in input_command) {
            if(input_command[i]!='!') body += ', Command: ' + input_command[i];
          };

          body += ',}';
          
          
          console.log("command: " + body);
          this.command.push(this.citems)
          this.all_command.push(this.citems)
            http
                .post("/addcommand", this.citems)
                .then(response => {
                this.command[this.command.length-1].id = response.data.id;    
                this.all_command[this.all_command.length-1].id = response.data.id;   
                console.log(response.data);
                for (i in this.device) {
                  console.log("if executing:" + response.data.id)
                  if(this.modelArray.indexOf(this.device[i].model)>0 || this.modelArray.indexOf("ALL")){
                    console.log("executing")
                    config
                        .post("/ExecuteGroupCommand/"+this.device[i].serial_number+", "+response.data.id)
                        .then(response => {
                        console.log(response.data);
                        })
                        .catch(e => {
                        console.log(e);
                        });
                  }
                }
                })
                .catch(e => {
                console.log(e);
                });

        }
        this.isSave = true
        this.cclose()
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.ssid[this.editedIndex], this.editedItem)
          var v = this.editedItem.wlan_id;
          var entype = '', passkey = this.editedItem.passphrase;
          var vid = this.editedItem.vlan_id;
          if(this.editedItem.encryption_mode=='Open'){
            entype = 'None'
            passkey = 'null'
          }
          else if(this.editedItem.encryption_mode=='WPA-PSK') entype = 'WPA-Personal'
          else entype = 'WPA2-Personal'
          if(this.editedItem.forward_mode=='Nat'){
            vid = 'null'
          }
          var body = "'{,Device.WiFi.SSID."+v+".SSID:"+this.editedItem.ssid+",Device.WiFi.SSID."+v+".LowerLayers:1&2,Device.WiFi.SSID."+v+".X_WWW-RUIJIE-COM-CN_IsHidden:false,Device.WiFi.SSID."+v+".X_WWW-RUIJIE-COM-CN_FowardType:"+this.editedItem.forward_mode+",Device.WiFi.SSID."+v+".X_WWW-RUIJIE-COM-CN_VLANID:"+vid+",Device.WiFi.AccessPoint."+v+".Security.ModeEnabled:"+entype+",Device.WiFi.AccessPoint."+v+".Security.KeyPassphrase:"+passkey+",}'"
          var abody = "'{,WiFiDog,"+this.editedItem.portal_ip+","+this.editedItem.portal_url+",js,"+this.editedItem.gateway_id+",true,true}'"
          console.log(body);
          console.log(abody);
          var i;
          http
            .put("/updatessid/" + this.editedItem.id, this.editedItem)
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
          for (i in this.device) {
            config
                .post("/AddSSID/"+this.device[i].serial_number+", "+this.editedItem.id)
                .then(response => {
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
          }
        } else {
          var v = this.editedItem.wlan_id;
          this.wlanid.splice(this.wlanid.indexOf(v), 1)
          this.ssid.push(this.editedItem);
          this.all_ssid.push(this.editedItem);
          var i;
            http
                .post("/addssid", this.editedItem)
                .then(response => {
                  this.ssid[this.ssid.length-1].id = response.data.id;
                  this.all_ssid[this.all_ssid.length-1].id = response.data.id;
                  for (i in this.device) {
                    config
                        .post("/AddSSID/"+this.device[i].serial_number+", "+response.data.id)
                        .then(response => {
                        console.log(response.data);
                        })
                        .catch(e => {
                        console.log(e);
                        });
                  }
                })
                .catch(e => {
                console.log(e);
                });

        }
        this.isSave = true
        this.close()
      },
    },
  }
</script>