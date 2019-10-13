'use strict';

var ADS_NUMBERS = 8;
var LOCATION_X = 600;
var LOCATION_Y = 350;

var ADS_IMAGE = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_CHECK = ['12:00', '13:00', '14:00'];
var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var similarAdTemplate = document.querySelector('#pin')
	.content
	.querySelector('.map__pin');

function randomLocationY(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function createAds() {

  return {
    "author": {
      "avatar": 'img/avatars/user '+ ADS_IMAGE +' .png',
    },

    "offer": {
      "title": 'заголовок предложения',
      "address": "location.x, location.y",
      "price": стоимость,
      "type": "ADS_TYPE",
      "rooms": количество-комнат,
      "guests": количество-гостей,
      "checkin": "ADS_CHECK",
      "checkout": "ADS_CHECK",
      "features": ADS_FEATURES, // массив строк случайной длины
      "description": "строка-с-описанием",
      "photos": ADS_PHOTOS, // массив строк случайной длины
    },

    "location": {
      "x": число, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка
      "y": randomLocationY(130, 630),
    }
  };
}

function createAdsList() {

  for (var i = 0; i < ADS_NUMBERS; i++) {
    var ad = createAds();

    var adElement = similarAdTemplate.cloneNode(true);


  }

}

createAdsList();
