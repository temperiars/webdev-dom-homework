const API_URL = 'https://wedev-api.sky.pro/api/v1/ekaterina-stepanova/comments';

export function getComments() {
    return fetch(API_URL, {
      method: 'GET',
    })
    
    .then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки комментариев');
        }
        return response.json();
    })
    .then((data) => {
        return data.comments.map((comment) => ({
            id: comment.id,
            name: comment.author.name,
            date: new Date(comment.date),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
        })); 
    });
}

export function postComment({name, text }) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
        },
        body: JSON.stringify({name, text}),
    })
    .then((response) => {
        if (response.status === 400) {
            return response.json().then((errorData) => {
          throw new Error(errorData.error || 'Ошибка валидации');
        });
      }
      if (!response.ok) {
        throw new Error('Ошибка отправки комментария');
      }
      return response.json();
    })
}