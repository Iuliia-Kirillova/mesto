
export class Card {
    constructor(data, templateElement, { handleCardClick }) {
        this._title = data.name;
        this._image = data.link;
        this._templateElement = templateElement;
        this._handleCardClick = handleCardClick;
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

        this._card.querySelector('.element__photo').src = this._image;
        this._card.querySelector('.element__name').textContent = this._title;
        this._card.querySelector('.element__photo').alt = this._title;

        return this._card;
    }

    _setEventListeners() {
		this._cardRemove = this._card.querySelector('.element__delete');
		this._cardLike = this._card.querySelector('.element__heart');
		this._cardImage = this._card.querySelector('.element__photo');
		
		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._card);
		});

		this._cardRemove.addEventListener('click', () => {
			this._removeCard();
		});

		this._cardLike.addEventListener('click', () => {
			this._likeCard();
		});
	}

_removeCard() {
    this._card.remove();
    this._card = null;
}

_likeCard() {
    this._cardLike.classList.toggle('element__heart_like');
}
}