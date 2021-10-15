import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';

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
  'img/avatars/user10.png',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const typeOfHousingMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const getArrayElement = (Array) => {
  const arrayElement =  Array[getRandomPositiveInteger(0, Array.length - 1)];

  return arrayElement;
};

export {getArrayElement, TYPES, CHECK_IN_OUT, AVATARS, typeOfHousingMap};
