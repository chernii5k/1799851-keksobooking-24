import { setUserFormSubmit } from './form.js';
import './map.js';
import { renderCard } from './render-card.js';
import { getData } from './api.js';
import { sendSuccess } from './show-message.js';

getData((offers) => {
  renderCard(offers);
});

