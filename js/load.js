const createLoader = (onSucces, onError) => () =>
  fetch(
    'https://24.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSucces(data);
    })
    .catch((err) => {
      onError(err);
    });

export { createLoader };

