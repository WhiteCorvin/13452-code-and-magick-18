'use strict';

(function () {
  var userDialogElement = document.querySelector('.setup');
  var userDialogElementOpen = document.querySelector('.setup-open');
  var userDialogElementClose = document.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== window.userNameInputElement) {
      window.util.isEscEvent(evt, closePopup);
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

  var addUserDialogElementListener = function () {
    userDialogElementOpen.addEventListener('click', function () {
      openPopup();
    });

    userDialogElementOpen.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openPopup);
    });

    userDialogElementClose.addEventListener('click', function () {
      closePopup();
    });

    userDialogElementClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
  };
  addUserDialogElementListener();
})();
