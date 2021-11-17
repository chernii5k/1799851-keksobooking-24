import './map.js';
import './filter.js';

import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { data } from './data.js';
import { setFilterListener } from './filter.js';
import { showAlert } from './show-message.js';
import { getOffersMark } from './map.js';

getData((offers) => {
  data.offers = offers;
  getOffersMark(data.offers.slice(0, 10));
  setFilterListener(data.offers);
}, showAlert);

setUserFormSubmit();
