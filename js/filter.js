const mapFilters = document.querySelector('.map__filters');
const housingTypeList = mapFilters.querySelector('#housing-type');
const housingPriceList = mapFilters.querySelector('#housing-price');
const housingGuestsList = mapFilters.querySelector('#housing-guests');
const housingRoomsList = mapFilters.querySelector('#housing-rooms');
const DEFAULT_VALUE = 'any';
// const SIMILAR_OFFERS_COUNT = 10;

const filterByType = (advert) => {
  housingTypeList.value === DEFAULT_VALUE || housingTypeList.value === advert.offer.type;
};

const filterByPrice = (advert) => {
  housingPriceList.value === DEFAULT_VALUE || advert.offer.price < 10000 && housingPriceList.value === 'low' ||
    advert.offer.price >= 10000 && advert.offer.price < 50000 && housingPriceList.value === 'middle' ||
    advert.offer.price >= 50000 && housingPriceList.value === 'high';
};

const filterByRooms = (advert) => {
  housingRoomsList.value === 'any' || String(advert.offer.rooms) === housingRoomsList.value;
};

const filterByGuests = (advert) => {
  housingGuestsList.value === 'any' || String(advert.offer.guests) === housingGuestsList.value;
};

const filterByFeatures = (advert) => {
  const housingFeatures = document.getElementById('housing-features').getElementsByTagName('input');
  const featuresValues = [];

  for (let i = 0, j = housingFeatures.length; i < j; ++i) {
    featuresValues.push(housingFeatures[i].value);
  }

};

