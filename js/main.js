import {fillCard} from './create-fill-card.js';
import {renderCard} from './render-card.js';

const dataOffers = fillCard(10);
renderCard(dataOffers[0]);
