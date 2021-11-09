const successContainer = document.querySelector('.success');
const errorContainer = document.querySelector('.error');
const SHOW_TIME_MESSAGE = 5000;

// const errorButton = errorContainer.querySelector('.error__button');

const isEscapeKey = function (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

// window.onclick = (evt) => {
//   if (evt.target === !successContainer && !errorContainer) {
//     closeMessage();
//   }
// };

function closeMessage() {
  successContainer.classList.add('hidden');
  errorContainer.classList.add('hidden');

  document.removeEventListener('keydown', onMessageEscKeydown);
}

const showMessageSuccess = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '15px 5px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'green';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME_MESSAGE);
};

const showMessageError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '15px 5px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'black';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME_MESSAGE);
};

export { showMessageError, showMessageSuccess };

