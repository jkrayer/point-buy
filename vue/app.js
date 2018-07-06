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
  str: { base: 8 },
  con: { base: 8 },
  dex: { base: 8 },
  int: { base: 8 },
  wis: { base: 8 },
  cha: { base: 8 }
};

Vue.component('v-button', {
  template: '<button type="button" v-on:click="$emit(\'click\')"><slot></slot></button>'
});

Vue.component('score-row', {
  props: {
    name: String,
    base: Number,
    modifier: Number,
    scorekey: String
  },
  template: '<tr> <th>{{ name }}</th> <td>{{ base + modifier }}</td> <td>{{ modifier }}</td> <td>{{ base }}</td> <td> <v-button v-on:click="$emit(\'add\')">+</v-button> <v-button v-on:click="$emit(\'subtract\')">-</v-button> <v-button v-on:click="$emit(\'reset\')">reset</v-button> </td> </tr>'
});

Vue.component('header-row', {
  props: {
    points: Number
  },
  template: '<tr> <th>Score</th> <th>Total</th> <th>Race</th> <th>Base</th> <td id="remaining-points" class="text-right">Points: {{ points }}</td> </tr>'
});

Vue.component('select-row', {
  template: '<tr> <td colspan="5" class="text-left"><slot></slot></td> </tr>'
});

Vue.component('v-tbody', {
  template: '<tbody><slot></slot></tbody>'
});

Vue.component('v-thead', {
  template: '<thead><slot></slot></thead>'
});

Vue.component('v-table', {
  template: '<table><slot></slot></table>'
});

var vm = new Vue({
  el: '#app',
  data: data,
  methods: {
    add: function(score) {
      data[score].base = this._checkScore(data[score].base, data[score].base + 1);
    },
    reset: function(score) {
      data[score].base = this._checkScore(data[score].base, 8);
    },
    subtract: function(score) {
      data[score].base = this._checkScore(data[score].base, data[score].base - 1);
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
