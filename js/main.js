import './map.js';
import './filter.js';

import { addMainFormDisabled, checkValidationForm, setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { Data } from './data.js';
import { setFilterListener } from './filter.js';
import { getOffersMark, loadMap } from './map.js';

const initMap = (() => {
  getData((offers) => {
    Data.OFFERS = offers;
    getOffersMark(Data.OFFERS.slice(0, 10));
    setFilterListener(Data.OFFERS);
  });
});

initMap();
checkValidationForm();
addMainFormDisabled();
setUserFormSubmit();
loadMap();

export { initMap };
