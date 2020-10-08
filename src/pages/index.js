import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import {
    editProfileForm,
    addCardForm,
    openModalButton,
    openAddCardModalButton,
    nameInput,
    jobInput,
    placeInput,
    urlInput,
    title,
    subtitle,
    list,
} from '../components/utils.js';
import { initialCards } from '../components/utils.js';
import { setting } from '../components/utils.js';

import "./index.css";

const popupWithImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(title, subtitle);

const editFormValidator = new FormValidator(setting, editProfileForm);
const cardFormValidator = new FormValidator(setting, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

function getCard(item) {
	const card = new Card(item, '.template-card', {
		handleCardClick: () => {
			popupWithImage.open(card);
		}
	});
	return card
}

const cardsList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = getCard(item);
		const cardElement = card.generateCard();
		cardsList.addItem(cardElement, true);
	}
},
	list
);

const popupPlaceForm = new PopupWithForm({
	popupSelector: '.popup_type_add-card',
	submitHandler: () => {
		const cardAdd = { name: placeInput.value, link: urlInput.value };
		const newCards = cardsList;
		newCards.renderItem(cardAdd);
		popupPlaceForm.close();
	}
});

const profile = new PopupWithForm({
	popupSelector: '.popup_type_edit-profile',
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
});

profile.setEventListeners();

popupPlaceForm.setEventListeners();

popupWithImage.setEventListeners();

cardsList.rendererItems();