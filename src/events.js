import { handleAddComment } from './addComment.js';

export function initEventListeners(comments) {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');

  nameInput.addEventListener('input', function () {});

  commentInput.addEventListener('input', function () {});

  addButton.addEventListener('click', function () {
    handleAddComment(comments);
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