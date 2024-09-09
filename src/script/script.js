const siteSwiper = document.querySelector('.site-swiper');

if (siteSwiper) {
    // Объект для хранения позиции прокрутки каждого слайда
    let scrollPositions = {};

    let mainSiteSwiper = new Swiper(siteSwiper, {
        direction: "vertical",
        mousewheel: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                const labels = [
                    'Обуховка',
                    'Преимущества',
                    'О нас',
                    'Услуги',
                    'Галерея',
                    'Наши цены',
                    'Контакты'
                ];

                let paginationHTML = '';
                const isBenefitsSlide = labels[current - 1] === 'Преимущества' || labels[current - 1] === 'Услуги' || labels[current - 1] === 'Наши цены';

                for (let i = 1; i <= total; i++) {
                    const isActive = i === current;
                    const additionalClass = isBenefitsSlide ? 'black' : '';

                    paginationHTML += `
                        <div class="custom-pagination-item ${isActive ? 'active' : ''} ${additionalClass}" data-index="${i - 1}">
                            <div class="progress-bar"></div>
                            <span>${labels[i - 1]}</span>
                        </div>
                    `;
                }
                return paginationHTML;
            },
        },
        speed: 1500, // Устанавливаем скорость перехода слайдов
        on: {
            // Сохраняем позицию прокрутки перед сменой слайда
            slideChangeTransitionStart: function () {
                saveScrollPositions();
            },
            // Восстанавливаем позицию прокрутки при переходе на слайд
            slideChangeTransitionEnd: function () {
                restoreScrollPositions();
            }
        }
    });

    // Функция для сохранения позиций прокрутки всех scrollable-content на активном слайде
    function saveScrollPositions() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach((scrollableContent, index) => {
            // Сохраняем текущую позицию прокрутки в объект scrollPositions
            scrollPositions[activeSlide.dataset.swiperSlideIndex] = scrollPositions[activeSlide.dataset.swiperSlideIndex] || {};
            scrollPositions[activeSlide.dataset.swiperSlideIndex][index] = scrollableContent.scrollTop;
        });
    }

    // Функция для восстановления позиций прокрутки на активном слайде
    function restoreScrollPositions() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach((scrollableContent, index) => {
            const savedScrollTop = scrollPositions[activeSlide.dataset.swiperSlideIndex]?.[index] || 0;
            scrollableContent.scrollTop = savedScrollTop;
        });
    }

    // Добавляем обработчик кликов по кастомной пагинации
    document.querySelector('.swiper-pagination').addEventListener('click', function (event) {
        const target = event.target.closest('.custom-pagination-item');
        if (target) {
            const index = parseInt(target.getAttribute('data-index'), 10);
            mainSiteSwiper.slideTo(index);
        }
    });

    // Проверяем состояние прокрутки для всех scrollable-content на активном слайде
    function checkScrollAndToggleSlideChange() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        let canChangeSlide = true;

        scrollableContents.forEach(scrollableContent => {
            const scrollTop = scrollableContent.scrollTop;
            const scrollHeight = scrollableContent.scrollHeight;
            const clientHeight = scrollableContent.clientHeight;

            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight;

            if (!atTop && !atBottom) {
                canChangeSlide = false; // Если хоть одно из содержимого не прокручено до конца, блокируем смену слайда
            }
        });

        if (canChangeSlide) {
            mainSiteSwiper.mousewheel.enable(); // Разрешаем смену слайдов
        } else {
            mainSiteSwiper.mousewheel.disable(); // Блокируем смену слайдов
        }
    }

    // Функция для блокировки/разблокировки смены слайдов на основе состояния прокрутки каждого scrollable-content
    function handleMouseWheel(event) {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach(scrollableContent => {
            const scrollTop = scrollableContent.scrollTop;
            const scrollHeight = scrollableContent.scrollHeight;
            const clientHeight = scrollableContent.clientHeight;

            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight;

            if (event.deltaY < 0) {
                // Прокрутка вверх
                if (atTop) {
                    mainSiteSwiper.mousewheel.enable();
                } else {
                    mainSiteSwiper.mousewheel.disable();
                }
            } else if (event.deltaY > 0) {
                // Прокрутка вниз
                if (atBottom) {
                    mainSiteSwiper.mousewheel.enable();
                } else {
                    mainSiteSwiper.mousewheel.disable();
                }
            }
        });
    }

    // Добавляем обработчик прокрутки мыши для каждого scrollable-content
    siteSwiper.addEventListener('wheel', handleMouseWheel);

    // Сбрасываем прокрутку на всех scrollable-content активного слайда
    function resetScroll() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach(scrollableContent => {
            scrollableContent.scrollTop = 0; // Сбрасываем прокрутку на начало
        });
    }
}

Fancybox.bind("[data-fancybox]", {
    // Ваши кастомные настройки
});



// Получаем все карточки с классом 'price-card'
const priceCards = document.querySelectorAll('.price-card');

// Получаем элемент с классом 'fade-image'
const fadeImageContainer = document.querySelector('.fade-image');
const fadeImage = fadeImageContainer.querySelector('img');

// Добавляем обработчики событий для каждой карточки
priceCards.forEach(card => {
    // Когда мышь заходит на карточку
    card.addEventListener('mouseenter', function () {
        // Находим изображение внутри текущей карточки
        const cardImage = card.querySelector('img');

        // Берем путь к изображению
        const imageSrc = cardImage.getAttribute('src');

        // Подставляем его в картинку в fade-image
        fadeImage.setAttribute('src', imageSrc);

        // Добавляем класс .show к fade-image
        fadeImageContainer.classList.add('show');
    });

    // Когда мышь уходит с карточки
    card.addEventListener('mouseleave', function () {
        // Убираем класс .show с fade-image
        fadeImageContainer.classList.remove('show');
    });
});


