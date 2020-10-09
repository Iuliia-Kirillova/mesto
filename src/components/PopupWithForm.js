import Popup from './Popup.js';

export class PopupWithForm extends Popup {

	constructor({ popupSelector, submitHandler }) {
		super(popupSelector);

		this._submitHandler = submitHandler;
		this._formSubmitHandler = this._formSubmitHandler.bind(this);
		this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach(input =>
			this._formValues[input.name] = input.value);

		return this._formValues;
	}

	close() {
		this._inputList.forEach(element => {
			element.textContent = '';
		});
		super.close();
	}

	_formSubmitHandler(evt) {
		evt.preventDefault();
		this._submitHandler(this._getInputValues());
	}


	setEventListeners() {
		this._popup.addEventListener('submit', this._formSubmitHandler);
		super.setEventListeners(); 
	}
}