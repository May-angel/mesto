//const templateElement = document.querySelector('.template-element').content; 
const popupImageZoom = document.querySelector('.popup__image-zoom');
const popupSubtitle = document.querySelector('.popup__subtitle');
import { openPopup } from './script.js';
import { popupImage } from './script.js';

//ОБЪЯВЛЕНИЕ КЛАССА
class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }
    //МЕТОД: СОЗДАНИЕ КАРТОЧКИ
    createCard(name, link) {
        this.element = document.querySelector('.template-element').content.querySelector('.element').cloneNode(true);
        const elementTitle = this.element.querySelector('.element__title');
        elementTitle.textContent = name;
        const elementPhoto = this.element.querySelector('.element__photo');
        elementPhoto.alt = name;
        elementPhoto.src = link;
        this._setEventListeners();
        //ВОЗВРАЩАЕТ ЭЛЕМЕНТ КАРТОЧКИ
        return this.element; 
    } 
    //МЕТОД: ПРИМЕНЕНИЕ ЛАЙКА
    _like(event) {
        event.target.classList.toggle('element__like_active');
    }
    //МЕТОД: УДАЛЕНИЕ КАРТОЧКИ
    _remove(event) {
        event.target.className != 'element__trash';
           const card = event.target.closest('.element');
           card.remove();
    }
    //СЛУШАТЕЛИ СОБЫТИЙ
    _setEventListeners() {
        this.element.querySelector('.element__like').addEventListener('click', this._like.bind(this));
        this.element.querySelector('.element__trash').addEventListener('click', this._remove.bind(this));
        this.element.querySelector('.element__photo').addEventListener('click', this._openImage.bind(this));
    }  
    //МЕТОД: ОТКРЫТИЕ КАРТИНКИ НА ВЕСЬ ЭКРАН
    _openImage(event) {
        this.title = event.target.closest('.element').querySelector('.element__title').textContent; 
        popupImageZoom.src = this.element.querySelector('.element__photo').src;
        popupImageZoom.alt = this.title;
        popupSubtitle.textContent = this.title;
        openPopup(popupImage);  
    }
}

export {Card}
 