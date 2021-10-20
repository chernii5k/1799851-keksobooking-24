import {getArray, FEATURES} from './create-array.js';

const featuresContainer = document.querySelector('.popup__features');
const featuresList = featuresContainer.querySelectorAll('.popup__feature');
const featuresArray = getArray(FEATURES);

featuresList.forEach((featuresListItem) => {
  const isNecessary = featuresArray.some((featuresItem) => featuresListItem.classList.contains(`popup__feature-- ${featuresItem}`));

  if (!isNecessary) {
    featuresListItem.remove();
  }
});
