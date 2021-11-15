import { getOffersMark } from './map.js';
import { debounce } from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const housingTypeList = mapFilters.querySelector('#housing-type');
const housingPriceList = mapFilters.querySelector('#housing-price');
const housingGuestsList = mapFilters.querySelector('#housing-guests');
const housingRoomsList = mapFilters.querySelector('#housing-rooms');
const housingFeaturesList = mapFilters.querySelector('#housing-features');
const DEFAULT_VALUE = 'any';

const filterByType = (offer) => {
  if (offer.offer.type) {
    housingTypeList.value === offer.offer.type;
  } else {
    housingTypeList.value === DEFAULT_VALUE;
  }
  return housingTypeList.value;
};

const filterByPrice = (offer) => {
  if (offer.offer.price === 0) {
    housingPriceList.value === DEFAULT_VALUE;
  } else {
    offer.offer.price < 10000 && housingPriceList.value === 'low' ||
      offer.offer.price >= 10000 && offer.offer.price < 50000 && housingPriceList.value === 'middle' ||
      offer.offer.price >= 50000 && housingPriceList.value === 'high';
  }
  return housingPriceList.value;
};

const filterByRooms = (offer) => {
  if (offer.offer.rooms) {
    String(offer.offer.rooms) === housingRoomsList.value;
  } else {
    housingRoomsList.value === DEFAULT_VALUE;
  }
  return housingRoomsList.value;
};

const filterByGuests = (offer) => {
  if (offer.offer.guests) {
    String(offer.offer.guests) === housingGuestsList.value;
  } else {
    housingGuestsList.value === DEFAULT_VALUE;
  }
  return housingGuestsList.value;
};

const filterByFeatures = (offers) => {
  const checkedFeatures = housingFeaturesList.querySelectorAll('[name="features"]:checked');
  const featuresValues = [];

  if (offers.offer.features) {
    checkedFeatures.forEach((element) => {
      featuresValues.push(element.value);
    });
    return featuresValues.every((element) => offers.offer.features.includes(element));
  }
};

const filterOffers = ((offers) => {
  const filteredOffers = offers.filter((offer) => filterByType(offer) && filterByPrice(offer)
    && filterByRooms(offer) && filterByGuests(offer) && filterByFeatures(offer));

  return filteredOffers;
});

const createFilteredOffers = (offers) => {
  const filteredOffers = filterOffers(offers);
  getOffersMark(filteredOffers);
};

const setFilterListener = (offers) => {
  mapFilters.addEventListener('change', debounce(() => createFilteredOffers(offers)));
};

export { setFilterListener };
