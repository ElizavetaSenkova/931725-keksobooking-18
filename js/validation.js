'use strict';

(function () {

  window.adForm.rooms.addEventListener('change', function (evt) {
    // console.log(evt.target.value);

    if (evt.target.value !== window.adForm.capacity.value) {
      window.adForm.capacity.value = evt.target.value;
    }
  });

  window.adForm.capacity.addEventListener('change', function (evt) {
    // console.log(evt.target.value);

    if (evt.target.value !== window.adForm.rooms.value) {
      window.adForm.rooms.value = evt.target.value;
    }
  });

})();
