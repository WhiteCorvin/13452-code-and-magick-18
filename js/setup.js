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
  var userEyesElement = document.querySelector('.wizard-eyes');
  var userFireballElement = document.querySelector('.setup-fireball');
  var userFireballInputElement = document.querySelector('[name = "fireball-color"]');

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
  var getWizardOutfitListener = function (outfit, outfitColors, countColors, outfitInput, changeFunction) {
    outfit.addEventListener('click', function () {
      var colorObj = window.util.getColorForObject(outfit, outfitColors, countColors, outfitInput);
      countColors = colorObj.count;

      changeFunction(colorObj.color);
    });
  };

  var addUserChangeColorListener = function () {
    getWizardOutfitListener(userCoatElement, COAT_COLORS, counts.coatColor, window.variables.userCoatInputElement, window.similar.onCoatChange);
    getWizardOutfitListener(userEyesElement, EYES_COLORS, counts.eyesColor, window.variables.userEyesInputElement, window.similar.onEyesChange);

    userFireballElement.addEventListener('click', function () {
      counts.fireballColor = window.util.getBackgorundColorForObject(userFireballElement, FIREBALL_COLORS, counts.fireballColor, userFireballInputElement);
    });
  };

  var onSaveSuccess = function () {
    window.util.deleteErrorElement();
    window.variables.userDialogElement.classList.add(window.variables.HIDDEN_CLASS);
  };

  var init = function () {

    addUserDialogElementValidation();
    addUserChangeColorListener();

    formUserDialgoElement.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(formUserDialgoElement), onSaveSuccess, window.util.onConnectError);
      evt.preventDefault();
    });
  };

  init();

})();
