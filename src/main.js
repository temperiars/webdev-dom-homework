import { getComments } from './api.js';
import { renderComments } from './render.js';
import { initEventListeners } from './events.js';

renderComments([], true);

getComments()
  .then((comments) => {
    renderComments(comments);
    initEventListeners(comments);
  })
  .catch((error) => {
    console.error('Не удалось загрузить комментарии:', error);

    const commentsList = document.querySelector('.comments');

    commentsList.innerHTML =
      '<li class="loader">Не удалось загрузить комментарии. Попробуйте обновить страницу.</li>';
  });