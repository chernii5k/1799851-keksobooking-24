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

console.log(getRandomNumber(10, 100));

// Задание №2.

function getRandomArbitrary(min, max, precision) {
  if (max < min || max === min) {
    return ('Неверно задан диапазон! Укажите другие числа.');
  }

  const random = Math.random() * (max - min) + min;

  return random.toFixed(precision);
}

console.log(getRandomArbitrary(10, 100, 5));

