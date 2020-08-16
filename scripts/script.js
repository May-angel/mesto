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
const popupCloseButtons = document.querySelectorAll('.popup__close-icon'); 
const formProfile = document.querySelector('.popup__form_profile'); 
const formElement = document.querySelector('.popup__form_element'); 
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

// ЗАПОЛНЕНИЕ КАРТОЧЕК НА ОСНОВЕ ВВЕДЕНЫХ ДАННЫХ
function addCard(name, link) {
    const element = templateElement.cloneNode(true);
    let elementTitle = element.querySelector('.element__title');
    elementTitle.textContent = name;
    let elementPhoto = element.querySelector('.element__photo');
    elementPhoto.alt = name;
    elementPhoto.src = link;
//ПРИМЕНЕНИЕ ЛАЙКА
    let likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_active');
    });
//УДАЛЕНИЕ КАРТОЧКИ
    let trashButton = element.querySelector('.element__trash');
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
     });

    listElement.prepend(element);
};


// ОТОБРАЖЕНИЕ КАРТОЧЕК
initialCards.forEach(function(element) {
    addCard(element.name, element.link);
});

// ОТКРЫВАЕТ ПОПАП
const btns = document.querySelectorAll('.profile__button');
btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');
        document.querySelector(`[data-target="${path}"]`).classList.toggle('popup_opened');
    })
});


// ЗАКРЫВАЕТ ПОПАП
function popupClose (item) {
    item.addEventListener('click', function(e) {
        let parentPopup = event.target.closest('.popup');
         parentPopup.classList.toggle('popup_opened');
   });
  };

popupCloseButtons.forEach(popupClose);

//ЗАКРЫВАЕТ ПОПАП, ЕСЛИ НАЖАТЬ НА ПУСТУЮ ОБЛАСТЬ
function popupOverlay (item) {
    item.addEventListener('click', function(e) {
    if (event.target !== event.currentTarget) { return }
    item.classList.toggle('popup_opened');
  });
};

popups.forEach(popupOverlay);


//АВТОЗАПОЛНЕНИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПРИ ОТКРЫТИИ 
popupEditButton.addEventListener('click', function() {
   nameInput.textContent = profileName.value;
   jobInput.textContent = occupation.value; 
});

//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function profileFormSubmitHandler(evt) {
   evt.preventDefault();
  
   profileName.textContent = nameInput.value;
   occupation.textContent = jobInput.value; 
   popupClose(event.target);
};
//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function elementFormSubmitHandler(evt) {
   evt.preventDefault();
  
   name = titleInput.value;
   link = urlInput.value; 
   addCard (name, link);
   popupClose(event.target);
};

formProfile.addEventListener('submit', profileFormSubmitHandler);
formElement.addEventListener('submit', elementFormSubmitHandler);

