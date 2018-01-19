var modFields = document.getElementsByClassName('mod');
var calculate = (function(fields) {
  return function(raceMods) {
    raceMods.forEach(function(mod, ind) {
      fields[ind].innerText = parseInt(mod, 10) + 8;
    });
  }
}(document.getElementsByClassName('total')));

function handleRaceChange() {
  var raceMods = this.value.split(',');

  raceMods.forEach(function(mod, ind) {
    modFields[ind].innerText = mod;
  });

  calculate(raceMods, null, null);
}

// Attach events
(function() {
  var raceSelect = document.getElementById('select-race');

  raceSelect.addEventListener('change', handleRaceChange);
}());
