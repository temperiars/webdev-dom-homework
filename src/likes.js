import { renderComments } from './render.js';

export function handleLikeClick(event, comments) {
  event.stopPropagation();
  const index = event.target.dataset.index;
  if (index === undefined) return;

  const commentIndex = parseInt(index, 10);
  const comment = comments[commentIndex];
  comment.isLiked = !comment.isLiked;

  if (comment.isLiked) {
    comment.likes += 1;
  } else {
    comment.likes -= 1;
  }
  renderComments(comments);
}

export function initLikeButtonListeners(comments) {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', (e) => handleLikeClick(e, comments));
  });
}