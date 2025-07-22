<template>
  <div>
  <v-data-table
    v-model="selected"
    :headers="computedHeaders"
    :items="device"
    :search="search"
    item-key="serial_number"
    :single-select="singleSelect"
    show-select
    class="elevation-1"
    :loading="dataloaded<1"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
      <v-menu offset-y v-if="selected.length>0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon dark>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="actions(index)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

        <v-toolbar-title>Devices</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
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
        <v-spacer></v-spacer>
      <v-menu offset-y :close-on-content-click="false" left>
        <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
            icon
          >
            <v-icon dark>mdi-table-edit</v-icon>
          </v-btn>
          </template>
          <span>Filter Column</span>
        </v-tooltip>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in filterableHeaders"
            :key="index"
          >
                <v-checkbox
                  v-model="item.show"
                  :label="item.text"
                  dense
                  hide-details
                ></v-checkbox>
          </v-list-item>
        </v-list>
      </v-menu>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="initGroup"
            >
              New Devices
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
                    <v-subheader><div v-html="'Serial Number <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        @keydown="filterKeyPress($event)"
                        v-model="editedItem.serial_number"
                        :disabled="editedIndex!=-1"
                        :rules="serialRules"
                        required
                        outlined
                        dense
                        @focus="alert=false"
                        ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'Parent Group <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-autocomplete
                        :items="group_list"
                        v-model="editedItem.parent"
                        item-value="editedItem.parent[0]"
                        :rules="[v => !!v || 'Group is required']"
                        outlined
                        dense
                        ></v-autocomplete>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'Device Alias <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-text-field
                        @keydown="filterKeyPress($event)"
                        v-model="editedItem.device_name"
                        :rules="[v => !!v || 'Name is required']"
                        required
                        outlined
                        dense
                        ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-subheader><div v-html="'Device Type <strong>*</strong>'"></div></v-subheader>
                    </v-col>
                    <v-col
                        cols="4"
                        md="4"
                    >
                        <v-select
                        :items="['Access Point', 'Switch', 'Router']"
                        v-model="editedItem.device_type"
                        item-value="Access Point"
                        :rules="[v => !!v || 'Device type is required']"
                        outlined
                        dense
                        ></v-select>
                    </v-col>

                    </v-row>
            <v-subheader><div v-html="'<strong>* </strong> indicates required field'"></div></v-subheader>
            </v-card-text>

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
                :disabled="!valid || !!!editedItem.device_name || !!!editedItem.parent || !!!editedItem.serial_number"
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogMove" max-width="600px">
          <v-card>
            <v-card-title> Select Group </v-card-title>
                <v-row no-gutters>
                    <v-col
                        cols="3"
                        md="3"
                    >
                    <v-subheader>Parent Group</v-subheader>
                    </v-col>
                    <v-col
                        cols="6"
                        md="6"
                    >
                        <v-autocomplete
                        :items="group_list"
                        v-model="editedItem.parent"
                        item-value="editedItem.parent[0]"
                        :rules="[v => !!v || 'Group is required']"
                        outlined
                        dense
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeMove">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="moveConfirm">OK</v-btn>
              <v-spacer></v-spacer>
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
        <v-dialog v-model="Multi_dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="Multi_closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="Multi_deleteItemConfirm">OK</v-btn>
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
        <v-dialog v-model="dialogcli" max-width="600px">
          <v-layout column class="fill-height">
          <v-card min-height="500" max-width="600" max-height="500" dark>
            <v-card-title class="headline">{{cliheader}}</v-card-title>
            <v-card-text >
                        <v-textarea
                        rows="17"
                        v-model="code"
                        readonly
                        densed
                        outlined
                        no-resize
                        ></v-textarea>
            </v-card-text>
          </v-card>
          <v-card>
                    <v-row no-gutters class="mx-4">
                    <v-col
                        cols="8"
                        md="8"
                    >
                      <v-menu offset-y v-model="suggestShow" max-height="200px" max-width="300" :nudge-right="(1+getcode.length)*15">
                        <template v-slot:activator="{}">
                        <v-text-field
                        @keydown="detectKeyPress($event)"
                        v-model="getcode"
                        required
                        outlined
                        dense
                        class="mt-2"
                        ></v-text-field>
                        </template>
                    <v-list dense>
                      <v-list-item
                        v-for="(item, index) in sampleSuggest"
                        :key="index"
                        @click="selectSuggestion(item)"
                      >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                      </v-menu>
                    </v-col>
                    <v-col
                        cols="2"
                        md="2"
                    >
                    <v-btn color="blue darken-1" text @click="sendcode(getcode)" class="mt-2">send code</v-btn>
                    </v-col>
                    <v-col
                        cols="1"
                        md="1"
                    >
                    <v-btn color="blue darken-1" text @click="code=''" class="mt-2">clear</v-btn>
                    </v-col>
                    </v-row>
          </v-card>
          </v-layout>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-icon
        small
        :color="getColor(item.status)"
        v-if="getColor(item.status)!='white'"
      >
        mdi-checkbox-blank-circle
      </v-icon>
      <v-icon
        small
        v-if="getColor(item.status)=='white'"
      >
        mdi-checkbox-blank-circle-outline
      </v-icon>
        {{ item.status }}

    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        @click="opencli(item)"
      >
        mdi-console
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data to display
    </template>
  </v-data-table>
  <v-card class="mt-4">
  <v-expansion-panels
    multiple
  >
  <v-expansion-panel>
  <v-expansion-panel-header>Show rogue devices</v-expansion-panel-header>
  <v-expansion-panel-content>
  <rogue-ap></rogue-ap>
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
  </div>
