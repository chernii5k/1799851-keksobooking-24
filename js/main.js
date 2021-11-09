import './map.js';

import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import {getOffersMark} from './map.js';

let data = [];

getData((offers) => {
  data = offers;
  const sliceOffers = data.slice(0, 10);
  getOffersMark(sliceOffers);
});

setUserFormSubmit();
