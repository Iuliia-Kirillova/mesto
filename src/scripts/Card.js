// import {  } from './utils.js';
import { openModalWindow, imageModal } from './utils/utils.js';

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = templateSelector;
    }

    _getTemplate() {
        this._newCard = this._cardTemplate.content.querySelector('.element').cloneNode(true);
        return this._newCard;
    }

    _handleImageClick() {
        const imageModal = document.querySelector('.popup_type_image');
        const imageModalTitle = imageModal.querySelector('.popup__imgtitle');
        const imageModalImg = imageModal.querySelector('.popup__img');
        imageModalTitle.textContent = this._name;
        imageModalImg.src = this._link;
        imageModalImg.alt = this._name;
        openModalWindow(imageModal);
    }

    _setEventListeners(elementImage) {
        this._newCard.querySelector('.element__heart').addEventListener('click', () => this._likeCard());
        this._newCard.querySelector('.element__delete').addEventListener('click', () => this._removeCard());
        this._newCard.querySelector('.element__photo').addEventListener('click', () => this._handleImageClick());
    }

    _removeCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _likeCard() {
        this._newCard.querySelector('.element__heart').classList.toggle('element__heart_like');
    }


    getView() {
        this._getTemplate();
        const elementImage = this._newCard.querySelector('.element__photo');
        this._setEventListeners(elementImage);
        this._newCard.querySelector('.element__name').textContent = this._name;
        elementImage.src = this._link;
        elementImage.alt = this._name;

        return this._newCard;
    }
}

