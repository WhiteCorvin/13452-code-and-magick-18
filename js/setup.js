'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;

  var counts = {
    coatColor: 2,
    eyesColor: 1,
    fireballColor: 1
  };

  var userNameInputElement = document.querySelector('.setup-user-name');

  var userCoatElement = document.querySelector('.wizard-coat');
  var userCoatInputElement = document.querySelector('[name = "coat-color"]');
  var userEyesElement = document.querySelector('.wizard-eyes');
  var userEyesInputElement = document.querySelector('[name = "eyes-color"]');
  var userFireballElement = document.querySelector('.setup-fireball');
  var userFireballInputElement = document.querySelector('[name = "fireball-color"]');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizards = function (number) {
    var listOfWizards = [];

    for (var i = 0; i < number; i++) {
      listOfWizards.push({
        name: window.util.getRandomData(NAMES) + ' ' + window.util.getRandomData(SURNAMES),
        coatColor: window.util.getRandomData(COAT_COLORS),
        eyesColor: window.util.getRandomData(EYES_COLORS)
      });
    }

    return listOfWizards;
  };

  var renderWizard = function (wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

    return wizardElement;
  };

  var addRenderWizards = function (wizardList) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizardList.length; i++) {
      var wizardItem = renderWizard(wizardList[i]);
      fragment.appendChild(wizardItem);
    }

    similarListElement.appendChild(fragment);
  };

  var showSimilarList = function () {
    document.querySelector('.setup-similar').classList.remove(window.HIDDEN_CLASS);
  };

  var addUserDialogElementValidation = function () {
    userNameInputElement.addEventListener('invalid', function () {

      if (userNameInputElement.validity.tooShort) {
        userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInputElement.validity.tooLong) {
        userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (userNameInputElement.validity.valueMissing) {
        userNameInputElement.setCustomValidity('Обязательное поле');
      } else {
        userNameInputElement.setCustomValidity('');
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

  var init = function () {
    showSimilarList();
    var wizards = generateWizards(NUMBER_OF_WIZARDS);
    addRenderWizards(wizards);
    addUserDialogElementValidation();
    addUserChangeColorListener();
  };

  init();

  window.userNameInputElement = userNameInputElement;
})();
