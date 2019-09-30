'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;

  var countCoatColor = 1;
  var countEyesColor = 1;
  var countFireballColor = 1;

  window.userNameInputElement = document.querySelector('.setup-user-name');

  var userCoatElement = document.querySelector('.wizard-coat');
  var userCoatInputElement = document.querySelector('[name = "coat-color"]');
  var userEyesElement = document.querySelector('.wizard-eyes');
  var userEyesInputElement = document.querySelector('[name = "eyes-color"]');
  var userFireballElement = document.querySelector('.setup-fireball');
  var userFireballInputElement = document.querySelector('[name = "fireball-color"]');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomData = function (arr) {
    var position = getRandomInt(arr.length);
    return arr[position];
  };

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var generateWizards = function (number) {
    var listOfWizards = [];

    for (var i = 0; i < number; i++) {
      listOfWizards.push({
        name: getRandomData(NAMES) + ' ' + getRandomData(SURNAMES),
        coatColor: getRandomData(COAT_COLORS),
        eyesColor: getRandomData(EYES_COLORS)
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
    document.querySelector('.setup-similar').classList.remove('hidden');
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
  };

  var addUserDialogElementValidation = function () {
    window.userNameInputElement.addEventListener('invalid', function () {

      if (window.userNameInputElement.validity.tooShort) {
        window.userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (window.userNameInputElement.validity.tooLong) {
        window.userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (window.userNameInputElement.validity.valueMissing) {
        window.userNameInputElement.setCustomValidity('Обязательное поле');
      } else {
        window.userNameInputElement.setCustomValidity('');
      }

    });
  };

  var addUserChangeColorListener = function () {
    userCoatElement.addEventListener('click', function () {
      getColorForObject(userCoatElement, COAT_COLORS, countCoatColor, userCoatInputElement);
    });

    userEyesElement.addEventListener('click', function () {
      getColorForObject(userEyesElement, EYES_COLORS, countEyesColor, userEyesInputElement);
    });

    userFireballElement.addEventListener('click', function () {
      getColorForObject(userFireballElement, FIREBALL_COLORS, countFireballColor, userFireballInputElement);

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
})();
