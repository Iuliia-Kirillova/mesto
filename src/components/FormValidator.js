export class FormValidator {

	constructor(setting, formElement) {

		this._setting = setting;
		this._formElement = formElement;
	}

	_showInputError = (formElement, inputElement, errorMessage) => {
		const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add('form__item_error');
		errorElement.textContent = errorMessage;
		errorElement.classList.add('form__item-error_active');
	};

	_hideInputError = (formElement, inputElement) => {
		const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove('form__item-error');
		inputElement.classList.remove('form__item_error');
		errorElement.classList.remove('form__item-error_active');
		errorElement.textContent = '';
	};

	_isValid = (formElement, inputElement) => {
		if (!inputElement.validity.valid) {
			this._showInputError(formElement, inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(formElement, inputElement);
		}
	};

	_hasInvalidInput = (inputList) => {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	};

	_toggleButtonState = (inputList) => {

		if (this._hasInvalidInput(inputList)) {
			this.disableSubmitButton();
		} else {
			this.enableSubmitButton();
		}
	};

	enableSubmitButton = () => {
		const buttonList = Array.from(document.querySelectorAll('.submit__button'));
		buttonList.forEach((buttonElement) => {
			buttonElement.removeAttribute('disabled');
			buttonElement.classList.remove('submit__button_disabled');
		})
	}

	disableSubmitButton = () => {
		const buttonList = Array.from(document.querySelectorAll('.submit__button'));
		buttonList.forEach((buttonElement) => {
			buttonElement.classList.add('submit__button_disabled');
			buttonElement.setAttribute('disabled', true);
		})
	}

	disabledValidation = () => {
		const inputList = Array.from(document.querySelectorAll('.form__item'));
		const errorList = Array.from(document.querySelectorAll('.form__item-error'));

		inputList.forEach((inputElem) => {
			inputElem.classList.remove('form__item_error');
		})

		errorList.forEach((errorElem) => {
			errorElem.classList.add('.form__item-error');
			errorElem.textContent = '';
		})
	}

	_setEventListeners = (formElement) => {
		const inputList = Array.from(formElement.querySelectorAll('.form__item'));
		const buttonElement = formElement.querySelector('.submit__button');
		this._toggleButtonState(inputList, buttonElement);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._isValid(formElement, inputElement);
				this._toggleButtonState(inputList, buttonElement);
			});
		});
	};

	enableValidation = () => {
		const formList = Array.from(document.querySelectorAll('.form'));
		formList.forEach((formElement) => {
			formElement.addEventListener('submit', (evt) => {
				evt.preventDefault();
			});
			this._setEventListeners(formElement);
		});
	};
}

