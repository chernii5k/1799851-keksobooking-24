const successContainer = document.querySelector('#success').content.querySelector('.success');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success__message');
const errorMessage = document.querySelector('#error').content.querySelector('.error__message');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');
const SHOW_TIME_MESSAGE = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageModal();
  }
}

document.querySelector('#success').content.querySelector('.success').addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeMessageModal();
  }
});

document.querySelector('#error').content.querySelector('.error').addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeMessageModal();
  }
});

errorButton.addEventListener('click', () => {
  closeMessageModal();
});

function openMessageModal () {
  successContainer.classList.remove('hidden');
  errorContainer.classList.remove('hidden');
  document.addEventListener('keydown', onMessageEscKeydown);
}

function closeMessageModal () {
  successContainer.classList.add('hidden');
  errorContainer.classList.add('hidden');
  document.removeEventListener('keydown', onMessageEscKeydown);
}

window.onclick = (evt) => {
  if (evt.target !== successContainer && errorContainer) {
    closeMessageModal();
  }
};

const showMessageSuccess = () => {
  successContainer.cloneNode(true);

  successContainer.style.zIndex = 9999;
  successContainer.style.position = 'fixed';
  successContainer.style.width = '100%';
  successContainer.style.height = '50px';
  successContainer.style.left = 0;
  successContainer.style.top = 0;
  successContainer.style.right = 0;
  successContainer.style.padding = '10px 5px';
  successContainer.style.backgroundColor = 'green';
  successMessage.style.fontSize = '20px';
  successMessage.style.margin = 0;
  successMessage.style.lineHeight = 1.2;
  successMessage.style.marginTop = '3px';
  successMessage.style.color = 'white';

  document.body.append(successContainer);

};

const showMessageError = () => {
  errorContainer.cloneNode(true);

  errorContainer.style.zIndex = 9999;
  errorContainer.style.position = 'fixed';
  errorContainer.style.width = '100%';
  errorContainer.style.height = '50px';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.padding = '10px 5px';
  errorContainer.style.backgroundColor = 'red';
  errorMessage.style.fontSize = '20px';
  errorMessage.style.margin = 0;
  errorMessage.style.lineHeight = 1.2;
  errorMessage.style.marginTop = '3px';
  errorButton.style.position = 'absolute';
  errorButton.style.top = 0;
  errorButton.style.right = 0;
  errorButton.style.width = '160px';
  errorButton.style.borderRadius = '5px';
  errorButton.style.border = '1px solid #ff5635';
  errorButton.style.backgroundColor = '#ff5635';
  errorButton.style.fontSize = '17px';
  errorButton.style.marginTop = '8px';
  errorButton.style.marginRight = '40px';
  errorButton.style.padding = '5px 5px';

  document.body.append(errorContainer);

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

