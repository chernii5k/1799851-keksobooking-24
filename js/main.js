import './map.js';
import './filter.js';

import { addMainFormDisabled, checkValidationForm, setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { data } from './data.js';
import { setFilterListener } from './filter.js';
import { getOffersMark, loadMap } from './map.js';

getData((offers) => {
  data.offers = offers;
  getOffersMark(data.offers.slice(0, 10));
  setFilterListener(data.offers);
});

checkValidationForm();
addMainFormDisabled();
setUserFormSubmit();
loadMap();
