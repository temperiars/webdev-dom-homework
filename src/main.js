import { getComments } from './api.js';
import { renderComments } from './render.js';
import { initEventListeners } from './events.js';

renderComments([], true);
initEventListeners();

getComments()
   .then((comments) => {
    renderComments(comments);
   })

  .catch((error) => {
    console.error('Не удалось загрузить комментарии:', error);

    const commentsList = document.querySelector('.comments');

    if (error.message === 'Сетевые проблемы') {
      const message = 'Кажется, у вас сломался интернет, попробуйте позже';
      alert(message); 
      commentsList.innerHTML = `<li class="loader">${message}</li>`;
    } else if (error.message === 'Ошибка сервера') {
      const message = 'Сервер сломался, попробуй позже';
      alert(message); 
      commentsList.innerHTML = `<li class="loader">${message}</li>`;
    } else {
      commentsList.innerHTML =
        '<li class="loader">Не удалось загрузить комментарии. Попробуйте обновить страницу.</li>';
    }
  });