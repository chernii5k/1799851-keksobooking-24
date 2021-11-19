const successContainer = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successContainer.cloneNode(true);
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorContainer.cloneNode(true);
const errorButton = document.querySelector('#error').content.querySelector('.error__button');
const SHOW_TIME_MESSAGE = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageModal();
  }
}

errorButton.addEventListener('click', () => {
  closeMessageModal();
});

function openMessageModal() {
  successMessageElement.classList.remove('hidden');
  errorMessageElement.classList.remove('hidden');
  document.addEventListener('keydown', onMessageEscKeydown);
}

function closeMessageModal() {
  successMessageElement.classList.add('hidden');
  errorMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onMessageEscKeydown);
}

window.onclick = (evt) => {
  if (evt.target !== successContainer && errorContainer) {
    closeMessageModal();
  }
};

const showMessageSuccess = () => {
  document.body.append(successMessageElement);
  successMessageElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessageModal();
    }
  });
};

const showMessageError = () => {
  document.body.append(errorMessageElement);
  errorMessageElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeMessageModal();
    }
  });
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  const alertMessage = document.createElement('p');

  alertContainer.style.zIndex = 9999;
  alertContainer.style.position = 'fixed';
  alertContainer.style.width = '100%';
  alertContainer.style.height = '50px';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.boxSizing = 'border-box';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.verticalAlign = 'middle';
  alertMessage.style.fontSize = '20px';
  alertMessage.style.lineHeight = 1.2;
  alertMessage.style.margin = 0;
  alertMessage.style.marginTop = '3px';
  alertMessage.style.color = 'white';
  alertMessage.style.fontWeight = 700;

  alertMessage.textContent = message;

  alertContainer.appendChild(alertMessage);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME_MESSAGE);
};

if (showMessageSuccess || showMessageError) {
  openMessageModal();
}

export { showMessageError, showMessageSuccess, openMessageModal, showAlert };

