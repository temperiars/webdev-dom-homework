import { renderComments } from './render.js';

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}

function handleLikeClick(event, comments) {
  event.stopPropagation();

  const index = event.currentTarget.dataset.index;

  if (index === undefined) {
    return;
  }

  const commentIndex = Number(index);
  const comment = comments[commentIndex];

  if (!comment || comment.isLikeLoading) {
    return;
  }

  comment.isLikeLoading = true;
  renderComments(comments);

  delay(2000)
    .then(() => {
      comment.likes = comment.isLiked
        ? comment.likes - 1
        : comment.likes + 1;

      comment.isLiked = !comment.isLiked;
    })
    .finally(() => {
      comment.isLikeLoading = false;
      renderComments(comments);
    });
}

export function initLikeButtonListeners(comments) {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      handleLikeClick(event, comments);
    });
  });
}