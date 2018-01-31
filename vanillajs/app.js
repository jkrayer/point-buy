(function() {
  /**
   * calculate and show final scores
   * @param  {HTMLCollection} fields elements tha show the calculated value
   * @return {Function}              actual calculation
   */
  var calculate = (function(fields, baseScores) {
    return function(raceMods) {
      raceMods.forEach(function(mod, ind) {
        fields[ind].innerText = parseInt(mod, 10) + parseInt(baseScores[ind].dataset.score, 10);
      });
    }
  }(document.getElementsByClassName('total'), document.querySelectorAll('[data-score]')));

  function handleRaceChange(modFields) {
    var raceMods = JSON.parse(this.value);
    raceMods.forEach(function(mod, ind) {
      modFields[ind].innerText = mod;
    });
  }

  function inRange(num) {
    return num > 15 ? 15 : num < 8 ? 8 : num;
  }

  function handleAdd() {
    var dataset = this.parentElement.previousElementSibling.dataset;
    return dataset.score = inRange(parseInt(dataset.score, 10) + 1);
  }

  function handleSubtract() {
    var dataset = this.parentElement.previousElementSibling.dataset;
    return dataset.score = inRange(parseInt(dataset.score, 10) - 1);
  }

  function handleReset() {
    return this.parentElement.previousElementSibling.dataset.score = 8;
  }

  // Attach events
  (function() {
    var app = document.getElementById('app');
    var raceSelect = document.getElementById('select-race');
    var modFields = document.getElementsByClassName('mod');

    raceSelect.addEventListener('change', function(event) {
      handleRaceChange.call(event.target, modFields);
      // calculate();
    });

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
    });
  }());
}());
