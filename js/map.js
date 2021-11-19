import { removeDisabled, inputAddress, addLoadFiles } from './form.js';
import { renderCard } from './render-card.js';


const latCoordinates = 35.658581.toFixed(5);
const lngCoordinates = 139.745438.toFixed(5);


// Главная и основные метки

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
const map = L.map('map-canvas');

// Основная метка

const mainMarker = L.marker(
  {
    lat: latCoordinates,
    lng: lngCoordinates,
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

    inputAddress.value = `Latitude ${latCoordinates}, Longitude ${lngCoordinates}`;
  })
    .setView({
      lat: latCoordinates,
      lng: lngCoordinates,
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
    lat: latCoordinates,
    lng: lngCoordinates,
  });

  map.setView({
    lat: latCoordinates,
    lng: lngCoordinates,
  }, 11);
};

export { getOffersMark, mainMarker, returnMarker, latCoordinates, lngCoordinates, markerGroup, loadMap, map };
