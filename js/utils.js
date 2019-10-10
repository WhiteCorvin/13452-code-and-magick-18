'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var NUMBER_OF_WIZARDS = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
    return {color: colorObject, count: count};
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

  var renderWizard = function (wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  var addRenderWizards = function (wizardList) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    similarListElement.innerHTML = '';

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      var wizardItem = renderWizard(wizardList[i]);
      fragment.appendChild(wizardItem);
    }

    similarListElement.appendChild(fragment);
  };

  var onConnectError = function (errorMessage) {
    deleteErrorElement();

    var node = document.createElement('div');

    node.classList.add('error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var deleteErrorElement = function () {
    var errorMessage = document.querySelector('.error-message');

    if (errorMessage) {
      errorMessage.remove();
    }

  };

  window.util = {
    doActionIfEscEvent: doActionIfEscEvent,
    doActionIfEnterEvent: doActionIfEnterEvent,
    getRandomData: getRandomData,
    getColorForObject: getColorForObject,
    getBackgorundColorForObject: getBackgorundColorForObject,
    getMaxElement: getMaxElement,
    addRenderWizards: addRenderWizards,
    onConnectError: onConnectError,
    deleteErrorElement: deleteErrorElement
  };

})();
