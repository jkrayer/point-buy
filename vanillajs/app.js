(function() {
  var mods = [0, 0, 0, 0, 0, 0];

  // Interface for dealing with point costs
  var pointTally = (function() {
    var max = 27;
    var pool = max;
    var costTable = new Map([[8, 0], [9, 1], [10, 2], [11, 3], [12, 4], [13, 5],[ 14, 7], [15, 9]]);

    return {
      getRemainder: function() {
        return pool;
      },
      checkScore: function(oldScore, newScore) {
        var difference = costTable.get(oldScore) - costTable.get(newScore);
        var newPool = pool + difference;

        if (newPool > max || newPool < 0 || isNaN(newPool)) {
          return false;
        }

        pool = newPool;
        return newScore;
      },
      reset: function() {
        return pool = max;
      }
    };
  }());

  // Put the total scores in the dom
  var totalScores = (function(totalFields, baseScores) {
    return function() {
      for (var i = 0; i < 6; i++) {
        totalFields[i].innerText = mods[i] + parseInt(baseScores[i].dataset.score, 10);
      }
    }
  }(document.getElementsByClassName('total'), document.querySelectorAll('tbody [data-score]')));

  // Handle race change select menu
  var handleRaceChange = (function(modFields) {
    return function() {
      var raceMods = JSON.parse(this.value);
      var race = this.selectedOptions[0].innerText;

      raceMods.forEach(function(mod, ind) {
        var input;

        if (race === 'Variant Human') {
          input = document.createElement('INPUT');
          input.type = "checkbox";
          input.className="variant-human";
          modFields[ind].innerText = '';
          modFields[ind].append(input);
        } else {
          modFields[ind].innerText = mod;
        }
      });
    }
  }(document.getElementsByClassName('mod')));

  // Add button handler
  function handleAdd() {
    var dataset = this.parentElement.previousElementSibling.dataset;
    var score = parseInt(dataset.score, 10);
    return dataset.score = pointTally.checkScore(score, score + 1) || score;
  }

  // Subtract button handler
  function handleSubtract() {
    var dataset = this.parentElement.previousElementSibling.dataset;
    var score = parseInt(dataset.score, 10);

    return dataset.score = pointTally.checkScore(score, score - 1) || score;
  }

  // Reset button handler
  function handleReset() {
    var dataset = this.parentElement.previousElementSibling.dataset;
    var score = parseInt(dataset.score, 10);

    return dataset.score = pointTally.checkScore(score, 8);
  }

  // Rests vals on refresh
  function handleLoad(theSelect) {
    theSelect.selectedIndex = 0;
  }

  // Attach events
  (function() {
    var app = document.getElementById('app');
    var raceSelect = document.getElementById('select-race');
    var remainingPoints = document.getElementById('remaining-points');
    var checkboxes = document.getElementsByClassName('variant-human');

    var getChecked = Array.prototype.filter.bind(checkboxes, function(el) {
      return el.checked;
    });
    var getArrayOfChecks = Array.prototype.map.bind(checkboxes, function(el) {
      return el.checked ? 1 : 0;
    });

    window.addEventListener('load', handleLoad.bind(null, raceSelect));

    app.addEventListener('click', function(event) {
      switch(event.target.className) {
        case 'add':
          handleAdd.call(event.target, event);
        break;
        case 'subtract':
          handleSubtract.call(event.target, event);
        break;
        case 'reset':
          handleReset.call(event.target, event);
        break;
        default:
        break;
      }
      totalScores();
      remainingPoints.dataset.score = pointTally.getRemainder();
    });

    app.addEventListener('change', function(event) {
      switch (event.target.type) {
        case 'select-one':
          handleRaceChange.call(event.target);
          mods = JSON.parse(event.target.value);
          totalScores();
        break;
        case 'checkbox':
          if (getChecked().length === 3) {
            event.target.checked = false;
          }
          mods = getArrayOfChecks();
          totalScores();
        break;
        default:
        break;
      }
    });
  }());
}());
