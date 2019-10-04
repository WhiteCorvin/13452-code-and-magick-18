'use strict';

(function () {

  var HIDDEN_CLASS = 'hidden';

  var userNameInputElement = document.querySelector('.setup-user-name');
  var userDialogElement = document.querySelector('.setup');

  window.variables = {
    HIDDEN_CLASS: HIDDEN_CLASS,
    userDialogElement: userDialogElement,
    userNameInputElement: userNameInputElement
  };

})();
