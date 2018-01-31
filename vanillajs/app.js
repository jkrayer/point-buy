(function() {

  var calculate = (function(totalFields) {
    return function(mods, baseScores) {
      for (var i = 0; i < 6; i++) {
        totalFields[i].innerText = mods[i] + parseInt(baseScores[i].dataset.score, 10);
      }
    }
  }(document.getElementsByClassName('total')));

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

  function handleLoad(theSelect) {
    theSelect.selectedIndex = 0;
  }

  // Attach events
  (function() {
    var app = document.getElementById('app');
    var raceSelect = document.getElementById('select-race');
    var modFields = document.getElementsByClassName('mod');
    var baseScores = document.querySelectorAll('[data-score]');

    window.addEventListener('load', handleLoad.bind(null, raceSelect));

    raceSelect.addEventListener('change', function(event) {
      handleRaceChange.call(event.target, modFields);
      calculate(JSON.parse(event.target.value), baseScores);
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
      calculate(JSON.parse(raceSelect.value), baseScores);
    });
  }());
}());
