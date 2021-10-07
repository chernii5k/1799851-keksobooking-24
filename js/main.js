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

const AVATAR = [
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

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
]

const FEATUERS = [
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


// Объект "author"

// Аватар
const createAuthor = () => {
  const randomAvatarIndex = _.random(0, AVATAR.length - 1);

  return {
    avatar: AVATAR[randomAvatarIndex],
  };
};

// Объект "location"

// Ширина
const lat = getRandomArbitrary(35.65000, 35.70000, 5);

// Долгота
const lng = getRandomArbitrary(139.70000, 139.80000, 5);

// Объект "offer"

// Адрес
const coordinatesWidth = lat;
const coordinatesLongitude = lng;

// Тип жилья
const showTypeOfHousing = () => {
  const randomTypeIndex = _.random(0, TYPE.length - 1);

  return {
    type: TYPE[randomTypeIndex],
  };
};

// Въезд/Выезд
const createCheckInOut = () => {
  const randomCheckInOutIndex = _.random(0, CHECK_IN_OUT.length - 1);

  return {
    checkinout: CHECK_IN_OUT[randomCheckInOutIndex],
  };
};

// Удаобства

const createFacilities = () => {
  const randomFacilitiesIndex = _.random(0, FEATUERS.length - 1);

  return {
    facilities: FEATUERS[randomFacilitiesIndex],
  };
};

// Фотография жилья
const createPhotoPremises = () => {
  const randomPhotoIndex = _.random(0, PHOTOS.length - 1);

  return {
    photo: PHOTOS[randomPhotoIndex],
  };
};

// Карточка

const createCard = () => {
  return {
    author: {
      avatar: createAuthor(),
    },
    offer: {
      title: 'Ваше объявление',
      adress: 'Ширина ' + coordinatesWidth + ' Долгота ' + coordinatesLongitude,
      price: 'Стоимость в сутки ' + getRandomNumber(1000, 10000),
      type: showTypeOfHousing(),
      rooms: 'Количество комнат ' +  getRandomNumber(1, 100),
      guests: 'Количество гостей ' + getRandomNumber(1, 4),
      checkin: createCheckInOut(),
      checkout: createCheckInOut(),
      features: createFacilities(),
      description: 'Апартаменты',
      photos: createPhotoPremises()
    },
  };
};

const fillCard = (quantity) => {
  const cardList = [];

  for (let i = 0; i < quantity; i++) {
    cardList.push(createCard());
  }

  return cardList;
};



