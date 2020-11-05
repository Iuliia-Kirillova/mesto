export class Card {

	constructor(data, user, templateElement, { handleCardClick }, { deleteCard, addLike, removeLike }, api) {
		this._user = user;
		this._title = data.name;
		this._image = data.link;
		this._id = data._id;
		this._templateElement = templateElement;
		this._api = api;
		this._ownerId = data.ownerId;
		this._owner = data.owner;
		this._likes = data.likes;
		this._handleCardClick = handleCardClick;
		this._deleteCard = deleteCard;
		this._addLike = addLike;
		this._removeLike = removeLike;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateElement)
			.content
			.cloneNode(true)
			.querySelector('.element')

		return cardElement;
	}

	generateCard() {
		this._card = this._getTemplate();
		this._setEventListeners();

		this._cardPicture = this._card.querySelector('.element__image');
		this._cardTitle = this._card.querySelector('.element__title');

		this._cardPicture.src = this._image;
		this._cardTitle.textContent = this._title;
		this._cardPicture.setAttribute('alt', this._title);

		this._counter = this._card.querySelector('.element__counter');
		this._counter.textContent = this._likes.length;

		this._showLike();
		this.showBuscket();

		return this._card;
	}

	_setEventListeners() {
		this._cardRemove = this._card.querySelector('.element__delete');
		this._cardLike = this._card.querySelector('.element__like');
		this._cardImage = this._card.querySelector('.element__image');

		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._card);
		});

		this._cardRemove.addEventListener('click', () => {
			this._deleteCard();
		});

		this._cardLike.addEventListener('click', () => {
			this._likeCard()
		});
	}

	removeCard() {
		this._card.remove();
		this._card = null;
	}

	_likeCard() {
		this._cardLike.classList.toggle('element__like_active');

		if (this._cardLike.classList.contains('element__like_active')) {
			this._addLike(this._card);
		} else {
			this._removeLike(this._card);
		}
	}

	setLikesCounter(data) {
		this._counter = this._card.querySelector('.element__counter');
		this._counter.textContent = data.likes.length;
	}

	showBuscket() {
		this._cardRemove = this._card.querySelector('.element__delete');
			if (this._ownerId ===  this._user._id) {
			this._cardRemove.classList.toggle('element__delete-active');
		}
	}

	_showLike() {
		this._likes.forEach(element => {
			if (element._id === this._user._id) {
				this._likeCard();
			}
		});
	}
}
