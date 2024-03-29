'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick/';

  var connect = function (onLoad, onError, data) {
    var url = LOAD_URL;
    var requestType = 'GET';

    if (data) {
      requestType = 'POST';
      url = SAVE_URL;
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(requestType, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    connect(onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    connect(onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
