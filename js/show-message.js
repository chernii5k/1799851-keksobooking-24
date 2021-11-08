const successContainer = document.querySelector('.success');
const errorContainer = document.querySelector('.error');
// const errorButton = errorContainer.querySelector('.error__button');

const isEscapeKey = function (evt) {
  return evt.key === 'Escape';
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

function closeMessage () {
  successContainer.classList.add('hidden');
  errorContainer.classList.add('hidden');

  document.removeEventListener('keydown', onMessageEscKeydown);
}

const sendSuccess = () => {
  const messageElement = successContainer.cloneNode(true);
  const successMessage = successContainer.querySelector('.success__message');

  messageElement.style.zIndex = '100';
  messageElement.style.position = 'absolute';
  messageElement.style.textAlign = 'center';
  messageElement.style.left = '0';
  messageElement.style.top = '0';
  messageElement.style.right = '0';
  messageElement.style.padding = '15px 5px';
  messageElement.style.backgroundColor = 'red';
  successMessage.style.fontSize = '20px';
  successMessage.style.fontWeigth = '400';
  successMessage.style.color = 'black';

  return messageElement;
};

const sendError = () => {
  const messageElement = errorContainer.cloneNode(true);
  const errorMessage = errorContainer.querySelector('.error__message');

  messageElement.style.zIndex = '100';
  messageElement.style.position = 'absolute';
  messageElement.style.textAlign = 'center';
  messageElement.style.left = '0';
  messageElement.style.top = '0';
  messageElement.style.right = '0';
  messageElement.style.padding = '15px 5px';
  messageElement.style.backgroundColor = 'green';
  errorMessage.style.fontSize = '40px';
  errorMessage.style.fontWeigth = '400';
  errorMessage.style.color = 'white';

  return messageElement;
};

export { sendSuccess, sendError };

