import { comments } from './comments.js';
import { renderComments } from './render.js';
import { initEventListeners } from './events.js';

renderComments(comments);
initEventListeners(comments);