import { sanitizeHTML } from './sanitize.js';
import { formatDate } from './date.js';
import { initLikeButtonListeners } from './likes.js';
import { initCommentClickListeners } from './reply.js';
import { getToken, getUserName } from './auth.js';

export function renderLoginPage() {
  const app = document.querySelector('.container');
  app.innerHTML = `
    <div class="login-form">
      <h2>Вход</h2>
      <input type="text" class="login-input" placeholder="Логин" />
      <input type="password" class="password-input" placeholder="Пароль" />
      <button class="login-button">Войти</button>
      <p class="login-error" style="color: red;"></p>
    </div>
  `;
}

export function renderComments(comments, isLoading = false) {
  const token = getToken();
  const userName = getUserName();
  const app = document.querySelector('.container');

  if (isLoading) {
    app.innerHTML = '<div class="loader">Комментарии загружаются...</div>';
    return;
  }

  const addFormHTML = token
    ? `
      <div class="add-form">
        <input type="text" class="add-form-name" value="${sanitizeHTML(userName || '')}" readonly />
        <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
    `
    : `
      <div class="auth-link">
        <a href="#" id="login-link">Чтобы добавить комментарий, авторизуйтесь</a>
      </div>
    `;

  const commentsHTML = comments
    .map((comment, index) => {
      const likeButtonClass = comment.isLikeLoading
        ? 'like-button -loading-like'
        : comment.isLiked
          ? 'like-button -active-like'
          : 'like-button';

      return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${sanitizeHTML(comment.name)}</div>
            <div>${formatDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${sanitizeHTML(comment.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="${likeButtonClass}" data-index="${index}"></button>
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  app.innerHTML = `
    <ul class="comments">${commentsHTML}</ul>
    ${addFormHTML}
  `;

  if (comments.length > 0) {
    initLikeButtonListeners(comments);
    initCommentClickListeners(comments);
  }
}