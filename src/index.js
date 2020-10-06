import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import {
    addCardModal,
    editProfileModal,
    imageModal,
    editForm,
    addCardForm,
    openModalButton,
    openAddCardModalButton,
    addCardModalCloseButton,
    editProfileModalCloseButton,
    openImageModalCloseButton,
    nameInput,
    jobInput,
    placeInput,
    urlInput,
    title,
    subtitle,
    imageModalTitle,
    imageModalImg,
    templateSelector,
    cardTemplate,
    list,
    escCode,
    closeEsc,
    openModalWindow,
    closeModalWindow
} from './scripts/utils/utils.js';
import { initialCards } from './scripts/utils/utils.js';
import { setting } from './scripts/utils/utils.js';

import "./pages/index.css";

const editFormValidator = new FormValidator(setting, editForm);
const cardFormValidator = new FormValidator(setting, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closeModalWindow(editProfileModal);
}

function renderCard(data) {
    const newCard = new Card(data, templateSelector);
    list.prepend(newCard.getView());
}

function addCardSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({ name: placeInput.value, link: urlInput.value });
    closeModalWindow(addCardModal);
}

initialCards.forEach((data) => {
    renderCard(data);
});

editForm.addEventListener('submit', formSubmitHandler);

openModalButton.addEventListener('click', () => {
    openModalWindow(editProfileModal);
    editFormValidator.clearInputErrors();
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    editFormValidator.enableSubmitButton();
});

editProfileModalCloseButton.addEventListener('click', () => closeModalWindow(editProfileModal))

editProfileModal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closeModalWindow(editProfileModal)
    }
});

addCardForm.addEventListener('submit', addCardSubmitHandler);

openAddCardModalButton.addEventListener('click', () => {
    openModalWindow(addCardModal);
    cardFormValidator.clearInputErrors();
});

addCardModalCloseButton.addEventListener('click', () => {
    closeModalWindow(addCardModal)
});

addCardModal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closeModalWindow(addCardModal)
    }
});

openImageModalCloseButton.addEventListener('click', () => {
    closeModalWindow(imageModal)
});

imageModal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closeModalWindow(imageModal)
    }
});

