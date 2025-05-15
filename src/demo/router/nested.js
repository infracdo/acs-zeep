/** When your routing table is too long, you can split it into small modules */

import Layout from '@/views/layout/TheLayout.vue';
import Nasted from '@/views/components/Nasted.vue';

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: 'noredirect',
  name: 'NestedMenu',
  meta: {
    title: 'Configuration',
    icon: 'mdi-file-tree',
  },
  children: [
    {
      path: 'addconfig',
      component: Nasted,
      name: 'addconfig',
      meta: {
        title: 'Add SSID', icon: 'looks_two', noCache: true, affix: true,
      },
    },
    {
      path: 'editconfig',
      component: Nasted,
      name: 'editconfig',
      meta: {
        title: 'Edit SSID', icon: 'looks_two', noCache: true, affix: true,
      },
    },
  ],
};

export default nestedRouter;
