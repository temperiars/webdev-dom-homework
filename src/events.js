import { getComments, postComment } from './api.js';
import { renderComments } from './render.js';

export function initEventListeners(comments) {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');
  const addForm = document.querySelector('.add-form');

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

    const loaderText = document.createElement('div');
    loaderText.className = 'form-loader';
    loaderText.textContent = 'Комментарий добавляется...';

    addForm.parentNode.insertBefore(loaderText, addForm);
    addForm.style.display = 'none';

    postComment({
      name,
      text: commentText,
    })
      .then(() => {
        return getComments();
      })
      .then((updatedComments) => {
        nameInput.value = '';
        commentInput.value = '';

        renderComments(updatedComments);

        const commentsList = document.querySelector('.comments');
        const lastComment = commentsList.lastElementChild;

        if (lastComment) {
          lastComment.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        alert(error.message);
      })
      .finally(() => {
   loaderText.remove();
   addForm.style.display = 'flex';
   addButton.disabled = false;
 });
  });

  nameInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addButton.click();
    }
  });

  commentInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      addButton.click();
    }
  });
}