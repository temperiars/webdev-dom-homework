const BASE_URL = 'https://wedev-api.sky.pro/api/v2/ekaterina-stepanova';
const AUTH_URL = 'https://wedev-api.sky.pro/api/user';

export function getComments() {
  return fetch(`${BASE_URL}/comments`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 500) throw new Error('Ошибка сервера');
      if (!response.ok) throw new Error('Ошибка загрузки комментариев');
      return response.json();
    })
    .then((data) => {
      return data.comments.map((comment) => ({
        id: comment.id,
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
        isLikeLoading: false,
      }));
    })
    .catch((error) => {
      if (error.name === 'TypeError') throw new Error('Сетевые проблемы');
      throw error;
    });
}

export function login({ login, password }) {
  return fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ login, password }),  
  })

    .then((response) => {
      return response.json().then((data) => {
        if (!response.ok) {
          throw new Error(data.error || 'Неверный логин или пароль');
        }
        return data;
      });
    })
    .catch((error) => {
      if (error.name === 'TypeError') throw new Error('Сетевые проблемы');
      throw error;
    });
}

export function postComment({ text, token }) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => {
      if (response.status === 401) throw new Error('Неавторизован');
      if (response.status === 500) throw new Error('Ошибка сервера');
      if (response.status === 400) {
        return response.json().then((data) => {
          throw new Error(data.error || 'Ошибка валидации');
        });
      }
      if (!response.ok) throw new Error('Ошибка отправки');
      return response.json();
    })
    .catch((error) => {
      if (error.name === 'TypeError') throw new Error('Сетевые проблемы');
      throw error;
    });
}