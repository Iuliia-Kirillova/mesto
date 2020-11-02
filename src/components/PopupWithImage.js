import Popup from './Popup.js';

export class PopupWithImage extends Popup {

	constructor(popupSelector) {
		super(popupSelector);

		this._popupPicture = popupSelector.querySelector('.popup-image__img');
		this._popupTitle = popupSelector.querySelector('.popup-image__title');
	}

	open(item) {
		this._popupPicture.src = item.link;
		this._popupTitle.textContent = item.name;
		this._popupPicture.setAttribute('alt', item.link);
		super.open();
	}
}