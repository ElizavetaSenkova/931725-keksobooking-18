'use strict';

var ADS_NUMBERS = 8;
var LOCATION_X = 600;
var LOCATION_Y = 350;
var PIN_WIDTH = 1200;
var PIN_HEIGHT = 704;
var ADS_TITLE = "Заголовок";

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

function getRandomNum(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// массив строк случайной длины
function getValues(target) {

  var result = [];
  var count = getRandomNum(1, target.length);

  for (var i = 0; i < count; i++) {

    var index = getRandomNum(i, target.length - 1);
    var tmp = target[index];

    tmp = target[i];

    result.push(tmp);

  }

  return result;

}

function createOffer(counter) {

  var locationX = getRandomNum(similarListElement.offsetLeft, similarListElement.offsetWidth + similarListElement.offsetLeft);
  var locationY = getRandomNum(130, 630);
  var check = getRandomNum(0, ADS_CHECK.length - 1);

  return {
    'author': {
      'avatar': 'img/avatars/user0'+ (counter + 1) +' .png',
    },

    'offer': {
      'title': ADS_TITLE,
      'address': locationX, locationY,
      'price': getRandomNum(1000, 5000),
      'type': ADS_TYPE[getRandomNum(0, ADS_TYPE.length - 1)],
      'rooms': getRandomNum(1, 5),
      'guests': getRandomNum(1, 5),
      'checkin': check,
      'checkout': check,
      'features': getValues(ADS_FEATURES),
      'description': 'строка-с-описанием',
      'photos': getValues(ADS_PHOTOS),
    },

    'location': {
      'x': locationX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка
      'y': locationY,
    }
  };
}

function createOffersList(count) {

  var list = [];

  for (var i = 0; i < count; i++) {

    var offer = createOffer(i);


    list.push(offer);

  }

  return list;

}

function createOfferNode(offerData, counter) {
  var offerElement = similarAdTemplate.cloneNode(true);

    offerElement.style.left = offerData.locationX - PIN_WIDTH / 2 + 'px';
    offerElement.style.top = offerData.locationY - PIN_HEIGHT + 'px';
    offerElement.src = 'img/avatars/user0'+ (counter + 1) +' .png';
    offerElement.alt = ADS_TITLE;

    return offerElement;
}

function renderOffers(offers) {

  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer, i) {

    var offerNode = createOfferNode(offer, i);
    fragment.appendChild(offerNode);
  });

  similarListElement.appendChild(fragment);

}

var offers = createOffersList(ADS_NUMBERS);
renderOffers(offers);
