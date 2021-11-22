import { removeDisabled, inputAddress, addLoadFiles } from './form.js';
import { renderCard } from './render-card.js';

const LAT_COORDINATES = 35.65858;
const LNG_COORDINATES = 139.74543;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ANCHOR_SIZE = [26, 52];
const SECONDARY_ICON_SIZE = [40, 40];
const SECONDARY_ANCHOR_SIZE = [20, 40];


// Главная и основные метки

const mainPinIcon = L.icon({

  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ANCHOR_SIZE,
});

const secondaryPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: SECONDARY_ICON_SIZE,
  iconAnchor: SECONDARY_ANCHOR_SIZE,
});

const map = L.map('map-canvas');

// Основная метка

const mainMarker = L.marker(
  {
    lat: LAT_COORDINATES,
    lng: LNG_COORDINATES,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

// Карта, переход в активное состояние

const loadMap = () => {
  map.on('load', () => {
    addLoadFiles();
    removeDisabled();

    inputAddress.value = `Latitude ${LAT_COORDINATES}, Longitude ${LNG_COORDINATES}`;
  })
    .setView({
      lat: LAT_COORDINATES,
      lng: LNG_COORDINATES,
    }, 12);

  // Отрисовка слоя

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // Выбор адреса путем перемещения метки

  mainMarker.on('mousemove', (evt) => {
    const addressValue = () => {
      const moveEndLat = evt.target.getLatLng().lat;
      const moveEndLng = evt.target.getLatLng().lng;
      inputAddress.value = `Latitude ${moveEndLat.toFixed(5)}, Longitude ${moveEndLng.toFixed(5)}`;
    };
    addressValue();
  });
};

// Группа меток

const markerGroup = L.layerGroup().addTo(map);

// Добавляет метки объявлений из данных с сервера

const getOffersMark = (points) => {
  points.forEach((point) => {
    const address = point.location;

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
      .addTo(markerGroup)
      .bindPopup(renderCard(point));
  });
};

// Возврат метки в исходное состояние

const returnMarker = () => {
  mainMarker.setLatLng({
    lat: LAT_COORDINATES,
    lng: LNG_COORDINATES,
  });

  map.setView({
    lat: LAT_COORDINATES,
    lng: LNG_COORDINATES,
  }, 12);
};

export { getOffersMark, mainMarker, returnMarker, LAT_COORDINATES, LNG_COORDINATES, markerGroup, loadMap, map };
