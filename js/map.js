import { removeDisabled } from './form.js';
import { fillCard } from './create-fill-card.js';
import { renderCard } from './render-card.js';

const points = fillCard(10);
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const secondaryPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Карта, переход в активное состояние

const map = L.map('map-canvas')
  .on('load', () => {
    removeDisabled();
  })
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 13);


// Отрисовка слоя

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Основная метка

const marker = L.marker(
  {
    lat: 35.658581,
    lng: 139.745438,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

// Дополнительные метки

points.forEach((card) => {
  const address = card.location;

  const normalMarker = L.marker(
    {
      lat: address.lat,
      lng: address.lng,
    },
    {
      icon: secondaryPinIcon,
    },
  );

  normalMarker
    .addTo(map)
    .bindPopup(renderCard);
});

// Выбор адреса путем перемещения метки

marker.on('moveend', (evt) => {
  const inputAddress = document.getElementById('address');
  const adressValue = () => {
    inputAddress.value = evt.target.getLatLng();
  };
  adressValue();
});
