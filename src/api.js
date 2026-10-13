const API_URL =
  'https://wedev-api.sky.pro/api/v1/ekaterina-stepanova/comments';

function getResponseData(response) {
  return response.json().then((data) => ({
    response,
    data,
  }));
}

function checkResponse({ response, data }) {
  if (!response.ok) {
    throw new Error(
      data.error || 'Ошибка при выполнении запроса',
    );
  }

  return data;
}

export function getComments() {
  return fetch(API_URL, {
    method: 'GET',
  })
    .then(getResponseData)
    .then(checkResponse)
    .then((data) => {
      return data.comments.map((comment) => ({
        id: comment.id,
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
        isLikeLoading: false,
      }));
    });
}

export function postComment({ name, text }) {
  return fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ name, text }),
  })
    .then(getResponseData)
    .then(checkResponse);
}