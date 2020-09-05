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
const templateElement = document.querySelector('.template-element').content; 
const nameInput = formProfile.querySelector('#profile-name-input');
const jobInput = formProfile.querySelector('#profile-occupation-input');
const profileName = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');
const titleInput = formAddCard.querySelector('#popup-add-name');
const urlInput = formAddCard.querySelector('#popup-add-url');
const popupSubtitle = document.querySelector('.popup__subtitle');
const popupImageZoom = document.querySelector('.popup__image-zoom');

//СОЗДАНИЕ КАРТОЧКИ
function createCard(name, link) {
    const element = templateElement.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    elementTitle.textContent = name;
    const elementPhoto = element.querySelector('.element__photo');
    elementPhoto.alt = name;
    elementPhoto.src = link;
    
//ПРИМЕНЕНИЕ ЛАЙКА
    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_active');
    });
//УДАЛЕНИЕ КАРТОЧКИ
    const trashButton = element.querySelector('.element__trash');
    trashButton.addEventListener('click', function(event) {
        event.target.className != 'element__trash';
        const card = event.target.closest('.element');
        card.remove();
    });

//ОТКРЫТИЕ КАРТИНКИ НА ВЕСЬ ЭКРАН
    elementPhoto.addEventListener('click', function() {
        title = event.target.closest('.element').querySelector('.element__title').textContent; 
        popupImageZoom.src = link;
        popupImageZoom.alt = title;
        popupSubtitle.textContent = title;
        openPopup(popupImage);
     });
     
     return element;  
};

//ДОБАВЛЕНИЕ КАРТОЧКИ
function addCard(listElement, element) {
    listElement.prepend(element);
};

// ОТОБРАЖЕНИЕ КАРТОЧЕК
initialCards.forEach(function(element) {
    addCard(listElement, createCard(element.name, element.link));
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
   enableValidation(conFig);
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
   addCard(listElement, createCard(name, link));
   closePopup(popupAdd);
   document.forms[1].reset();
};

popupAddButton.addEventListener('click', function() {
    openPopup(popupAdd);
    enableValidation(conFig);
});

popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));
popupCloseButtonPhotoZoom.addEventListener('click', () => closePopup(popupImage));
popupEdit.addEventListener('click', () => closePopupByOverlay(popupEdit));
popupAdd.addEventListener('click', () => closePopupByOverlay(popupAdd));
popupImage.addEventListener('click', () => closePopupByOverlay(popupImage));
formProfile.addEventListener('submit', profileFormSubmitHandler);
formAddCard.addEventListener('submit', elementFormSubmitHandler);


