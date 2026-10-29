import { login, getComments, postComment } from './api.js';
import { renderComments } from './render.js';
import { saveAuth, getToken } from './auth.js';

export function initLoginListeners() {
  const loginInput = document.querySelector('.login-input');
  const passwordInput = document.querySelector('.password-input');
  const loginButton = document.querySelector('.login-button');
  const errorEl = document.querySelector('.login-error');

  loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!loginValue || !passwordValue) {
      errorEl.textContent = 'Заполните все поля';
      return;
    }

    login({ login: loginValue, password: passwordValue })
      .then((data) => {
        saveAuth(data.user.token, data.user.name);
        window.location.reload();
      })
      .catch((error) => {
        errorEl.textContent = error.message;
      });
  });
}

export function initEventListeners() {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');
  const addForm = document.querySelector('.add-form');

  if (!addButton) return;

  commentInput.addEventListener('input', (e) => {
    localStorage.setItem('commentDraft', e.target.value);
  });
  commentInput.value = localStorage.getItem('commentDraft') || '';

  addButton.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    const token = getToken();

    if (commentText.length < 3) {
      alert('Комментарий должен быть не короче 3 символов');
      return;
    }

    addButton.disabled = true;
    addForm.style.display = 'none';
    const loader = document.createElement('div');
    loader.className = 'form-loader';
    loader.textContent = 'Комментарий добавляется...';
    addForm.parentNode.insertBefore(loader, addForm);

    postComment({ text: commentText, token })
      .then(() => {
        return getComments();
      })
      .then((updated) => {
        localStorage.removeItem('commentDraft');
        renderComments(updated);
        initEventListeners();
      })
      .catch((error) => {
        console.error('Ошибка при отправке комментария:', error);
        alert(error.message);
      })
      .finally(() => {
        loader.remove();

        const form = document.querySelector('.add-form');

        if (form) {
          form.style.display = 'flex';

          const currentButton = form.querySelector('.add-form-button');

          if (currentButton) {
            currentButton.disabled = false;
          }
        }
      });
  });
}