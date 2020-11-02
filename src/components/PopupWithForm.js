import Popup from './Popup.js';

export class PopupWithForm extends Popup {

	constructor({ popupSelector, submitHandler }) {
		super(popupSelector);

		this._submitHandler = submitHandler;
		this._formSubmitHandler = this._formSubmitHandler.bind(this);
	}

	_getInputValues() {
		this._inputList = Array.from(this._popupSelector.querySelectorAll('.form__item'));
		this._formValues = {};
		this._inputList.forEach(input =>
			this._formValues[input.name] = input.value);

		return this._formValues;
	}

	close() {
		const inputList = Array.from(this._popupSelector.querySelectorAll('.form__item'));
		inputList.forEach(element => {
			element.textContent = '';
		});
		this._popupSelector.removeEventListener('submit', this._formSubmitHandler);

		super.close();
	}

	_formSubmitHandler(evt) {
		evt.preventDefault();
		this._submitHandler(this._getInputValues());
	}

	renderLoading(isLoading) {
		this._submitButton = this._popupSelector.querySelector('.submit__button');
		if (isLoading) {
			this._submitButton.textContent = 'Сохранение...';
		} else {
			this._submitButton.textContent = 'Сохранить';
		}
	}

	setEventListeners() {
		this._popupSelector.addEventListener('submit', this._formSubmitHandler);

		super.setEventListeners();
	}
}