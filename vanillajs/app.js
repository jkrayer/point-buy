
/**
 * calculate and show final scores
 * @param  {HTMLCollection} fields elements tha show the calculated value
 * @return {Function}              actual calculation
 */
var calculate = (function(fields) {
  return function(raceMods) {
    raceMods.forEach(function(mod, ind) {
      fields[ind].innerText = parseInt(mod, 10) + 8;
    });
  }
}(document.getElementsByClassName('total')));


/**
 * Handle Change event for the race select element
 * @param  {HTMLCollection} modFields elements that show the modifier
 * @return {Function}                 event handler
 */
var handleRaceChange = (function (modFields) {
  return function() {
    var raceMods = JSON.parse(this.value);

    raceMods.forEach(function(mod, ind) {
      modFields[ind].innerText = mod;
    });

    calculate(raceMods, null, null);
  }
}(document.getElementsByClassName('mod')));


// Attach events
(function() {
  var raceSelect = document.getElementById('select-race');

  raceSelect.addEventListener('change', handleRaceChange);
}());
