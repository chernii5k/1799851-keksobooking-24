// Заголовок объявления

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = document.querySelector('.ad-form__advert');
const MAX_PRICE = 1000000;
const priceInput = document.getElementById('price');
const selectRoomsElem = document.querySelector('#room_number');
const selectCapacityElem = document.querySelector('#capacity');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Осталось еще ${MAX_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Максимальная цена

priceInput.addEventListener('input', () => {
  const valuePrice = priceInput.value;

  if (valuePrice > MAX_PRICE) {
    priceInput.setCustomValidity('Цена слишком высокая');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// Поле «Количество комнат» синхронизировано с полем «Количество гостей»

selectRoomsElem.addEventListener('change', () => {

  if (selectRoomsElem.value === '1') {
    selectCapacityElem[0].setAttribute('disabled', true);
    selectCapacityElem[2].setAttribute('disabled', true);
    selectCapacityElem[3].setAttribute('disabled', true);
  } else if (selectRoomsElem.value === '2') {
    selectCapacityElem[0].setAttribute('disabled', true);
    selectCapacityElem[3].setAttribute('disabled', true);
  } else if (selectRoomsElem.value === '3') {
    selectCapacityElem[0].setAttribute('disabled', true);
  } else if (selectRoomsElem.value === '100') {
    selectCapacityElem[1].setAttribute('disabled', true);
    selectCapacityElem[2].setAttribute('disabled', true);
    selectCapacityElem[3].setAttribute('disabled', true);
  }
});