</template>

<script>
import http from "@/http-common";
// import config from "@/http-config";
import rogue from './Rogue-device.vue'
  export default {
    components: {
      'rogue-ap': rogue
    },
    data: () => ({
      suggestShow: false,
      hideStatus: false,
      toggleSelect: false,
      dataloaded: 0,
      vsave: true,
      valid: false,
      singleSelect: false,
      alert: false,
      parent_watcher: '',
      isSave: false,
      serialList: [],
      selected: [],
      search: '',
      code: '',
      cliheader: '',
      cliserial: '',
      apname: 'acs#',
      mode_url: 'exec',
      mode_prompt: '',
      mode_idtx: '0',
      mode_idtx1: '0',
      mode_idtx2: '0',
      mode_stridx: '',
      getcode: '',
      dialog: false,
      dialogDelete: false,
      dialogCancel: false,
      Multi_dialogDelete: false,
      dialogcli: false,
      dialogMove: false,
      sampleSuggest: [
        { text: 'ap-mode', value: 'status', show: true },
        { text: 'show', value: 'parent', show: true },
        { text: 'clear', value: 'mac_address', show: true},
        { text: 'debug', value: 'date_offline', show: true},
        { text: 'conf t', value: 'date_modified', show: true},
      ],
      filterableHeaders: [
        { text: 'Status', value: 'status', show: true },
        {
          text: 'Device Name',
          align: 'start',
          sortable: false,
          value: 'device_name',
          show: true
        },
        { text: 'Group', value: 'parent', show: true },
        { text: 'Mac Address', value: 'mac_address', show: true},
        { text: 'Offline Time', value: 'date_offline', show: true},
        { text: 'Modified Time', value: 'date_modified', show: true},
      ],
      headers: [
        { text: 'Status', value: 'status', show: true },
        {
          text: 'Device Name',
          align: 'start',
          sortable: false,
          value: 'device_name',
          show: true
        },
        { text: 'Serial Number', value: 'serial_number', show: true },
        { text: 'Group', value: 'parent', show: true },
        { text: 'Mac Address', value: 'mac_address', show: true },
        { text: 'Offline Time', value: 'date_offline', show: true },
        { text: 'Modified Time', value: 'date_modified', show: true },
        { text: 'Action', value: 'actions', sortable: false, show: true },
      ],
    serialRules: [
      v => !!v || 'Serial is required',
      v => (v && v.length >= 10) || 'Invalid Serial',
      v => (v && v.length <= 14) || 'Invalid Serial',
    ],
      group_list: [],
      serial_list: [],
      device: [],
      items: [
        { title: 'restart' },
        { title: 'move' },
        { title: 'delete' },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        status: 'offline',
        device_name: '',
        activated: '',
        date_created: '',
        date_modified: '',
        date_offline: '',
        group_name: '',
        location: '',
        mac_address: '',
        parent: '/apollo',
        device_type: 'Access Point',
        serial_number: '',
      },
      defaultItem: {
        id: '',
        status: 'offline',
        device_name: '',
        activated: '',
        date_created: '',
        date_modified: '',
        date_offline: '',
        group_name: '',
        location: '',
        mac_address: '',
        parent: '',
        device_type: 'Access Point',
        serial_number: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Device' : 'Edit Device'
      },
    computedHeaders () {
      var i, returnHeaders = new Array();
      returnHeaders = this.headers;
      for(i in this.filterableHeaders){
        if(!this.filterableHeaders[i].show)
          returnHeaders = returnHeaders.filter(headers => headers.text !== this.filterableHeaders[i].text)
      }
      
      return returnHeaders;
    }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      Multi_dialogDelete (val) {
        val || this.Multi_closeDelete()
      },
      dialogCancel (val) {
        val || this.cancelClose()
      },
    },

    created () {
      this.initialize()
      this.todo()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {

      filterKeyPress (e) {
        if(!e.key.match(/^[a-zA-Z]|^-|^_|^\d*$/))
        {
            e.preventDefault();
        }
      },

      detectKeyPress (e) {
        if(e.keyCode === 13)
        {
            this.sendcode(this.getcode);
        }
        if(e.key === '?')
        {
            this.getSuggest(this.getcode);
        }
      },

      selectSuggestion( e ){
        this.getcode = this.getcode.replace("?", e);
      },

      
      todo: function(){           
          this.timer = setInterval(function(){
            if(this.selected.length<=0) this.initialize();
          }.bind(this), 15000);
      },
      initialize () {
      this.dataloaded = 0 
      http
        .get("/getdevice", {timeout: 5000})
        .then(response => {
          //this.device = response.data; // JSON are parsed automatically.
          this.device = []
          var i;
          for(i in response.data){
            this.serialList.push(response.data[i].serial_number)
            if(response.data[i].parent != "unassigned") this.device.push(response.data[i])
          } 
          this.dataloaded = 1 
          console.log("device refresh")
          console.log(this.selected)
        })
        .catch(e => {
          console.log(e);
          this.dataloaded = 1
        });
        http
          .get("/getgroup")
          .then(response => {
            var i, x = new Array();
            for (i in response.data) {
              x[i] = response.data[i].parent+'/'+response.data[i].group_name;
            };
            this.group_list = x;
            if(!!!this.group_list) this.editedItem.parent = this.group_list[0];
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getColor: function(status) {
        if (status=='syncing') return 'orange'
        else if (status=='online') return 'green'
        else return 'white'
      },

      editItem (item) {
        this.dialog = true
        this.parent_watcher = item.parent
        this.editedIndex = this.device.indexOf(item)
        this.editedItem = Object.assign({}, item)
      },

      initGroup () {
        http
          .get("/getgroup")
          .then(response => {
            var i, x = new Array();
            for (i in response.data) {
              x[i] = response.data[i].parent+'/'+response.data[i].group_name;
            };
            this.group_list = x;
            if(!!!this.group_list) this.editedItem.parent = this.group_list[0];
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          this.serialRules.push(v => this.serialList.indexOf(v) < 0|| 'Serial already exist');
      },

      closeMove () {
        this.dialogMove = false;
      },


      moveConfirm () {
        var i, x = new Array();
        for (i in this.selected) {
          console.log(this.device.indexOf(this.selected[i]))
          if(this.device.indexOf(this.selected[i])!=-1) this.device[this.device.indexOf(this.selected[i])].parent = this.editedItem.parent
          this.editedItem = Object.assign({}, this.device[this.device.indexOf(this.selected[i])])
              http
                .put("/updatedevice/" + this.editedItem.id, this.editedItem)
                .then(response => {
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
                this.closeMove()
              http
                  .get("/MoveDeviceGroup/"+this.selected[i].serial_number)
                  .then(response => {
                  console.log(response.data);
                  })
                  .catch(e => {
                  console.log(e);
                  });
        }
        this.selected = []
      },

      Multi_deleteItemConfirm () {
        var i;
        for (i in this.selected) {
        this.device.splice(this.device.indexOf(this.selected[i]), 1)
        this.Multi_closeDelete()
        http
            .delete("/deletedevice/" + this.selected[i].id)
            .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
          };
          this.selected = [];
      },

      cancelConfirm () {
        this.editedItem.device_name = '';
        this.editedItem.serial_number = '';
        this.close();
        this.cancelClose();
      },

      deleteItem (item) {
        this.editedIndex = this.device.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.device.splice(this.editedIndex, 1)
        this.closeDelete()
        http
            .delete("/deletedevice/" + this.editedItem.id)
            .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
      },
      actions (index) {
        if(index==2){
          this.Multi_dialogDelete = true
        }
        else if(index==0){
          var i, x = new Array();
          for (i in this.selected) {
        http
            .get("/Reboot/"+this.selected[i].serial_number)
            .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
            console.log(this.selected[i].id);
          };
          this.selected = [];

        }
        else if(index==1){
          this.dialogMove = true
        }
      },

      opencli (item) {
        this.dialogcli = true;
        this.code = '';
        this.apname = 'acs#'
        this.mode_url = 'exec';
        this.mode_prompt = '';
        this.mode_idtx = '0';
        this.mode_idtx1 = '0';
        this.mode_idtx2 = '0';
        this.mode_stridx = '';
        this.cliserial = item.serial_number;
        if(item.device_name==null) this.cliheader= item.serial_number;
        else this.cliheader= item.device_name;
      },
      sendcode(text) {
        this.getcode = '';
        var body = '{,'+this.mode_url+','+this.mode_idtx+','+this.mode_idtx1+','+this.mode_idtx2+','+this.mode_stridx+','+this.mode_prompt+','+text+','+'}';
        console.log(body);
        this.code += text + "\n";
        http
          .post("/WebCli/"+this.cliserial, body)
          .then(response => {
            this.code += response.data.content; // JSON are parsed automatically.
            console.log(this.sampleSuggest)
            this.apname=response.data.mode_tip
            this.mode_url=response.data.mode_url
            this.mode_idtx=response.data.mode_idtx
            this.mode_idtx1=response.data.mode_idtx1
            this.mode_idtx2=response.data.mode_idtx2
            this.mode_stridx=response.data.mode_stridx
            this.mode_prompt=response.data.mode_prompt
            this.code += this.apname;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          console.log(this.cliserial);
      },

      getSuggest (text) {
        var body = '{,'+this.mode_url+','+this.mode_idtx+','+this.mode_idtx1+','+this.mode_idtx2+','+this.mode_stridx+','+this.mode_prompt+','+text+'?'+','+'}';
        http
          .post("/CliAutoComplete/ "+this.cliserial, body)
          .then(response => {
            this.sampleSuggest = response.data.content.split("\r\n")
            var i;
            for (i in this.sampleSuggest) {
                console.log(this.sampleSuggest[i])
                this.sampleSuggest[i] = this.sampleSuggest[i].slice(2)
                console.log(this.sampleSuggest[i].indexOf(" "))
                this.sampleSuggest[i] = this.sampleSuggest[i].substring(0,this.sampleSuggest[i].indexOf(" "))
            }
            this.apname=response.data.mode_tip
            this.mode_url=response.data.mode_url
            this.mode_idtx=response.data.mode_idtx
            this.mode_idtx1=response.data.mode_idtx1
            this.mode_idtx2=response.data.mode_idtx2
            this.mode_stridx=response.data.mode_stridx
            this.mode_prompt=response.data.mode_prompt
            this.suggestShow = true;
          })
          .catch(e => {
            console.log(e);
          });
      },

      close () {
        if((!this.editedItem.device_name && !this.editedItem.serial_number) || this.isSave){
        this.serialRules.splice(3, 1)
        this.$refs.form.resetValidation()
        this.valid = false;
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedItem.parent = this.group_list[0]
          this.editedIndex = -1
          this.isSave = false
        })
        }
        else this.dialogCancel = true;
      },

      cancelClose () {
        this.dialogCancel = false;
      },

      Multi_closeDelete () {
        this.Multi_dialogDelete = false
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.device[this.editedIndex], this.editedItem)
          console.log(this.editedItem)
            http
              .put("/updatedevice/" + this.editedItem.id, this.editedItem)
              .then(response => {
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
              this.close()
          if(this.parent_watcher!=this.editedItem.parent){
            http
                .get("/MoveDeviceGroup/"+this.editedItem.serial_number)
                .then(response => {
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
          }

        } else {
          this.device.push(this.editedItem)
            http
                .post("/adddevice", this.editedItem)
                .then(response => {
                this.device[this.device.length-1].id = response.data.id;
                console.log(this.editedItem);
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