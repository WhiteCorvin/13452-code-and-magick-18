'use strict';

(function () {

  var HIDDEN_CLASS = 'hidden';

  var userNameInputElement = document.querySelector('.setup-user-name');
  var userDialogElement = document.querySelector('.setup');
  var userCoatInputElement = document.querySelector('[name = "coat-color"]');
  var userEyesInputElement = document.querySelector('[name = "eyes-color"]');

  window.variables = {
    HIDDEN_CLASS: HIDDEN_CLASS,
    userDialogElement: userDialogElement,
    userNameInputElement: userNameInputElement,
    userCoatInputElement: userCoatInputElement,
    userEyesInputElement: userEyesInputElement
  };

})();
