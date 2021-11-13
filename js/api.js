import { showAlert } from './show-message.js';

const getData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(showAlert('При попытке получить данные с сервера произошла ошибка'));
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
