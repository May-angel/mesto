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
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup__form_profile'); 
const formElement = document.querySelector('.popup__form_element'); 
const listElement = document.querySelector('.elements'); 
const templateElement = document.querySelector('.template-element').content; 
const nameInput = formProfile.querySelector('#name');
const jobInput = formProfile.querySelector('#occupation');
let profileName = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');
const titleInput = formElement.querySelector('#title');
const urlInput = formElement.querySelector('#link');
let link = document.querySelector('.element__photo.src');
let popupSubtitle = document.querySelector('.popup__subtitle');
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
    likeButton.addEventListener('click',  function(event) {
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

// ДЕЛАЕТ ПОПАП ВИДИМЫМ
function popupToggle(elem) {
    let buttonClassValue = elem.getAttribute('class');
    switch (buttonClassValue) {
        case 'profile__edit-button':
           showPopUpClassValue = 'popup_profile';
            break;
        case 'profile__add-button':
            showPopUpClassValue = 'popup_element';
            break;
        case 'element__photo':
            showPopUpClassValue = 'popup_image';
            break;
    };

    let showPopUp = document.getElementsByClassName(showPopUpClassValue).item(0);
    showPopUp.classList.toggle("popup_opened"); 
   };

document.onclick = function(objectDetect) {
    switch (objectDetect.target.getAttribute('class')) {
        case 'profile__edit-button':
        case 'profile__add-button':
        case 'element__photo':
            popupToggle (objectDetect.target);
            break;
        case 'popup__close-icon':
            popupToggle (objectDetect.target);
            break;
        default:
            if (document.querySelector('.popup_opened')) { 
                ifPopupVisible (objectDetect, document.querySelector('.popup_opened'));
            };
            break;
    };
};        

// ЕСЛИ ПОПАП ОТКРЫТ, ОПРЕДЕЛЯЕТ КООРДИНАТЫ КЛИКА
// ЕСЛИ КЛИК ВНЕ ПОПАПА, ПОПАП ЗАКРЫВАЕТСЯ
function ifPopupVisible (object, popUp) {
    const popUpCoord = popUp.children[0].getBoundingClientRect();

    const openedPopupImgCoord_X1 = popUpCoord.x;
    const openedPopupImgCoord_X2 = popUpCoord.x + popUpCoord.width;
    const openedPopupImgCoord_Y1 = popUpCoord.y;
    const openedPopupImgCoord_Y2 = popUpCoord.y + popUpCoord.height;

    if (!((object.clientX >= openedPopupImgCoord_X1) && (object.clientX <= openedPopupImgCoord_X2) && (object.clientY >= openedPopupImgCoord_Y1) && (object.clientY <= openedPopupImgCoord_Y2))) {
        popupToggle (object.target);
    };
};

//АВТОЗАПОЛНЕНИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПРИ ОТКРЫТИИ 
popupEditButton.addEventListener("click", function() {
   nameInput.textContent = profileName.value;
   jobInput.textContent = occupation.value; 
});

//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function profileFormSubmitHandler(evt) {
   evt.preventDefault();
  
   profileName.textContent = nameInput.value;
   occupation.textContent = jobInput.value; 
   popupToggle(event.target);
};
//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function elementFormSubmitHandler(evt) {
   evt.preventDefault();
  
   name = titleInput.value;
   link = urlInput.value; 
   addCard (name, link);
   popupToggle(event.target);
};

formProfile.addEventListener('submit', profileFormSubmitHandler);
formElement.addEventListener('submit', elementFormSubmitHandler);

