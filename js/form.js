import { sendData } from './api.js';
import { showMessageSuccess, showMessageError, openMessageModal } from './show-message.js';
import { returnMarker, latCoordinates, lngCoordinates, map } from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = document.querySelector('.ad-form__advert');
const typeHousing = document.querySelector('#type');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 1000000;
const MIN_PRICE = 1000;
const priceInput = document.querySelector('#price');
const selectRoomsElem = document.querySelector('#room_number');
const selectCapacityElem = document.querySelector('#capacity');
const capacityItem = selectCapacityElem.querySelectorAll('option');
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
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_SRC_AVATAR = 'img/muffin-grey.svg';

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

    if (priceInput.value > MAX_PRICE) {
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

const checkGuestsCapacity = () => {
  capacityItem[3].setAttribute('disabled', true);
  capacityItem[0].setAttribute('disabled', true);

  selectRoomsElem.addEventListener('change', () => {

    if (selectRoomsElem.value === '1') {
      capacityItem[0].setAttribute('disabled', true);
      capacityItem[2].removeAttribute('disabled');
      capacityItem[3].setAttribute('disabled', true);
      selectCapacityElem.value = '1';
    } else if (selectRoomsElem.value === '2') {
      capacityItem[0].setAttribute('disabled', true);
      capacityItem[1].removeAttribute('disabled');
      capacityItem[2].removeAttribute('disabled');
      capacityItem[3].setAttribute('disabled', true);
      selectCapacityElem.value = '2';
    } else if (selectRoomsElem.value === '3') {
      capacityItem[0].removeAttribute('disabled');
      capacityItem[1].removeAttribute('disabled');
      capacityItem[2].removeAttribute('disabled');
      capacityItem[3].setAttribute('disabled', true);
      selectCapacityElem.value = '3';
    } else if (selectRoomsElem.value === '100') {
      capacityItem[0].setAttribute('disabled', true);
      capacityItem[1].setAttribute('disabled', true);
      capacityItem[2].setAttribute('disabled', true);
      capacityItem[3].removeAttribute('disabled');
      selectCapacityElem.value = '0';
    }
  });
};

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

function setMinHousingPrice(price) {
  priceInput.min = price;
  priceInput.placeholder = price;
}

// Устанавливает минимальную цену по типу жилья

const checkTypeHousing = () => {
  typeHousing.addEventListener('change', (evt) => {
    setMinHousingPrice(minPrice[evt.target.value]);
  });
};

// Очистка формы при успешной отправке

const clearForm = () => {
  adForm.reset();
  formFilters.reset();
  returnMarker();
  inputAddress.value = `Latitude ${latCoordinates}, Longitude ${lngCoordinates}`;
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
      imageElement.style.width = '70px';
      imageElement.style.height = '100%';
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
        clearForm();
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

// Кнопка очистки формы

clearFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
  map.closePopup();

  const photoHousingElement = photoHousingLoadElement.querySelector('img');
  if (photoHousingElement) {
    photoHousingLoadElement.removeChild(photoHousingElement);
  }

  avatarLoadElement.src = DEFAULT_SRC_AVATAR;
});

// Валидация формы

const checkValidationForm = () => {
  checkTitleInput();
  checkPriceInput();
  checkGuestsCapacity();
  checkTimeInOut();
  checkTypeHousing();
};

export { removeDisabled, setUserFormSubmit, inputAddress, addMainFormDisabled, addLoadFiles, addMapFiltersDisabled, checkValidationForm };
