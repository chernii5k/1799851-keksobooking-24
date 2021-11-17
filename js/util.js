// const AVATARS = [
//   'img/avatars/user01.png',
//   'img/avatars/user02.png',
//   'img/avatars/user03.png',
//   'img/avatars/user04.png',
//   'img/avatars/user05.png',
//   'img/avatars/user06.png',
//   'img/avatars/user07.png',
//   'img/avatars/user08.png',
//   'img/avatars/user09.png',
//   'img/avatars/user10.png',
// ];

// const TYPES = [
//   'palace',
//   'flat',
//   'house',
//   'bungalow',
//   'hotel',
// ];

// const CHECK_IN_OUT = [
//   '12:00',
//   '13:00',
//   '14:00',
// ];

// // Случайное число с плавающей запятой

// const getRandomPositiveFloat = (a, b, digits = 1) => {
//   const lower = Math.min(Math.abs(a), Math.abs(b));
//   const upper = Math.max(Math.abs(a), Math.abs(b));
//   const result = Math.random() * (upper - lower) + lower;
//   return result.toFixed(digits);
// };

// // Случайное целое число

// const getRandomPositiveInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
//   const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// // Массив случайной длинны

// function getArray(Array) {
//   const maxLength = Array.length;
//   const lengthOfArray = getRandomPositiveInteger(1, maxLength);
//   const randomArray = [];

//   while (randomArray.length < lengthOfArray) {
//     const indexOfElement = getRandomPositiveInteger(0, maxLength - 1);
//     const element = Array[indexOfElement];

//     if (!randomArray.includes(element)) {
//       randomArray.push(element);
//     }
//   }
//   return randomArray;
// }

// // Случайный элемент массива

// const getArrayElement = (Array) => {
//   const arrayElement = Array[getRandomPositiveInteger(0, Array.length - 1)];

//   return arrayElement;
// };

// // Создает карточку

// // const createCard = () => {

// //   const location = {
// //     lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
// //     lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
// //   };

// //   return {
// //     author: {
// //       avatar: getArrayElement(AVATARS),
// //     },
// //     offer: {
// //       title: 'Ваше объявление',
// //       address: `${location.lat} , ${location.lng}`,
// //       price: getRandomPositiveInteger(1000, 10000),
// //       type: getArrayElement(TYPES),
// //       rooms: getRandomPositiveInteger(1, 100),
// //       guests: getRandomPositiveInteger(1, 4),
// //       checkin: getArrayElement(CHECK_IN_OUT),
// //       checkout: getArrayElement(CHECK_IN_OUT),
// //       features: getArray(),
// //       description: 'Апартаменты',
// //       photos: getArray(),
// //     },
// //     location,
// //   };
// // };

// // Создает массив карточек объявлений

// // const fillCard = (quantity) => {
// //   const cardList = [];

// //   for (let i = 0; i < quantity; i++) {
// //     cardList.push(createCard(i));
// //   }

// //   return cardList;
// // };
