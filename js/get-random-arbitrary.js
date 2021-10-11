const getRandomArbitrary = (min, max, precision) => {
  if (max < min || max === min) {
    return ('Неверно задан диапазон! Укажите другие числа.');
  }
  const random = Math.random() * (max - min) + min;

  return random.toFixed(precision);
};

export {getRandomArbitrary};
