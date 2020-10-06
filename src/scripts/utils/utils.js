
export const addCardModal = document.querySelector('.popup_type_add-card');
export const editProfileModal = document.querySelector('.popup_type_edit-profile');
export const imageModal = document.querySelector('.popup_type_image');

export const editForm = editProfileModal.querySelector('.popup__form');
export const addCardForm = addCardModal.querySelector('.popup__form');

export const openModalButton = document.querySelector('.profile__edit');
export const openAddCardModalButton = document.querySelector('.profile__button');

export const addCardModalCloseButton = addCardModal.querySelector('.popup__close-button');
export const editProfileModalCloseButton = editProfileModal.querySelector('.popup__close-button');
export const openImageModalCloseButton = imageModal.querySelector('.popup__close-button');

export const nameInput = editForm.querySelector('.popup__input_type_name');
export const jobInput = editForm.querySelector('.popup__input_type_job');

export const placeInput = addCardForm.querySelector('.popup__input_type_place');
export const urlInput = addCardForm.querySelector('.popup__input_type_url');

export const title = document.querySelector('.profile__title');
export const subtitle = document.querySelector('.profile__subtitle');

export const imageModalTitle = imageModal.querySelector('.popup__imgtitle');
export const imageModalImg = imageModal.querySelector('.popup__img');

export const templateSelector = document.querySelector('.template-card');
export const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
export const list = document.querySelector('.elements');

export const escCode = 'Escape';

export const closeEsc = (evt) => {
    if (evt.key === escCode) {
        closeModalWindow(document.querySelector('.popup_opened'));
    }
};

export const openModalWindow = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closeEsc)
};

export const closeModalWindow = (modal) => {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);
};


export const initialCards = [
    {
        name: 'Италия',
        link: 'https://images.unsplash.com/photo-1556124003-5f506ddb6ba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Франция',
        link: 'https://images.unsplash.com/photo-1590274738155-debeae75a0db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Великобритания',
        link: 'https://images.unsplash.com/photo-1593180928464-85a4c28b3c24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'ОАЭ',
        link: 'https://images.unsplash.com/photo-1590082487384-fc2290e36718?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'США',
        link: 'https://images.unsplash.com/photo-1588881155473-2b3a4bd07d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Испания',
        link: 'https://images.unsplash.com/photo-1587789202069-f57c846b85db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }
];

export const setting = {

    formElement: '.popup__form',
    inputSelector: '.popup__input',
    errorInputSelector: '.popup__error',
    inputErrorClass: 'popup__input_invalid',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    errorClass: 'popup__error_visible',
}
