import { getComments } from './api.js';
import { renderComments } from './render.js';
import { initEventListeners } from './events.js';

getComments()
  .then((comments) => {
    renderComments(comments);
    initEventListeners(comments);
  })
  .catch((error) => {
    console.error('Не удалось загрузить комментарии:', error);
    alert('Не удалось загрузить комментарии. Попробуйте обновить страницу.');
  });