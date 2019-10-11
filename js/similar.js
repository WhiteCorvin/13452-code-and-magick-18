'use strict';

(function () {

  var loadedWizards = [];
  var coatColor = window.variables.userCoatInputElement.value;
  var eyesColor = window.variables.userEyesInputElement.value;


  var showSimilarList = function () {
    document.querySelector('.setup-similar').classList.remove(window.variables.HIDDEN_CLASS);
  };

  var getRank = function (loadedWizard) {
    var rank = 0;

    if (loadedWizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (loadedWizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var updateWizards = function () {
    var sortLoadedWizards = loadedWizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    window.util.addRenderWizards(sortLoadedWizards);
  };

  var onLoadSuccess = function (data) {
    loadedWizards = data;
    window.util.addRenderWizards(loadedWizards);
    window.util.deleteErrorElement();

  };

  var init = function () {
    showSimilarList();
    window.backend.load(onLoadSuccess, window.util.onConnectError);
  };

  init();

  window.similar = {
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange
  };

})();
