<template>
  <v-app-bar
    :dense="toolbarDense"
    fixed
    clipped-left
    app
    height="56px"
  >
    <v-app-bar-nav-icon
      class="button-hanged"
      @click.stop="toggleNavbar"
    >
      <v-icon x-large>
        mdi-menu
      </v-icon>
    </v-app-bar-nav-icon>
    <v-img
      src="/img/icons/ACSlogo.png"
      alt="Merchant Portal Logo"
      contain
      max-height="45"
      max-width="165"
    />
    <!-- <breadcrumbs /> -->
    <v-spacer />
    <!-- <v-text-field
      hide-details
      append-icon="mdi-magnify"
      single-line
      :style="{maxWidth: '400px'}"
    />
    <notification /> -->
    <profile />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
// import Breadcrumbs from '../widget/AppBreadcrumbs.vue';
// import ErrorLog from '../widget/AppErrorLog.vue';
// import FullScreen from '../widget/AppFullScreen.vue';
// import Localization from '../widget/AppLocalization.vue';
// import Notification from '../widget/AppNotification.vue';
import Profile from '../widget/AppProfile.vue';

export default {
  name: 'TheLayoutToolbar',
  components: {
    // Breadcrumbs,
    // ErrorLog,
    // FullScreen,
    // Localization,
    // Notification,
    Profile,
  },
  data: () => ({}),
  computed: {
    ...mapGetters([
      'toolbarDense',
      'navbarShow',
    ]),
    toggleNavbarIcon() {
      return this.navbarShow ? 'mdi-format-indent-decrease' : 'mdi-format-indent-increase';
    },
  },
  methods: {
    toggleNavbar() {
      this.$store.dispatch('NavbarToggle');
    },
  },
};
</script>

<style lang="scss">
  .theme--light.v-app-bar {
    background-color: #ffffff !important;

  }

  .button-hanged {
    position: absolute !important;
    top: 8px;
    left: 18px;
    z-index: 1;
  }
</style>
