const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close-icon');
const popupCloseButtonEdit = document.querySelector('.popup__close-icon_edit');
const popupCloseButtonAdd = document.querySelector('.popup__close-icon_add');
const popupCloseButtonPhotoZoom = document.querySelector('.popup__close-icon_photo');
const formProfile = document.querySelector('.popup__form_profile'); 
const formElement = document.querySelector('.popup__form_element'); 
const popupEdit = document.querySelector('.popup_profile'); 
const popupAdd = document.querySelector('.popup_element'); 
const popupImage = document.querySelector('.popup_image'); 
const listElement = document.querySelector('.elements'); 
const templateElement = document.querySelector('.template-element').content; 
const nameInput = formProfile.querySelector('#name');
const jobInput = formProfile.querySelector('#occupation');
const profileName = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');
const titleInput = formElement.querySelector('#title');
const urlInput = formElement.querySelector('#link');
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
        if (event.target.className != 'element__trash') return;
        let card = event.target.closest('.element');
        card.remove();
    });

//ОТКРЫТИЕ КАРТИНКИ НА ВЕСЬ ЭКРАН
    elementPhoto.addEventListener('click', function() {
        title = event.target.closest('.element').querySelector('.element__title').textContent; 
        popupImageZoom.src = link;
        popupImageZoom.alt = title;
        popupSubtitle.textContent = title;
        popupOpen (event);
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
function popupOpen (e) {
        const path = e.currentTarget.getAttribute('data-path');
        document.querySelector(`[data-target="${path}"]`).classList.toggle('popup_opened');
};

// ЗАКРЫВАЕТ ПОПАП
function popupClose (event) {
        const parentPopup = event.target.closest('.popup');
        parentPopup.classList.toggle('popup_opened');
  };

//ЗАКРЫВАЕТ ПОПАП, ЕСЛИ НАЖАТЬ НА ПУСТУЮ ОБЛАСТЬ
function popupOverlay (event) {
   // item.addEventListener('click', function(e) {
    if (event.target !== event.currentTarget) { return }
    popupClose(event);
    //item.classList.toggle('popup_opened');
 // });
};

//АВТОЗАПОЛНЕНИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПРИ ОТКРЫТИИ 
popupEditButton.addEventListener('click', function() {
   nameInput.textContent = profileName.value;
   jobInput.textContent = occupation.value;
   popupOpen(event); 
});

//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function profileFormSubmitHandler(evt) {
   evt.preventDefault();
  
   profileName.textContent = nameInput.value;
   occupation.textContent = jobInput.value; 
   popupClose(event);
};
//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function elementFormSubmitHandler(evt) {
   evt.preventDefault();

   let name = titleInput.value;
   let link = urlInput.value; 
   addCard(listElement, createCard(name, link));
   popupClose(event);
};

popupAddButton.addEventListener('click', popupOpen);
popupCloseButtonEdit.addEventListener('click', popupClose);
popupCloseButtonAdd.addEventListener('click', popupClose);
popupCloseButtonPhotoZoom.addEventListener('click', popupClose);
popupEdit.addEventListener('click', popupOverlay);
popupAdd.addEventListener('click', popupOverlay);
popupImage.addEventListener('click', popupOverlay);
formProfile.addEventListener('submit', profileFormSubmitHandler);
formElement.addEventListener('submit', elementFormSubmitHandler);

