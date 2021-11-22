import { sendData } from './api.js';
import { showMessageSuccess, showMessageError, openMessageModal } from './show-message.js';
import { returnMarker, LAT_COORDINATES, LNG_COORDINATES, map, markerGroup } from './map.js';
import { initMap } from './main.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = 1000;
const DEFAULT_INPUT_PRICE_VALUE = 1000;
const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const RoomToCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const IMAGE_ELEMENT_WIDTH = '70px';
const IMAGE_ELEMENT_HEIGHT = '100%';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_SRC_AVATAR = 'img/muffin-grey.svg';
const titleInput = document.querySelector('.ad-form__advert');
const typeHousing = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const room = document.querySelector('select[name="rooms"]');
const capacity = document.querySelector('select[name="capacity"]');
const timeInElem = document.querySelector('#timein');
const timeOutElem = document.querySelector('#timeout');
const adForm = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersFieldset = formFilters.querySelector('fieldset');
const mapFiltersSelects = formFilters.querySelectorAll('select');
const clearFormButton = adForm.querySelector('.ad-form__reset');
const inputAddress = document.getElementById('address');
const avatarFileChooser = document.querySelector('.ad-form__field input[type="file"]');
const avatarLoadElement = document.querySelector('.ad-form-header__preview img');
const photoHousingFileChooser = document.querySelector('.ad-form__upload input[type="file"]');
const photoHousingLoadElement = document.querySelector('.ad-form__photo');

// Состояния страницы (активное, неактивное)

const addFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');

  adFormFieldsets.forEach((item) => {
    item.setAttribute('disabled', true);
  });
};

const addMapFiltersDisabled = () => {
  formFilters.classList.add('map__filters--disabled');
  mapFiltersFieldset.setAttribute('disabled', true);

  mapFiltersSelects.forEach((select) => {
    select.setAttribute('disabled', true);
  });
};

const removeFormDisabled = () => {
  adForm.classList.remove('ad-form--disabled');

  adFormFieldsets.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

const removeMapFiltersDisabled = () => {
  formFilters.classList.remove('map__filters--disabled');
  mapFiltersFieldset.removeAttribute('disabled');

  mapFiltersSelects.forEach((select) => {
    select.removeAttribute('disabled');
  });
};

// Переход формы в неактивное состояние

const addMainFormDisabled = () => {
  addFormDisabled();
  addMapFiltersDisabled();
};

// Переход формы в активное состояние

const removeDisabled = () => {
  removeFormDisabled();
  removeMapFiltersDisabled();
};


// Заголовок объявления

const checkTitleInput = () => {
  titleInput.addEventListener('input', () => {

    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity(`Заголовок объявления должен состоять минимум из ${MIN_TITLE_LENGTH} симв.`);
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity(`Максимальная длинна заголовка ${MAX_TITLE_LENGTH} симв.`);
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });
};

// Максимальная цена

const checkPriceInput = () => {
  priceInput.addEventListener('input', () => {

    if (priceInput.min === '0') {
      priceInput.setCustomValidity('');
    } else if (priceInput.value > MAX_PRICE) {
      priceInput.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
    } else if (priceInput.value.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else if (priceInput.value < MIN_PRICE) {
      priceInput.setCustomValidity(`Минимальная цена ${MIN_PRICE}`);
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });
};

// Поле «Количество комнат» синхронизировано с полем «Количество гостей»

const onRoomChange = () => {

  for (let i = 0; i < capacity.children.length; i++) {
    const option = capacity.children[i];
    option.disabled = true;
    const capacityValues = RoomToCapacity[room.value];
    for (let j = 0; j < capacityValues.length; j++) {
      if (+option.value === capacityValues[j]) {
        option.disabled = false;
        option.selected = true;
      }
    }
  }
};
room.addEventListener('change', onRoomChange);

// Поля «Время заезда» и «Время выезда» синхронизированы

const checkTimeInOut = () => {
  timeInElem.addEventListener('change', (evt) => {
    timeOutElem.value = evt.target.value;
  });

  timeOutElem.addEventListener('change', (evt) => {
    timeInElem.value = evt.target.value;
  });
};

// Устанавливает минимальную цену при размещении объявления

const setMinHousingPrice = (price) => {
  priceInput.min = price;
  priceInput.placeholder = price;
};

// Устанавливает минимальную цену по типу жилья

const checkTypeHousing = () => {
  typeHousing.addEventListener('change', (evt) => {
    setMinHousingPrice(MinPrice[evt.target.value.toUpperCase()]);
  });
};

// Очистка формы при успешной отправке

const getClearForm = () => {
  adForm.reset();
  formFilters.reset();
  returnMarker();
  priceInput.min = DEFAULT_INPUT_PRICE_VALUE;
  priceInput.placeholder = DEFAULT_INPUT_PRICE_VALUE;
  inputAddress.value = `Latitude ${LAT_COORDINATES}, Longitude ${LNG_COORDINATES}`;
};

// Добавляет аватарку пользователя и фотографию жилья

const checkExtensions = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const addLoadFiles = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    const matches = checkExtensions(file);

    if (matches) {
      avatarLoadElement.src = URL.createObjectURL(file);
    }

  });

  photoHousingFileChooser.addEventListener('change', () => {
    const file = photoHousingFileChooser.files[0];
    const matches = checkExtensions(file);

    if (matches) {
      if (photoHousingLoadElement.querySelector('img')) {
        photoHousingLoadElement.querySelector('img').remove();
      }
      const imageElement = document.createElement('img');
      imageElement.src = URL.createObjectURL(file);
      imageElement.style.width = IMAGE_ELEMENT_WIDTH;
      imageElement.style.height = IMAGE_ELEMENT_HEIGHT;
      photoHousingLoadElement.appendChild(imageElement);
    }
  });
};

// Отправка формы на сервер

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        getClearForm();
        showMessageSuccess();
        openMessageModal();
        map.closePopup();
      },
      () => {
        showMessageError();
        openMessageModal();
      },
      new FormData(evt.target),
    );
  });
};

// Валидация формы

const checkValidationForm = () => {
  checkTitleInput();
  checkPriceInput();
  onRoomChange();
  checkTimeInOut();
  checkTypeHousing();
};


// Кнопка очистки формы

clearFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  getClearForm();
  map.closePopup();
  markerGroup.clearLayers();
  initMap();

  const photoHousingElement = photoHousingLoadElement.querySelector('img');
  if (photoHousingElement) {
    photoHousingLoadElement.removeChild(photoHousingElement);
  }

  avatarLoadElement.src = DEFAULT_SRC_AVATAR;
  checkValidationForm();
});

export { removeDisabled, setUserFormSubmit, inputAddress, addMainFormDisabled, addLoadFiles, addMapFiltersDisabled, checkValidationForm };
