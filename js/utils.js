'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    doActionIfEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    doActionIfEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomData: function (arr) {
      var position = window.util.getRandomInt(arr.length);
      return arr[position];
    },
    getRandomInt: function (max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    getColor: function (arr, position) {
      return arr[position];
    },
    getColorForObject: function (object, array, count, input) {
      var colorObject = window.util.getColor(array, count);

      object.style.fill = colorObject;
      input.value = colorObject;

      if (count === (array.length - 1)) {
        count = 0;
      } else {
        count++;
      }
      return count;
    },
    getBackgorundColorForObject: function (object, array, count, input) {
      var colorObject = window.util.getColor(array, count);

      object.style.backgroundColor = colorObject;
      input.value = colorObject;

      if (count === (array.length - 1)) {
        count = 0;
      } else {
        count++;
      }
      return count;
    },
    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    }
  };

})();
