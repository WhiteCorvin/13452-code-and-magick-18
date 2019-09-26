'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var countCoatColor = 1;
var countEyesColor = 1;
var countFireballColor = 1;

var userDialogElement = document.querySelector('.setup');
var userDialogElementOpen = document.querySelector('.setup-open');
var userDialogElementClose = document.querySelector('.setup-close');

var userNameInput = document.querySelector('.setup-user-name');
var userCoat = document.querySelector('.wizard-coat');
var userCoatInput = document.querySelector('[name = "coat-color"]');
var userEyes = document.querySelector('.wizard-eyes');
var userEyesInput = document.querySelector('[name = "eyes-color"]');
var userFireball = document.querySelector('.setup-fireball');
var userFireballInput = document.querySelector('[name = "fireball-color"]');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  userDialogElement.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialogElement.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

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

var init = function () {
  showSimilarList();
  var wizards = generateWizards(NUMBER_OF_WIZARDS);
  addRenderWizards(wizards);
};

init();

userDialogElementOpen.addEventListener('click', function () {
  openPopup();
});

userDialogElementOpen.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }

});

userDialogElementClose.addEventListener('click', function () {
  closePopup();
});

userDialogElementClose.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }

});

userNameInput.addEventListener('invalid', function () {

  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }

});

userCoat.addEventListener('click', function () {
  var colorCoat = getColor(COAT_COLORS, countCoatColor);

  userCoat.style.fill = colorCoat;
  userCoatInput.value = colorCoat;

  if (countCoatColor === (COAT_COLORS.length - 1)) {
    countCoatColor = 0;
  } else {
    countCoatColor++;
  }

});

userEyes.addEventListener('click', function () {
  var colorEyes = getColor(EYES_COLORS, countEyesColor);

  userEyes.style.fill = colorEyes;
  userEyesInput.value = colorEyes;

  if (countEyesColor === (COAT_COLORS.length - 1)) {
    countEyesColor = 0;
  } else {
    countEyesColor++;
  }

});

userFireball.addEventListener('click', function () {
  var colorFireball = getColor(FIREBALL_COLORS, countFireballColor);

  userFireball.style.backgroundColor = colorFireball;
  userFireballInput.value = colorFireball;

  if (countFireballColor === (COAT_COLORS.length - 1)) {
    countFireballColor = 0;
  } else {
    countFireballColor++;
  }

});
