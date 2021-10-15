import {fillCard} from './create-fill-card.js';
import {featuresList} from './features-array.js';
import {typeOfHousingMap} from './create-array-element.js';

const currentCard = document.querySelector('#card').content.querySelector('.popup');

const anotherCard = fillCard();

const similarCardFragment = document.createDocumentFragment();

anotherCard.forEach(({offer, author}) => {
  const cardElement = currentCard.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('..popup__text--address').textContent = offer.address;
  cardElement.querySelector('..popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typeOfHousingMap[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = featuresList;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos').src = offer.photos;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  similarCardFragment.appendChild(cardElement);
});


