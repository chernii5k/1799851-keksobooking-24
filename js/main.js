import './map.js';
import './show-message.js';

import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { getOffersMark } from './map.js';
import { setFilterOffers } from './filter.js';

let data = [];

getData((offers) => {
  data = offers;
  const sliceOffers = data.slice(0, 10);
  const filteredOffers = setFilterOffers(sliceOffers);
  getOffersMark(filteredOffers);
});

setUserFormSubmit();
