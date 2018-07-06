var costTable = new Map([[8, 0], [9, 1], [10, 2], [11, 3], [12, 4], [13, 5],[ 14, 7], [15, 9]]);

var data = {
  maxPoints: 27,
  currentPoints: 27,
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
  data: data,
  methods: {
    add: function(score) {
      data[score].base = this._checkScore(data[score].base, data[score].base + 1);
    },
    _checkScore: function(oldScore, newScore) {
      var difference = costTable.get(oldScore) - costTable.get(newScore);
      var newPool = data.currentPoints + difference;

      if (newPool > data.maxPoints || newPool < 0 || isNaN(newPool)) {
        return oldScore;
      }

      data.currentPoints = newPool;
      return newScore;
    },
  }
})
