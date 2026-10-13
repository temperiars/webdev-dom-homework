import { sanitizeHTML } from './sanitize.js';
import { formatDate } from './date.js';
import { initLikeButtonListeners } from './likes.js';
import { initCommentClickListeners } from './reply.js';

export function renderComments(comments, isLoading = false) {
  const commentsList = document.querySelector('.comments');

  if (isLoading) {
    commentsList.innerHTML =
      '<li class="loader">Пожалуйста, подождите, загружаю комментарии...</li>';
    return;
  }

  const commentsHTML = comments
    .map((comment, index) => {
      let likeButtonClass = 'like-button';

      if (comment.isLikeLoading) {
        likeButtonClass += ' -loading-like';
      } else if (comment.isLiked) {
        likeButtonClass += ' -active-like';
      }

      return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${sanitizeHTML(comment.name)}</div>
            <div>${formatDate(comment.date)}</div>
          </div>

          <div class="comment-body">
            <div class="comment-text">
              ${sanitizeHTML(comment.text)}
            </div>
          </div>

          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button
                class="${likeButtonClass}"
                data-index="${index}"
                aria-label="Поставить или убрать лайк"
              ></button>
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