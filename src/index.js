import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm }  from './scripts/PopupWithForm.js';
import {
    profileSelectors,
    addCardModal,
    editProfileModal,
    imageModal,
    editProfileForm,
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
} from './scripts/utils.js';
import { initialCards } from './scripts/utils.js';
import { setting } from './scripts/utils.js';

import "./pages/index.css";

const popupWithImage = new PopupWithImage(imageModal);
const userInfo = new UserInfo(title, subtitle);

const editFormValidator = new FormValidator(setting, editProfileForm);
const cardFormValidator = new FormValidator(setting, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

function getCard(item) {
	const card = new Card(item, '.template-card', {
		handleCardClick: () => {
			popupWithImage.open(card);
			popupWithImage.setEventListeners();
		}
	});
	return card
}

const cardsList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = getCard(item);
		// Создаём карточку и возвращаем наружу
		const cardElement = card.generateCard();
		// Добавляем в DOM
		cardsList.addItem(cardElement, true);

	}
},
	list
);

const popupPlaceForm = new PopupWithForm({
	popupSelector: addCardModal,
	submitHandler: () => {
		// debugger
		const cardAdd = { name: placeInput.value, link: urlInput.value };
		const newCards = new Section({
			items: cardAdd,
			renderer: (item) => {
				const card = getCard(item);
				// Создаём карточку и возвращаем наружу
				const cardElement = card.generateCard();
				// Добавляем в DOM
				newCards.addItem(cardElement);
			}
		},
			list
		);
		newCards.renderItem(cardAdd);
		popupPlaceForm.close();
	}
});

const profile = new PopupWithForm({
	popupSelector: editProfileModal,
	submitHandler: () => {
		userInfo.setUserInfo(nameInput, jobInput);
		profile.close();
	}
});

openModalButton.addEventListener('click', () => {
	editFormValidator.clearInputErrors();
	editFormValidator.enableSubmitButton();

	const userProfileInfo = userInfo.getUserInfo();
	nameInput.value = userProfileInfo.name;
	jobInput.value = userProfileInfo.info;
    profile.open();   
});

openAddCardModalButton.addEventListener('click', () => {
	cardFormValidator.clearInputErrors();
    popupPlaceForm.open();
    addCardForm.reset()
	popupPlaceForm.setEventListeners();
});

profile.setEventListeners();

cardsList.rendererItems();