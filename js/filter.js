import { debounce } from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const housingTypeList = mapFilters.querySelector('#housing-type');
const housingPriceList = mapFilters.querySelector('#housing-price');
const housingGuestsList = mapFilters.querySelector('#housing-guests');
const housingRoomsList = mapFilters.querySelector('#housing-rooms');
const DEFAULT_VALUE = 'any';

const filterByType = (offer) => {
  if (!offer.offer.type) {
    housingTypeList.value === DEFAULT_VALUE;
  } else {
    housingTypeList.value === offer.offer.type;
  }
};

const filterByPrice = (offer) => {
  if (offer.offer.price === 0) {
    housingPriceList.value === DEFAULT_VALUE;
  } else {
    offer.offer.price < 10000 && housingPriceList.value === 'low' ||
      offer.offer.price >= 10000 && offer.offer.price < 50000 && housingPriceList.value === 'middle' ||
      offer.offer.price >= 50000 && housingPriceList.value === 'high';
  }
};

const filterByRooms = (offer) => {
  if (!offer.offer.rooms) {
    housingRoomsList.value === DEFAULT_VALUE;
  } else {
    String(offer.offer.rooms) === housingRoomsList.value;
  }
};

const filterByGuests = (offer) => {
  if (!offer.offer.guests) {
    housingGuestsList.value === DEFAULT_VALUE;
  } else {
    String(offer.offer.guests) === housingGuestsList.value;
  }
};

const filterByFeatures = (offer) => {
  const housingFeatures = document.getElementById('housing-features').getElementsByTagName('input');
  const featuresValues = [];

  for (let i = 0, j = housingFeatures.length; i < j; ++i) {
    featuresValues.push(housingFeatures[i].value);
  }

  if (!offer.offers.features) {
    return false;
  }

  return featuresValues.every((index) => offer.offers.features.include(index));
};

const filterOffers = (offers) => offers.filter((offer) => filterByType(offer) && filterByPrice(offer)
  && filterByRooms(offer) && filterByGuests(offer) && filterByFeatures(offer));

const setFilterOffers = (offers) => {
  mapFilters.addEventListener('change', debounce(() => filterOffers(offers)));
};

export { setFilterOffers };
