import { sanitizeHTML } from './sanitize.js';
import { initLikeButtonListeners } from './likes.js';
import { initCommentClickListeners } from './reply.js';

export function renderComments(comments) {
  const commentsList = document.querySelector('.comments');

  const commentsHTML = comments
    .map((comment, index) => {
      const likeButtonClass = comment.isLiked
        ? 'like-button -active-like'
        : 'like-button';

      return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${sanitizeHTML(comment.name)}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${sanitizeHTML(comment.text)}
            </div>
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

  commentsList.innerHTML = commentsHTML;

  initLikeButtonListeners(comments);
  initCommentClickListeners(comments);
}