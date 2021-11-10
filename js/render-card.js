const typeOfHousingMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const currentCard = document.querySelector('#card').content.querySelector('.popup');
const photoTemplate = currentCard.querySelector('.popup__photo');

const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = photo;
    photosFragment.appendChild(photoElement);
  });
  return photosFragment;
};

const renderFeatures = (features, container) => {
  container.innerHTML = '';
  if (features.length === 0) {
    return;
  }

  features.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add(`popup__feature--${item}`);
    container.appendChild(li);
  });
};

const renderCard = (element) => {
  const cardElement = currentCard.cloneNode(true);
  const offerPhotos = cardElement.querySelector('.popup__photos');
  offerPhotos.innerHTML = '';
  const offerFeatures = cardElement.querySelector('.popup__features');
  const avatarImg = cardElement.querySelector('.popup__avatar');
  const offerTitle = cardElement.querySelector('.popup__title');
  const offerAddress = cardElement.querySelector('.popup__text--address');
  const offerPrice = cardElement.querySelector('.popup__text--price');
  const offerType = cardElement.querySelector('.popup__type');
  const offerCapacity = cardElement.querySelector('.popup__text--capacity');
  const offerTime = cardElement.querySelector('.popup__text--time');
  const offerDescription = cardElement.querySelector('.popup__description');

  if (element.author.avatar) {
    avatarImg.src = element.author.avatar;
  } else {
    avatarImg.classList.add('hidden');
  }
  if (element.offer.title) {
    offerTitle.textContent = element.offer.title;
  } else {
    offerTitle.classList.add('hidden');
  }
  if (element.offer.address) {
    offerAddress.textContent = element.offer.address;
  } else {
    offerAddress.classList.add('hidden');
  }
  if (element.offer.price) {
    offerPrice.textContent = `${element.offer.price} ₽/ночь`;
  } else {
    offerPrice.classList.add('hidden');
  }
  if (element.offer.type) {
    offerType.textContent = typeOfHousingMap[element.offer.type];
  } else {
    offerType.classList.add('hidden');
  }
  if (element.offer.rooms && element.offer.guests) {
    offerCapacity.textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  } else {
    offerCapacity.classList.add('hidden');
  }
  if (element.offer.checkin && element.offer.checkout) {
    offerTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  } else {
    offerTime.classList.add('hidden');
  }
  if (element.offer.features) {
    renderFeatures(element.offer.features, offerFeatures);
  } else {
    offerFeatures.classList.add('hidden');
  }
  if (element.offer.description) {
    offerDescription.textContent = element.offer.description;
  } else {
    offerDescription.classList.add('hidden');
  }
  if (element.offer.photos) {
    offerPhotos.appendChild(renderPhotos(element.offer.photos));
  } else {
    offerPhotos.classList.add('hidden');
  }

  return cardElement;
};

export { renderCard };
