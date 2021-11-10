const successContainer = document.querySelector('#success').content.querySelector('.success');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success__message');
const errorMessage = document.querySelector('#error').content.querySelector('.error__message');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

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

  successContainer.style.zIndex = 100;
  successContainer.style.position = 'absolute';
  successContainer.style.width = '100%';
  successContainer.style.height = '40px';
  successContainer.style.left = 0;
  successContainer.style.top = 0;
  successContainer.style.right = 0;
  successContainer.style.backgroundColor = 'green';
  successContainer.style.padding = '10px 5px';
  successMessage.style.fontSize = '20px';
  successMessage.style.textAlign = 'center';
  successMessage.style.color = 'white';

  document.body.append(successContainer);

};

const showMessageError = () => {
  errorContainer.cloneNode(true);

  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.width = '100%';
  errorContainer.style.height = '50px';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.padding = '10px 5px';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.style.display = 'flex';
  errorContainer.style.alignItems = 'center';
  errorContainer.style.justifyContent = 'space-around';
  errorContainer.style.overflow = 'hidden';
  errorMessage.style.fontSize = '20px';
  errorMessage.style.lineHeight = '1.2';
  errorMessage.style.textAlign = 'center';
  errorButton.style.height = '20px';
  errorButton.style.display = 'flex';
  errorButton.style.justifyContent = 'center';
  errorButton.style.alignItems = 'center';

  document.body.append(errorContainer);

};

if (showMessageSuccess || showMessageError) {
  openMessageModal();
}

export { showMessageError, showMessageSuccess };

