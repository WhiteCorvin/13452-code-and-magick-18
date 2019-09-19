'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var userDialogElement = document.querySelector('.setup');
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

var showUserDialog = function () {
  userDialogElement.classList.remove('hidden');
};

var showSimilarList = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var init = function () {
  showUserDialog();
  showSimilarList();
  var wizards = generateWizards(NUMBER_OF_WIZARDS);
  addRenderWizards(wizards);
};

init();

