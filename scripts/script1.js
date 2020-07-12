//подложка под всплывающее окно
let overlay	= document.querySelector('.popup'); 
// коллекция всех элементов на странице, которые могут открывать всплывающие окна
	// их отличительной особенность является наличие атрибута '[data-modal]'
pOpen = document.querySelector('[data-modal]');
// коллекция всех элементов на странице, которые могут закрывать всплывающие окна
	// их отличительной особенность является наличие атрибута '[data-close]'
pClose = document.querySelector('[data-close]');
// флаг всплывающего окна: false - окно закрыто, true - открыто
pStatus = false;

// если нет элементов управления всплывающими окнами, прекращаем работу скрипта
//if (pOpen.length == 0) return;


[].forEach.call(pOpen, function(event) {
	// вешаем обработчик события на каждый элемент коллекции
	event.addEventListener('click', function(e) {
		// получаем значение атрибута ['data-modal'], которое
		// является id всплывающего окна
		let modalId	= event.getAttribute('data-modal'),
			// используя id, получаем объект всплывающего окна,
			// которое мы собираемся открыть
			modal = document.getElementById(modalId);
 
		// вызываем функцию открытия всплывающего окна, аргументом
		// является объект всплывающего окна
		modalShow(modal);
	});
});


function modalShow(modal) {
	// показываем подложку всплывающего окна
	overlay.classList.toggle('popup_opened')
	// определяем тип анимации появления всплывающего окна
	// убираем и добавляем классы, соответствующие типу анимации
	if (typeAnimate == 'fade') {
		modal.classList.toggle('popup_opened');
	} else if (typeAnimate == 'slide') {
		modal.classList.remove('slideOutUp');
		modal.classList.add('slideInDown');
	}
	// выставляем флаг, обозначающий, что всплывающее окно открыто
	mStatus = true;
}

[].forEach.call(pClose, function(el) {
	el.addEventListener('click', modalClose);
});

document.addEventListener('keydown', modalClose);

function modalClose() {
	// проверяем выполнение условия
	if (pStatus && ( !event.keyCode || event.keyCode === 27 ) ) {
		// собираем коллекцию объектов всех всплывающих окон на странице
		let modals = document.querySelectorAll('.popup');
 
		// обходим по очереди каждый элемент коллекции (каждое всплывающее окно)
		// и в зависимости от типа анимации, используемой на данной странице,
		// удаляем класс анимации открытия окна и добавляем класс анимации закрытия
		[].forEach.call(modals, function(modal) {
			if (typeAnimate == 'fade') {
				modal.classList.remove('popup_opened');
			} else if (typeAnimate == 'slide') {
	
				modal.classList.add('popup_opened');
			}
        });
       // закрываем overlay
       overlay.classList.remove('popup_opened');
		// сбрасываем флаг, устанавливая его значение в 'false'
		// это значение указывает нам, что на странице нет открытых
		// всплывающих окон
		mStatus = false;
	}
}
 