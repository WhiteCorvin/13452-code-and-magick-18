'use strict';

(function () {
  var userDialogElement = document.querySelector('.setup');
  var userDialogElementOpen = document.querySelector('.setup-open');
  var userDialogElementClose = document.querySelector('.setup-close');
  var userAvatarElement = document.querySelector('.upload');

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

  var addMoveUserDialogElementListener = function () {
    userAvatarElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragger = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragger = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        userDialogElement.style.top = (userDialogElement.offsetTop - shift.y) + 'px';
        userDialogElement.style.left = (userDialogElement.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragger) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            userAvatarElement.removeEventListener('click', onClickPreventDefault);
          };
          userAvatarElement.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
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

  var init = function () {
    addUserDialogElementListener();
    addMoveUserDialogElementListener();
  };

  init();
})();
