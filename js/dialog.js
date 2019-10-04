'use strict';

(function () {

  var userDialogOpenElement = document.querySelector('.setup-open');
  var userDialogCloseElement = document.querySelector('.setup-close');
  var uploadElement = document.querySelector('.upload');

  var resetPositionUserDialogElement = function () {
    window.variables.userDialogElement.style.top = '';
    window.variables.userDialogElement.style.left = '';
  };

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== window.userNameInputElement) {
      window.util.doActionIfEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    window.variables.userDialogElement.classList.remove(window.variables.HIDDEN_CLASS);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.variables.userDialogElement.classList.add(window.variables.HIDDEN_CLASS);
    resetPositionUserDialogElement();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addMoveUserDialogElementListener = function () {
    uploadElement.addEventListener('mousedown', function (evt) {
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

        window.variables.userDialogElement.style.top = (window.variables.userDialogElement.offsetTop - shift.y) + 'px';
        window.variables.userDialogElement.style.left = (window.variables.userDialogElement.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragger) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            uploadElement.removeEventListener('click', onClickPreventDefault);
          };
          uploadElement.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var addUserDialogElementListener = function () {
    userDialogOpenElement.addEventListener('click', function () {
      openPopup();
    });

    userDialogOpenElement.addEventListener('keydown', function (evt) {
      window.util.doActionIfEnterEvent(evt, openPopup);
    });

    userDialogCloseElement.addEventListener('click', function () {
      closePopup();
    });

    userDialogCloseElement.addEventListener('keydown', function (evt) {
      window.util.doActionIfEnterEvent(evt, closePopup);
    });

  };

  var init = function () {
    addUserDialogElementListener();
    addMoveUserDialogElementListener();
  };

  init();

})();
