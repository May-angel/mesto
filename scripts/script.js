let popup = document.querySelector('.popup');
let popupEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-icon');
let popupSaveButton = popup.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__form'); 

let popupToggle = function (event) {
    popup.classList.toggle('popup_opened')
}

let popupCloseOverlay = function (event) {
    if (event.target !== event.currentTarget) { return }
    popupToggle() 
}



function formSubmitHandler (evt) {
    evt.preventDefault();
  
    let nameInput = formElement.querySelector('.popup__input-name');
    let jobInput = formElement.querySelector('.popup__input-occupation');
    let name = document.querySelector('.profile__name');
    let occupation = document.querySelector('.profile__occupation');
    
    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value; 
    popupToggle();
}


popupEditButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)

popup.addEventListener('click', popupCloseOverlay)

formElement.addEventListener('submit', formSubmitHandler);