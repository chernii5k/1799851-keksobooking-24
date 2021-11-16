import './map.js';
import './filter.js';

import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { data } from './data.js';
import { setFilterListener } from './filter.js';
import { showAlert } from './show-message.js';

getData((offers) => {
  data.offers = offers;
  const newData = data.offers.slice(0, 10);
  setFilterListener(newData);
}, showAlert);

setUserFormSubmit();
