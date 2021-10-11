const getRandomNumber = (min, max) => {
  if (max < min || max === min) {
    return ('Неверно задан диапазон! Укажите другие числа.');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {getRandomNumber};
