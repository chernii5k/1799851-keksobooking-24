import './map.js';
import './show-message.js';

import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { getOffersMark } from './map.js';

let data = [];

getData((offers) => {
  data = offers;
  const sliceOffers = data.slice(0, 10);
  getOffersMark(sliceOffers);

});

const housingFeatures = document.getElementById('housing-features').getElementsByTagName('input');
const featuresValues = [];

for (let i = 0, j = housingFeatures.length; i < j; ++i) {
  featuresValues.push(housingFeatures[i].value);
}

console.log(featuresValues);

setUserFormSubmit();
