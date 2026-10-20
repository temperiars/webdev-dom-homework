function handleCommentClick(event, comments) {
  if (event.target.closest('.like-button')) {
    return;
  }

  const commentElement = event.currentTarget;
  const index = commentElement.dataset.index;
  if (index === undefined) return;

  const commentIndex = parseInt(index, 10);
  const comment = comments[commentIndex];

  const nameInput = document.querySelector('.add-form-name');
  const commentInput = document.querySelector('.add-form-text');

  nameInput.value = '';
  commentInput.value = `${comment.name} > ${comment.text} > `;
  localStorage.setItem('name', nameInput.value);
  localStorage.setItem('comment', commentInput.value);

  commentInput.focus();
  commentInput.setSelectionRange(
    commentInput.value.length,
    commentInput.value.length
  );
}

export function initCommentClickListeners(comments) {
  const commentElements = document.querySelectorAll('.comment');
  commentElements.forEach((commentElement) => {
    commentElement.addEventListener('click', (e) =>
      handleCommentClick(e, comments)
    );
  });
}