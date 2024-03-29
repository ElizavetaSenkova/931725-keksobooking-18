'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPinMain = mapBlock.querySelector('.map__pin--main');
  var mapFiltersForm = document.querySelector('.map__filters');

  var togglePage = function () {
    mapBlock.classList.remove('map--faded');

    window.adForm.classList.remove('ad-form--disabled');

    toggleFormStatus(false, mapFiltersForm);

    toggleFormStatus(false, window.adForm);
  };

  function toggleFormStatus(value, form) {
    var elements = form.elements;

    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = value;
    }

  }

  mapPinMain.addEventListener('mousedown', togglePage);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      togglePage();
    }
  });

  function getCoords() {
    return {
      x: parseInt((mapPinMain.style.left) + mapPinMain.offsetWidth / 2, 10),
      y: parseInt((mapPinMain.style.top) + mapPinMain.offsetHeight, 10),
    };
  }

  function setCoords(coords) {
    window.adForm.address.value = coords.x + ' ' + coords.y;
  }

  setCoords(getCoords());

})();
