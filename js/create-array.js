import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getArray(Array) {
  const maxLength = Array.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const randomArray = [];

  while (randomArray.length < lengthOfArray) {
    const indexOfElement = getRandomPositiveInteger(0, maxLength - 1);
    const element = Array[indexOfElement];

    if (!randomArray.includes(element)) {
      randomArray.push(element);
    }
  }
  return randomArray;
}

export { getArray, PHOTOS, FEATURES };
