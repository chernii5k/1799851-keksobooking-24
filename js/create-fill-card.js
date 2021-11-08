import { getArray, PHOTOS, FEATURES } from './create-array.js';
import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { getRandomPositiveFloat } from './utils/get-random-positive-float.js';
import { getArrayElement, TYPES, CHECK_IN_OUT, AVATARS } from './data.js';

const createCard = () => {

  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: getArrayElement(AVATARS),
    },
    offer: {
      title: 'Ваше объявление',
      address: `${location.lat} , ${location.lng}`,
      price: getRandomPositiveInteger(1000, 10000),
      type: getArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 100),
      guests: getRandomPositiveInteger(1, 4),
      checkin: getArrayElement(CHECK_IN_OUT),
      checkout: getArrayElement(CHECK_IN_OUT),
      features: getArray(FEATURES),
      description: 'Апартаменты',
      photos: getArray(PHOTOS),
    },
    location,
  };
};

const fillCard = (quantity) => {
  const cardList = [];

  for (let i = 0; i < quantity; i++) {
    cardList.push(createCard(i));
  }

  return cardList;
};

export { fillCard };
