import { getComments, postComment } from './api.js';
import { renderComments } from './render.js';

export function initEventListeners() {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');
  const addForm = document.querySelector('.add-form');

  nameInput.addEventListener('input', (e) => {
    localStorage.setItem('name', e.target.value);
  });
  commentInput.addEventListener('input', (e) => {
    localStorage.setItem('comment', e.target.value);
  });

  nameInput.value = localStorage.getItem('name') || '';
  commentInput.value = localStorage.getItem('comment') || '';

  const handlePostClick = () => {
    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();

    if (name.length < 3 || commentText.length < 3) {
      alert('Имя и комментарий должны быть не короче 3 символов');
      return;
    }

    addButton.disabled = true;
    addForm.style.display = 'none';

    const loaderText = document.createElement('div');
    loaderText.className = 'form-loader';
    loaderText.textContent = 'Комментарий добавляется...';
    addForm.parentNode.insertBefore(loaderText, addForm);

    const sendComment = (attempt = 1) => {
      return postComment({ name, text: commentText }).catch((error) => {
        if (error.message === 'Ошибка сервера' && attempt < 2) {
          return sendComment(attempt + 1);
        }
        throw error;
      });
    };

    sendComment()
  .then(() => {
    return getComments();
  })
  .then((updatedComments) => {
    renderComments(updatedComments);
    nameInput.value = '';
    commentInput.value = '';

    localStorage.removeItem('name');
    localStorage.removeItem('comment');
  })
      .catch((error) => {
        console.error('Ошибка при отправке:', error);
        if (error.message === 'Ошибка сервера') {
          alert('Сервер сломался, попробуй позже');
        } else if (error.message === 'Сетевые проблемы') {
          alert('Кажется, у вас сломался интернет, попробуйте позже');
        } else if (error.message.includes('долж')) {
          alert('Имя и комментарий должны быть не короче 3 символов');
        } else {
          alert(error.message);
        }
      })
      .finally(() => {
        loaderText.remove();
        addForm.style.display = 'flex';
        addButton.disabled = false;
      });
  };

  addButton.addEventListener('click', handlePostClick);

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