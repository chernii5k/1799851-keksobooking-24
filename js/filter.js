import { getOffersMark, markerGroup } from './map.js';
import { debounce } from './utils/debounce.js';

const DEFAULT_VALUE = 'any';
const PRICE_MIN = 10000;
const PRICE_MAX = 50000;
const mapFilters = document.querySelector('.map__filters');
const housingTypeList = mapFilters.querySelector('#housing-type');
const housingPriceList = mapFilters.querySelector('#housing-price');
const housingGuestsList = mapFilters.querySelector('#housing-guests');
const housingRoomsList = mapFilters.querySelector('#housing-rooms');


// Фильтр по типу жилья

const filterByType = (advert) => {
  if (housingTypeList.value === DEFAULT_VALUE) {
    return true;
  }
  return advert.offer.type === housingTypeList.value;
};

// Фильтр по цене

const filterByPrice = (advert) => {
  switch (housingPriceList.value) {
    case 'low':
      return advert.offer.price < PRICE_MIN;
    case 'middle':
      return advert.offer.price >= PRICE_MIN && advert.offer.price <= PRICE_MAX;
    case 'high':
      return advert.offer.price >= PRICE_MAX;
    default:
      return true;
  }
};

// Фильтр по количеству комнат

const filterByRooms = (advert) => (housingRoomsList.value === advert.offer.rooms.toString()) || (housingRoomsList.value === DEFAULT_VALUE);

// Фильтр по количеству гостей

const filterByGuests = (advert) => (housingGuestsList.value === advert.offer.guests.toString()) || (housingGuestsList.value === DEFAULT_VALUE);

// Фильтр по наличию удобств

const filterByFeatures = (advert) => {
  const checkedFeatures = document.querySelectorAll('input[name="features"]:checked');

  if (!advert.offer.features) {
    return false;
  }

  return Array.from(checkedFeatures).every((feature) => advert.offer.features.includes(feature.value));
};

const filterOffers = ((offers) => {
  const filteredOffers = offers.filter((advert) => filterByType(advert) && filterByPrice(advert)
    && filterByRooms(advert) && filterByGuests(advert) && filterByFeatures(advert));

  return filteredOffers;
});

const createFilteredOffers = (offers) => {
  const getFilteredOffers = filterOffers(offers);
  markerGroup.clearLayers();
  getOffersMark(getFilteredOffers.slice(0, 10));
};

const setFilterListener = (offers) => {
  mapFilters.addEventListener('change', debounce(() => createFilteredOffers(offers)));
};

export { setFilterListener };
