'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
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
    var emptyObject = {};
    listOfWizards.push(emptyObject);
    listOfWizards[i].name = getRandomData(NAMES) + ' ' + getRandomData(SURNAMES);
    listOfWizards[i].coatColor = getRandomData(COAT_COLORS);
    listOfWizards[i].eyesColor = getRandomData(EYES_COLORS);
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

  for (var i = 0; i < wizardList.length; i++) {
    var wizardItem = renderWizard(wizardList[i]);
    similarListElement.appendChild(wizardItem);
  }

};

var showUserDialog = function () {
  userDialog.classList.remove('hidden');
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

