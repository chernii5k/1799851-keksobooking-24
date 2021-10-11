import {getArray, PHOTOS, FEATURES} from './create-array.js';
import {getRandomNumber} from './get-random-number.js';
import {getRandomArbitrary} from './get-random-arbitrary.js';
import {getArrayElement, TYPES, CHECK_IN_OUT, AVATARS} from './create-array-element.js';

const createCard = () => {

  const location = {
    lat: getRandomArbitrary(35.65000, 35.70000, 5),
    lng: getRandomArbitrary(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: getArrayElement(AVATARS),
    },
    offer: {
      title: 'Ваше объявление',
      address: `${location.lat} , ${location.lng}`,
      price: getRandomNumber(1000, 10000),
      type: getArrayElement(TYPES),
      rooms: getRandomNumber(1, 100),
      guests: getRandomNumber(1, 4),
      checkin: getArrayElement(CHECK_IN_OUT),
      checkout: getArrayElement(CHECK_IN_OUT),
      featuers: getArray(FEATURES),
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

(fillCard(10));


