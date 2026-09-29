import { formatDate } from './date.js';
import { renderComments } from './render.js';

export function handleAddComment(comments) {
  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');
  const commentsList = document.querySelector('.comments');

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

  const newComment = {
    name: name,
    date: formatDate(new Date()),
    text: commentText,
    likes: 0,
    isLiked: false,
  };

  comments.push(newComment);

  nameInput.value = '';
  commentInput.value = '';

  renderComments(comments);

  const lastComment = commentsList.lastElementChild;
  if (lastComment) {
    lastComment.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}