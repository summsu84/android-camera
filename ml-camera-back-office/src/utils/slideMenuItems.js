module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION',
  },
  {
    type: 'tree',
    icon: 'fa fa-dashboard',
    name: 'Dashboard',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '헬로화면',
        router: {
          name: 'Hello',
        },
      },
    ],
  },
];
