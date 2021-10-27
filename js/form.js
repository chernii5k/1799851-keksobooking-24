const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = document.querySelector('.ad-form__advert');
const typeHouse = document.querySelector('#type');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 1000000;
const priceInput = document.querySelector('#price');
const selectRoomsElem = document.querySelector('#room_number');
const selectCapacityElem = document.querySelector('#capacity');
const capacityItem = selectCapacityElem.querySelectorAll('option');
const timeInElem = document.querySelector('#timein');
const timeOutElem = document.querySelector('#timeout');

// Заголовок объявления

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

// Максимальная цена

priceInput.addEventListener('input', () => {

  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  } else if (priceInput.value.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// Поле «Количество комнат» синхронизировано с полем «Количество гостей»

const checkGuestsCapacity = () => {
  if (selectRoomsElem.value === '1') {
    capacityItem[0].setAttribute('disabled', true);
    capacityItem[1].setAttribute('disabled', true);
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
};

selectRoomsElem.addEventListener('change', checkGuestsCapacity);

// Поля «Время заезда» и «Время выезда» синхронизированы

timeInElem.addEventListener('change', (evt) => {
  timeOutElem.value = evt.target.value;
});

timeOutElem.addEventListener('change', (evt) => {
  timeInElem.value = evt.target.value;
});

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»

const setMinHousingPrice = (price) => {
  priceInput.min = price;
  priceInput.placeholder = price;
};

typeHouse.addEventListener('change', (evt) => {
  setMinHousingPrice(minPrice[evt.target.value]);
});
