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

  raceSelect.addEventListener('change', handleRaceChange);


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
