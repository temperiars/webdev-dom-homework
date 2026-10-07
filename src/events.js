import { getComments, postComment } from './api.js';
import { renderComments } from './render.js';

export function initEventListeners(comments) {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');

  addButton.addEventListener('click', function () {
    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();

    if (name === '') {
      alert('Пожалуйста, укажите ваше имя');
      nameInput.focus();
      return;
    }

     if (commentText === '') {
      alert('Пожалуйста, напишите комментарий');
      commentInput.focus();
      return;
    }
    addButton.disabled = true;
    addButton.textContent = 'Отправка...';
    postComment({ name: name, text: commentText })
      .then(() => {
         nameInput.value = '';
        commentInput.value = '';
         return getComments();
      })
      .then((updatedComments) => {
        renderComments(updatedComments);
        const commentsList = document.querySelector('.comments');
        const lastComment = commentsList.lastElementChild;
        if (lastComment) {
          lastComment.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      })
       .catch((error) => {
        console.error('Ошибка:', error);
        alert(error.message);
      })
      .finally(() => {
          addButton.disabled = false;
        addButton.textContent = 'Написать';
      });
  });

  nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addButton.click();
    }
  });

   commentInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      addButton.click();
    }
  });
}