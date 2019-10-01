'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var doActionIfEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var doActionIfEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var getRandomData = function (arr) {
    var position = getRandomInt(arr.length);
    return arr[position];
  };

  var getColor = function (arr, position) {
    return arr[position];
  };

  var getColorForObject = function (object, array, count, input) {
    var colorObject = getColor(array, count);

    object.style.fill = colorObject;
    input.value = colorObject;

    if (count === (array.length - 1)) {
      count = 0;
    } else {
      count++;
    }
    return count;
  };

  var getBackgorundColorForObject = function (object, array, count, input) {
    var colorObject = getColor(array, count);

    object.style.backgroundColor = colorObject;
    input.value = colorObject;

    if (count === (array.length - 1)) {
      count = 0;
    } else {
      count++;
    }
    return count;
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.util = {
    doActionIfEscEvent: doActionIfEscEvent,
    doActionIfEnterEvent: doActionIfEnterEvent,
    getRandomData: getRandomData,
    getColorForObject: getColorForObject,
    getBackgorundColorForObject: getBackgorundColorForObject,
    getMaxElement: getMaxElement
  };

})();
