import Popup from './Popup.js';

export class PopupWithImage extends Popup {

	constructor(popupSelector) {
		super(popupSelector);

		this._popupPicture = popupSelector.querySelector('.popup__img');
		this._popupTitle = popupSelector.querySelector('.popup__imgtitle');
	}

	open(card) {
		this._title = card._title;
		this._image = card._image;

		this._popupPicture.src = this._image;
		this._popupTitle.textContent = this._title;
		this._popupPicture.setAttribute('alt', this._image);
		super.open();
	}
}