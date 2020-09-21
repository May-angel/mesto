const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-icon');
const popupCloseButtonEdit = document.querySelector('.popup__close-icon_edit');
const popupCloseButtonAdd = document.querySelector('.popup__close-icon_add');
const popupCloseButtonPhotoZoom = document.querySelector('.popup__close-icon_photo');
const formProfile = document.querySelector('.popup__form_profile'); 
const formAddCard = document.querySelector('.popup__form_add-card'); 
const popupEdit = document.querySelector('.popup_profile'); 
const popupAdd = document.querySelector('.popup_add-card'); 
const popupImage = document.querySelector('.popup_image'); 
const listElement = document.querySelector('.elements'); 
const nameInput = formProfile.querySelector('#profile-name-input');
const jobInput = formProfile.querySelector('#profile-occupation-input');
const profileName = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');
const titleInput = formAddCard.querySelector('#popup-add-name');
const urlInput = formAddCard.querySelector('#popup-add-url');
//const templateElement = document.querySelector('.template-element').content; 
//const popupSubtitle = document.querySelector('.popup__subtitle');
//const popupImageZoom = document.querySelector('.popup__image-zoom');

import { FormValidator } from './FormValidator.js';
import { Card } from './Сard.js';
import { initialCards } from './const.js';
import { conFig } from './config-obj.js';

//СОЗДАНИЕ ЭКЗЕМПЛЯРА КЛАССА 
const newCard = new Card();

//ДОБАВЛЕНИЕ КАРТОЧКИ
function addCard(listElement, element) {
    listElement.prepend(element);
};

//ОТОБРАЖЕНИЕ КАРТОЧЕК
initialCards.forEach(function(element) {
    addCard(listElement, newCard.createCard(element.name, element.link));
});


// ОТКРЫВАЕТ ПОПАП
function openPopup(popupElement) {
       popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', handleEsc);
};

// ЗАКРЫВАЕТ ПОПАП
function closePopup(popupElement) {
        popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', handleEsc);
  };

//ЗАКРЫВАЕТ ПОПАП, ЕСЛИ НАЖАТЬ НА ПУСТУЮ ОБЛАСТЬ
function closePopupByOverlay(popupElement) {
    if (event.target !== event.currentTarget) { return }
    closePopup(popupElement);
};

//ЗАКРЫВАЕТ ПОПАП ЕСЛИ НАЖАТЬ НА ESC
function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen)
    }
};

//АВТОЗАПОЛНЕНИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПРИ ОТКРЫТИИ 
popupEditButton.addEventListener('click', function() {
   nameInput.textContent = profileName.value;
   jobInput.textContent = occupation.value;
   openPopup(popupEdit); 
   
   const formValidatorForEditPopup = new FormValidator(conFig, popupEdit);
   formValidatorForEditPopup._enableValidation();
});

//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function profileFormSubmitHandler(evt) {
   evt.preventDefault();
  
   profileName.textContent = nameInput.value;
   occupation.textContent = jobInput.value; 
   closePopup(popupEdit);
};
//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function elementFormSubmitHandler(evt) {
   evt.preventDefault();

   const name = titleInput.value;
   const link = urlInput.value; 
   addCard(listElement, newCard.createCard(name, link));
   closePopup(popupAdd);
   document.forms[1].reset();
};

popupAddButton.addEventListener('click', function() {
    openPopup(popupAdd);
    
    const formValidatorForAddPopup = new FormValidator(conFig, popupAdd);
    formValidatorForAddPopup._enableValidation();
});

popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));
popupCloseButtonPhotoZoom.addEventListener('click', () => closePopup(popupImage));
popupEdit.addEventListener('click', () => closePopupByOverlay(popupEdit));
popupAdd.addEventListener('click', () => closePopupByOverlay(popupAdd));
popupImage.addEventListener('click', () => closePopupByOverlay(popupImage));
formProfile.addEventListener('submit', profileFormSubmitHandler);
formAddCard.addEventListener('submit', elementFormSubmitHandler);


