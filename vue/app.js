var data = {
  selectedRace: [0,0,0,0,0,0],
  races: [
      {
          value: [0,0,0,0,0,0],
          text: 'Race'
      },
      {
          value: [0,2,0,0,1,0],
          text: 'Hill Dwarf'
      },
      {
          value: [2,2,0,0,0,0],
          text: 'Mountain Dwarf'
      },
      {
          value: [0,0,2,1,0,0],
          text: 'High Elf'
      },
      {
          value: [0,0,2,0,1,0],
          text: 'Wood Elf'
      },
      {
          value: [0,0,2,0,1,0],
          text: 'Wood Elf'
      },
      {
          value: [0,0,2,0,0,1],
          text: 'Lightfoot Halfling'
      },
      {
          value: [0,1,2,0,0,0],
          text: 'Stout Halfling'
      },
      {
          value: [1,1,1,1,1,1],
          text: 'Human'
      }
      // {
      //     value: [0,0,0,0,0,0],
      //     text: 'Variant Human'
      // }
  ],
  str: {
    base: 8
  },
  con: {
    base: 8
  },
  dex: {
    base: 8
  },
  int: {
    base: 8
  },
  wis: {
    base: 8
  },
  cha: {
    base: 8
  }
};

var vm = new Vue({
  el: '#app',
  data: data
})
