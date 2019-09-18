'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomData = function (arr) {
  var position = getRandomInt(arr.length);
  return arr[position];
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var randomPlayers = [
  {
    name: getRandomData(NAMES) + ' ' + getRandomData(SURNAMES),
    coatColor: getRandomData(COAT_COLORS),
    eyesColor: getRandomData(EYES_COLORS)
  },
  {
    name: getRandomData(NAMES) + ' ' + getRandomData(SURNAMES),
    coatColor: getRandomData(COAT_COLORS),
    eyesColor: getRandomData(EYES_COLORS)
  },
  {
    name: getRandomData(NAMES) + ' ' + getRandomData(SURNAMES),
    coatColor: getRandomData(COAT_COLORS),
    eyesColor: getRandomData(EYES_COLORS)
  },
  {
    name: getRandomData(NAMES) + ' ' + getRandomData(SURNAMES),
    coatColor: getRandomData(COAT_COLORS),
    eyesColor: getRandomData(EYES_COLORS)
  },
];

var renderWizard = function (wizardData) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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

  return similarListElement;
};

addRenderWizards(randomPlayers);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');


