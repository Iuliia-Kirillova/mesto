import './index.css';
import {
	popupProfile,
	popupPlace,
	popupProfileOpenButton,
	popupPlaceAddButton,
	nameInput,
	jobInput,
	pictureInput,
	titleInput,
	placeForm,
	placeNameInput,
	placeJobInput,
	popupImage,
	cardsContainer,
	setting,
	popupWithSubmit,
	popupAvatar,
	popupAvatarOpenButton,
	placeAvatarInput,
	avatarInput,
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const popupWithImage = new PopupWithImage(popupImage);
const userInfo = new UserInfo(placeNameInput, placeJobInput, placeAvatarInput);
const editForm = new FormValidator(setting, '.form__edit');
const cardForm = new FormValidator(setting, '.form__card');
const avatarForm = new FormValidator(setting, '.form__avatar');

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-17/',
	headers: {
		authorization: '3c342042-7509-4c70-8adf-ec3f335d930a',
		'Content-Type': 'application/json'
	},
});

Promise.all([
	api.getUserData(),
	api.getInitialCards()
])
	.then((values) => {
		const [userData, initialCards] = values;

		userInfo.getUserInfo(userData);
		userInfo.setUserInfo(userData);

		const cardsArray = renderCards(initialCards, userData);
		cardsArray.rendererItems();
	})
	.catch((err) => {
		console.log(err);
	})

function renderCards(data, user) {
	const cardsList = new Section({
		items: data,
		renderer: (item) => {
			const card = getCard(item, user);

			const cardElement = card.generateCard();
			cardsList.addItem(cardElement);
		}
	},
		cardsContainer,
		'https://mesto.nomoreparties.co/v1/cohort-16/cards'
	);
	return cardsList
}

const popupPlaceForm = new PopupWithForm({
	popupSelector: popupPlace,
	submitHandler: () => {
		popupPlaceForm.renderLoading(true);
		const apiNewCard = api.addCards({
			name: titleInput.value,
			link: pictureInput.value,
		});
		apiNewCard.then((data) => {
			popupPlaceForm.renderLoading(false);
			const newCard = renderCards(data, data.owner._id);
			newCard.renderItem(data, data.owner._id);
			popupPlaceForm.close();
		})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}
});

const profile = new PopupWithForm({
	popupSelector: popupProfile,
	submitHandler: () => {
		profile.renderLoading(true);
		const apiEditUser = api.editUserData({
			name: nameInput.value,
			about: jobInput.value
		});
		apiEditUser.then((data) => {
			userInfo.setUserInfo(data);
			profile.renderLoading(false)
			profile.close();
		})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}
});

const avatar = new PopupWithForm({
	popupSelector: popupAvatar,
	submitHandler: () => {
		avatar.renderLoading(true);
		const apiUser = api.editAvatar({ avatar: avatarInput.value });

		apiUser.then((data) => {
			const userData = userInfo.getUserInfo(data);
			userInfo.saveUserInfo(userData, placeNameInput, placeJobInput, placeAvatarInput);
			avatar.renderLoading(false);
			avatar.close();
		})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}
})

function getCard(item, user) {
	const card = new Card(item, user, '.template-card',
		{
			handleCardClick: () => {
				popupWithImage.open(item);
				popupWithImage.setEventListeners();
			}
		},
		{
			deleteCard: () => {
				const popupSubmit = new PopupWithForm({
					popupSelector: popupWithSubmit,
					submitHandler: () => {
						const apiDeleteCard = api.deleteCard(item);
						apiDeleteCard.then(() => {
							card.removeCard();
							popupSubmit.close();

						})
							.catch((err) => {
								console.log(`Ошибка: ${err}`);
							});
					}
				});
				popupSubmit.open();
				popupSubmit.setEventListeners();
			},
			addLike: () => {
				const apiLikeCard = api.addLike(card);
				apiLikeCard.then((data) => {
					card.setLikesCounter(data);
				})
					.catch((err) => {
						console.log(`Ошибка: ${err}`);
					});
			},
			removeLike: () => {
				const apiRemoveLike = api.removeLikes(card);
				apiRemoveLike.then((data) => {
					card.setLikesCounter(data);
				})
					.catch((err) => {
						console.log(`Ошибка: ${err}`);
					});
			}
		},
		'https://mesto.nomoreparties.co/v1/cohort-16/cards');
	return card
}

popupAvatarOpenButton.addEventListener('click', () => {
	avatarForm.disabledValidation();
	avatarForm.disableSubmitButton();
	avatar.open();
	avatar.setEventListeners();
})

popupPlaceAddButton.addEventListener('click', () => {
	cardForm.disabledValidation();
	cardForm.disableSubmitButton();
	placeForm.reset();
	popupPlaceForm.open();
	popupPlaceForm.setEventListeners();
});

popupProfileOpenButton.addEventListener('click', () => {
	editForm.disabledValidation();
	editForm.enableSubmitButton();
	const apiUser = api.getUserData();
	apiUser.then((data) => {
		const userData = userInfo.getUserInfo(data);
		userInfo.saveUserInfo(userData, nameInput, jobInput, avatarInput);
		nameInput.value = placeNameInput.textContent;
		jobInput.value = placeJobInput.textContent;
		profile.open();
		profile.setEventListeners();
	})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		})
});

editForm.enableValidation();
cardForm.enableValidation();
