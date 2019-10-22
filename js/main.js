'use strict';

// create-ads
var mapBlock = document.querySelector('.map');

var ADS_NUMBERS = 8;
var PIN_WIDTH = 1200;
var PIN_HEIGHT = 704;
var ADS_TITLE = 'Заголовок';

var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_CHECK = ['12:00', '13:00', '14:00'];
var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarListElement = document.querySelector('.map__pins');
var similarAdTemplate = document.querySelector('#pin')
	.content
	.querySelector('.map__pin');
// create-ads

// status-page
var mapPinMain = mapBlock.querySelector('.map__pin--main');
var noticeBlockForm = document.querySelector('.notice');
var noticeBlockFieldsets = noticeBlockForm.querySelectorAll('fieldset');
var mapFiltersForm = document.querySelector('.map__filters');
var mapFiltersSelects = mapFiltersForm.querySelectorAll('select');
var mapFiltersField = mapFiltersForm.querySelectorAll('fieldset');

var selectRooms = document.querySelector('#room_number');
var selectGuests = document.querySelector('#capacity');

var ENTER_KEYCODE = 13;

var activeStatusPage = function () {
  mapBlock.classList.remove('map--faded');

  noticeBlockForm.querySelector('.ad-form').classList.remove('ad-form--disabled');

  removeAttribute(noticeBlockFieldsets, 'disabled');

  removeAttribute(mapFiltersSelects, 'disabled');
  removeAttribute(mapFiltersField, 'disabled');
};
// status-page

// status-page
function removeAttribute(element, name) {
  for (var i = 0; i < element.length; i++) {
    // remove-attribute-function
    element[i].removeAttribute(name);
  }
}

mapPinMain.addEventListener('mousedown', activeStatusPage);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activeStatusPage();
  }
});

selectRooms.addEventListener('invalid', function (evt) {
  if (selectRooms.options[selectRooms.selectedIndex].value !== selectGuests.options[selectGuests.selectedIndex].value) {
    selectRooms.setCustomValidity('Кол-во гостей и кол-во кмнат должны совпадать');
  } else {
    selectRooms.setCustomValidity('');
  }
});
// status-page

// create-ads
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
      'avatar': 'img/avatars/user0' + (counter + 1) + ' .png',
    },

    'offer': {
      'title': ADS_TITLE,
      'address': locationX + ' ' + locationY,
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
  offerElement.src = 'img/avatars/user0' + (counter + 1) + ' .png';
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
// create-ads
