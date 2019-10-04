'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var counts = {
    coatColor: 2,
    eyesColor: 1,
    fireballColor: 1
  };

  var formUserDialgoElement = document.querySelector('.setup-wizard-form');

  var userCoatElement = document.querySelector('.wizard-coat');
  var userCoatInputElement = document.querySelector('[name = "coat-color"]');
  var userEyesElement = document.querySelector('.wizard-eyes');
  var userEyesInputElement = document.querySelector('[name = "eyes-color"]');
  var userFireballElement = document.querySelector('.setup-fireball');
  var userFireballInputElement = document.querySelector('[name = "fireball-color"]');

  var showSimilarList = function () {
    document.querySelector('.setup-similar').classList.remove(window.variables.HIDDEN_CLASS);
  };

  var addUserDialogElementValidation = function () {
    window.variables.userNameInputElement.addEventListener('invalid', function () {

      if (window.variables.userNameInputElement.validity.tooShort) {
        window.variables.userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (window.variables.userNameInputElement.validity.tooLong) {
        window.variables.userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (window.variables.userNameInputElement.validity.valueMissing) {
        window.variables.userNameInputElement.setCustomValidity('Обязательное поле');
      } else {
        window.variables.userNameInputElement.setCustomValidity('');
      }

    });
  };

  var addUserChangeColorListener = function () {
    userCoatElement.addEventListener('click', function () {
      counts.coatColor = window.util.getColorForObject(userCoatElement, COAT_COLORS, counts.coatColor, userCoatInputElement);
    });

    userEyesElement.addEventListener('click', function () {
      counts.eyesColor = window.util.getColorForObject(userEyesElement, EYES_COLORS, counts.eyesColor, userEyesInputElement);
    });

    userFireballElement.addEventListener('click', function () {
      counts.fireballColor = window.util.getBackgorundColorForObject(userFireballElement, FIREBALL_COLORS, counts.fireballColor, userFireballInputElement);

    });
  };

  var deleteErrorElement = function () {
    var errorMessage = document.querySelector('.error-message');

    if (errorMessage) {
      errorMessage.remove();
    }
  };

  var onLoadSuccess = function (data) {
    var randomWizards = window.util.getRandomWizards(data);
    deleteErrorElement();

    window.util.addRenderWizards(randomWizards);
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

  var onSaveSuccess = function () {
    deleteErrorElement();
    window.variables.userDialogElement.classList.add(window.variables.HIDDEN_CLASS);
  };

  var init = function () {
    showSimilarList();
    addUserDialogElementValidation();
    addUserChangeColorListener();

    window.backend.load(onLoadSuccess, onConnectError);

    formUserDialgoElement.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(formUserDialgoElement), onSaveSuccess, onConnectError);
      evt.preventDefault();
    });
  };

  init();

})();
