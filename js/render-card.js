import { typeOfHousingMap } from './create-array-element.js';

const currentCard = document.querySelector('#card').content.querySelector('.popup');

// const similarCardFragment = document.createDocumentFragment();
const cardContainer = document.querySelector('#map-canvas');
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

  features.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add(`popup__feature--${item}`);
    container.appendChild(li);
  });
};

const renderCard = (element) => {
  const cardElement = currentCard.cloneNode(true);
  const photosContainer = cardElement.querySelector('.popup__photos');
  const featuresList = cardElement.querySelector('.popup__features');
  photosContainer.innerHTML = '';
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typeOfHousingMap[element.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  renderFeatures(element.offer.features, featuresList);
  cardElement.querySelector('.popup__description').textContent = element.offer.description;
  photosContainer.appendChild(renderPhotos(element.offer.photos));
  cardElement.querySelector('.popup__avatar').src = element.author.avatar;
  cardContainer.appendChild(cardElement);
};

export {renderCard};
