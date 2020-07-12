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
const popupCloseButton = popup.querySelector('.popup__close-icon');
const formProfile = document.querySelector('.popup__form_profile'); 
const formElement = document.querySelector('.popup__form_element'); 
const listElement = document.querySelector('.elements'); 
const templateElement = document.querySelector('.template-element').content; 

let popupTriggers = document.querySelectorAll('[data-popup-trigger]')
let nameInput = formProfile.querySelector('#name');
let jobInput = formProfile.querySelector('#occupation');
let name = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');

let titleInput = formElement.querySelector('#title');
let urlInput = formElement.querySelector('#link');
let link = document.querySelector('.element__photo.src');
let popupSubtitle = document.querySelector('.popup__subtitle');

let popupProfile = document.querySelector('.popup_profile')
let popupElement = document.querySelector('.popup_element')
let popupImage = document.querySelector('.popup_image') 
let popupImageZoom = document.querySelector('.popup__image-zoom');
let popupSelect = document.querySelectorAll('[data-toggle-id]')

// ЗАПОЛНЕНИЕ КАРТОЧЕК НА ОСНОВЕ ВВЕДЕНЫХ ДАННЫХ
function addCard (name, link) {
    const element = templateElement.cloneNode(true)

    element.querySelector('.element__title').textContent = name;
    element.querySelector('.element__photo').alt = name;
    element.querySelector('.element__photo').src = link;
//ПРИМЕНЕНИЕ ЛАЙКА
    let likeButton = element.querySelector('.element__like')
    likeButton.addEventListener('click',  function(event) {
    event.target.classList.toggle('element__like_active');
    });
//УДАЛЕНИЕ КАРТОЧКИ
    let trashButton = element.querySelector('.element__trash')
    trashButton.addEventListener('click', function(event) {
    if (event.target.className != 'element__trash') return;
    let card = event.target.closest('.element');
    card.remove();
});

//ОТКРЫТИЕ КАРТИНКИ НА ВЕСЬ ЭКРАН
    let elementPhoto = element.querySelector('.element__photo');
    elementPhoto.addEventListener("click", function() {
        title = event.target.closest('.element').querySelector('.element__title').textContent;
        popupImageZoom.src = link;
        popupImageZoom.alt = title;
        popupSubtitle.textContent = title;
        popupToggle(elementPhoto)
     })


    listElement.prepend(element);
}
// ОТОБРАЖЕНИЕ КАРТОЧЕК
initialCards.forEach(function(element){
    addCard(element.name, element.link)
})

// ДЕЛАЕТ ПОПАП ВИДИМЫМ
function popupToggle(elem) {
    //console.log(elem);

    let buttonClassValue = elem.getAttribute('class');
//(console.log(buttonClassValue))
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
    }

    let showPopUp = document.getElementsByClassName(showPopUpClassValue).item(0);
    showPopUp.classList.toggle("popup_opened"); 
   //console.log(showPopUp);
   }

//ПЕРЕКЛЮЧАЕТ КЛАСС ПО СОБЫТИЮ
const popupChoice = function(event) {
    popupToggle(event.target)
}

//АВТОЗАПОЛНЕНИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ ПРИ ОТКРЫТИИ 
popupEditButton.addEventListener("click", function() {
   nameInput.textContent = name.value;
   jobInput.textContent = occupation.value; 
})
//ЗАКРЫВАЕТ ПОПАП, ЕСЛИ НАЖАТЬ НА ПУСТУЮ ОБЛАСТЬ
const popupCloseOverlay = function(event) {
  if (event.target !== event.currentTarget) { return }
  popupChoice(event);
}
//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function profileFormSubmitHandler(evt) {
   evt.preventDefault();
  
   name.textContent = nameInput.value;
   occupation.textContent = jobInput.value; 
   popupChoice(event);
}
//ДЛЯ СОХРАНЕНИЯ ВВЕДЕННЫХ ДАННЫХ В ФОРМЕ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function elementFormSubmitHandler(evt) {
   evt.preventDefault();
  
   name = titleInput.value;
   link = urlInput.value; 
   addCard (name, link);
   popupChoice(event);
}

popupEditButton.addEventListener('click', popupChoice);
popupAddButton.addEventListener('click', popupChoice);
popupCloseButton.addEventListener('click', popupChoice);


popupImage.addEventListener('click', popupChoice);
popup.addEventListener('click', popupCloseOverlay);

formProfile.addEventListener('submit', profileFormSubmitHandler);
formElement.addEventListener('submit', elementFormSubmitHandler);

