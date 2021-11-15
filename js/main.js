import './map.js';

import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { data } from './data.js';
import { setFilterListener } from './filter.js';
import { showAlert } from './show-message.js';

getData((offers) => {
  data.offers = offers;
  const sliceData = data.offers.slice(0, 10);
  setFilterListener(sliceData);
}, showAlert);

setUserFormSubmit();
