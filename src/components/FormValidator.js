export class FormValidator {
    constructor(setting, formElement) {
        this._formElement = formElement;
        this._inputSelector = setting.inputSelector;
        this._errorInputSelector = setting.errorInputSelector;
        this._inputErrorClass = setting.inputErrorClass;
        this._submitButtonSelector = setting.submitButtonSelector;
        this._inactiveButtonClass = setting.inactiveButtonClass;
        this._errorClass = setting.errorClass;
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`)
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _isFormValid(inputs) {
        return inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    enableSubmitButton() {
        const buttonList = Array.from(document.querySelectorAll(this._submitButtonSelector));
        buttonList.forEach((buttonElement) => {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._inactiveButtonClass);
        })
    }

    disableSubmitButton() {
        const buttonList = Array.from(document.querySelectorAll(this._submitButtonSelector));
        buttonList.forEach((buttonElement) => {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true
        });
    };

    _toggleButtonState(inputs, submitButtonSelector) {
        if (this._isFormValid(inputs)) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }

    clearInputErrors() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const errorList = Array.from(this._formElement.querySelectorAll(this._errorInputSelector));

        inputList.forEach((inputElem) => {
            inputElem.classList.remove(this._inputErrorClass);
            this._formElement.reset();
            this._toggleButtonState(inputList, errorList);
        })

        errorList.forEach((errorElem) => {
            errorElem.textContent = '';
            errorElem.classList.remove(this._errorClass);
        })
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`)
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputs, buttonSubmit);

        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputs, buttonSubmit);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('sumbit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

}