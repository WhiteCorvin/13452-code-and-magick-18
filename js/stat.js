'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 40;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';

  ctx.font = '16px PT Mono';
  ctx.textBaseLine = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);
  ctx.fillText('Список результатов', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 3);

  var maxTime = getMaxElement(times);

  var getBarHeight = function (time) {
    return (MAX_BAR_HEIGHT * time) / maxTime;
  };

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (TEXT_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (TEXT_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP - getBarHeight(times[i]) - GAP - FONT_GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = PLAYER_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomInt(100) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP - GAP - getBarHeight(times[i]), BAR_WIDTH, getBarHeight(times[i]));

  }
};
