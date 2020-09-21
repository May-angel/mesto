class FormValidator {
    constructor(conFig ,formElement) {
        this.formSelector = conFig.formSelector;
        this.inputSelector = conFig.inputSelector;
        this.submitButtonSelector = conFig.submitButtonSelector;
        this.inactiveButtonClass = conFig.inactiveButtonClass;
        this.inputErrorClass = conFig.inputErrorClass;
        this.errorClass = conFig.errorClass; 
        this.formElement = formElement;
    }
    //ПОКАЗЫВАЕТ ТЕКСТ ОШИБКИ
    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }
    //СКРЫВАЕТ ТЕКСТ ОШИБКИ
    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }
    //ПРОВЕРЯЕТ ВАЛИДНОСТЬ ИНПУТОВ
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    //ОБХОДИТ МАССИВ ПОЛЕЙ И ПРОВЕРЯЕТ ВСЕ ЛИ ПОЛЯ ПРОШЛИ ВАЛИДАЦИЮ
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    //БЛОКИРУЕТ КНОПКУ САБМИТА
    _toggleButtonState(inputList) {
        const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
    //СЛУШАТЕЛИ СОБЫТИЙ ИНПУТОВ
    _setEventListeners() {
        const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
        const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
  
        this._toggleButtonState(inputList);
  
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () =>  
                this._checkInputValidity(inputElement),
                this._toggleButtonState(inputList)
            );
        });
    }
    //ПРИМЕНЯЕТ ВАЛИДАЦИЮ
    _enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
                this._setEventListeners();
        });
    }
}

export {FormValidator}
import { conFig } from './config-obj.js';