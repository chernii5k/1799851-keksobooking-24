// Задание №1.

// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber(min, max) {
  if (max < min || max === min) {
    return ('Неверно задан диапазон! Укажите другие числа.');
  }

  min = Math.ceil(min); // Возвращает значение числа, округлённое к большему целому.
  max = Math.floor(max); // Возвращает значение числа, округлённое к меньшему целому.
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// Задание №2.

function getRandomArbitrary(min, max, precision) {
  if (max < min || max === min) {
    return ('Неверно задан диапазон! Укажите другие числа.');
  }

  const random = Math.random() * (max - min) + min;

  return random.toFixed(precision);
}

// Задание №3.

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png'
]

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]

const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00'
]

const getArrayElement = (Array) => {
 const arrayElement =  Array[getRandomNumber(0, Array.length - 1)];

 return arrayElement;
};

// Карточка
const createCard = () => {

  const location = {
    x: getRandomArbitrary(35.65000, 35.70000, 5),
    y: getRandomArbitrary(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: getArrayElement(AVATARS)
    },
    offer: {
      title: 'Ваше объявление',
      address: location.x + ', ' + location.y,
      price: getRandomNumber(1000, 10000),
      type: getArrayElement(TYPES),
      rooms: getRandomNumber(1, 100),
      guests: getRandomNumber(1, 4),
      checkin: getArrayElement(CHECK_IN_OUT),
      checkout: getArrayElement(CHECK_IN_OUT),
      featuers: getArrayElement(FEATURES),
      description: 'Апартаменты',
      photos: getArrayElement(PHOTOS)
    },
    location
  };
};

const fillCard = (quantity) => {
  const cardList = [];

  for (let i = 0; i < quantity; i++) {
    cardList.push(createCard(i));
  }

  return cardList;
};

fillCard(10);


