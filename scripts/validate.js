//ФУНКЦИЯ ПОКАЗЫВАЕТ ТЕКСТ ОШИБКИ
function showInputError(formElement, inputElement, inputErrorClass, errorMessage, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    console.log('jhj');
  };
  
//ФУНКЦИЯ СКРЫВАЕТ ТЕКСТ ОШИБКИ
  function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  //ПРОВЕРЯЕТ ВАЛИДНОСТЬ ИНПУТОВ
  function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };
  
  //ОБХОДИТ МАССИВ ПОЛЕЙ И ПРОВЕРЯЕТ ВСЕ ЛИ ПОЛЯ ПРОШЛИ ВАЛИДАЦИЮ
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  }
  
  //БЛОКИРУЕТ КНОПКУ САБМИТА
  function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };   
  
  //ФУНКЦИЯ-ОБРАБОТЧИК ДЛЯ ИНПУТОВ
  function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {  
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };
  
  //ПРИМЕНЯЕТ ВАЛИДАЦИЮ
  function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement, {inputSelector, submitButtonSelector, inputErrorClass, errorClass});
    });
  };

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: '.popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__text-error'
 });