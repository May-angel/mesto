let popup = document.querySelector('.popup');
let popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__form'); 
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#occupation');
let name = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');

function popupToggle (event) {
    popup.classList.toggle('popup_opened')
    nameInput.textContent = name.value;
    jobInput.textContent = occupation.value; 
}

function popupCloseOverlay (event) {
    if (event.target !== event.currentTarget) { return }
    popupToggle() 
}

function formSubmitHandler (evt) {
    evt.preventDefault();
  
    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value; 
    popupToggle();
}


popupEditButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)

popup.addEventListener('click', popupCloseOverlay)

formElement.addEventListener('submit', formSubmitHandler);