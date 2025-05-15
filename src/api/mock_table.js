const headers = [
  {
    text: 'Devices',
    align: 'left',
    sortable: false,
    value: 'name',
  },
  { text: 'alias', value: 'alias' },
  { text: 'SN', value: 'SN' },
  { text: 'group', value: 'group' },
  { text: 'uptime', value: 'uptime' },
  { text: 'last reboot', value: 'last_reboot' },
];

const desserts = [
  {
    name: 'RG-AP520',
    alias: 'CDO_AP_F1',
    SN: 'GAU1579',
    group: 'CDO',
    uptime: '6 hrs 30 mins',
    last_reboot: '27-11-220 12:24',
  },
  {
    name: 'RG-AP520',
    alias: 'CDO_AP_F1',
    SN: 'G88F8H2',
    group: 'CDO',
    uptime: '3 hrs 29 mins',
    last_reboot: '27-11-220 03:23',
  },
  {
    name: 'RG-AP520',
    alias: 'CDO_AP_F2',
    SN: '1F0GJ1F0',
    group: 'CDO',
    uptime: '1 hrs 2 mins',
    last_reboot: '27-11-220 05:08',
  },
];

export {
  headers,
  desserts,
};
