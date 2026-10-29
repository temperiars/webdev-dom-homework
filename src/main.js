import { getComments } from './api.js';
import { renderLoginPage, renderComments } from './render.js';
import { getToken } from './auth.js';
import { initEventListeners, initLoginListeners } from './events.js';

const token = getToken();

function handleError(error) {
  console.error(error);
  const app = document.querySelector('.container');

  if (error.message === 'Сетевые проблемы') {
    const message = 'Кажется, у вас сломался интернет, попробуйте позже';
    alert(message);
    app.innerHTML = `<div class="loader">${message}</div>`;
  } else if (error.message === 'Ошибка сервера') {
    const message = 'Сервер сломался, попробуй позже';
    alert(message);
    app.innerHTML = `<div class="loader">${message}</div>`;
  } else {
    app.innerHTML = `<div class="loader">${error.message}</div>`;
  }
}

renderComments([], true);

getComments()
  .then((comments) => {
    renderComments(comments);

    if (token) {
      initEventListeners();
    } else {
      document
        .getElementById('login-link')
        ?.addEventListener('click', (e) => {
          e.preventDefault();
          renderLoginPage();
          initLoginListeners();
        });
    }
  })
  .catch(handleError);