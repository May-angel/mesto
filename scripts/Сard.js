const templateElement = document.querySelector('.template-element').content; 
const popupImageZoom = document.querySelector('.popup__image-zoom');
const popupSubtitle = document.querySelector('.popup__subtitle');

//ОБЪЯВЛЕНИЕ КЛАССА
class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;

        this._setEventListeners;
    }
    //МЕТОД: СОЗДАНИЕ КАРТОЧКИ
    createCard(name, link) {
        this.element = templateElement.cloneNode(true);
        const elementTitle = this.element.querySelector('.element__title');
        elementTitle.textContent = name;
        const elementPhoto = this.element.querySelector('.element__photo');
        elementPhoto.alt = name;
        elementPhoto.src = link;
        
        //ВОЗВРАЩАЕТ ЭЛЕМЕНТ КАРТОЧКИ
        return this.element; 
    } 
    //МЕТОД: ПРИМЕНЕНИЕ ЛАЙКА
    _like() {
        const likeButton = this.element.querySelector('.element__like');
        likeButton.classList.toggle('element__like_active');
    }
    //МЕТОД: УДАЛЕНИЕ КАРТОЧКИ
    _remove(event) {
        event.target.className != 'element__trash';
            const card = event.target.closest('.element');
            card.remove();
    }
    //СЛУШАТЕЛИ СОБЫТИЙ
    _setEventListeners() {
        this.element.querySelector('.element__like').addEventListener('click', () => {
            this._like()
        });
        this.element.querySelector('.element__trash').addEventListener('click', () => {
            this._remove()
        });
        this.element.querySelector('.element__photo').addEventListener('click', () => {
            this._openImage()
        });
    }  
    //МЕТОД: ОТКРЫТИЕ КАРТИНКИ НА ВЕСЬ ЭКРАН
    _openImage() {
        this.title = event.target.closest('.element').querySelector('.element__title').textContent; 
        popupImageZoom.src = link;
        popupImageZoom.alt = title;
        popupSubtitle.textContent = title;
        openPopup(popupImage);  
    }
}

export {Card}
 