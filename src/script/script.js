const siteSwiper = document.querySelector('.site-swiper');

if (siteSwiper) {
    let mainSiteSwiper = new Swiper(siteSwiper, {
        direction: "vertical",
        mousewheel: true, // Включаем прокрутку мышью
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: 'custom',
            speed: 1000,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
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
                const isBenefitsSlide = labels[current - 1] === 'Преимущества' || labels[current - 1] === 'Услуги';

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
        on: {
            slideChange: function () {
                resetScroll(); // Сбрасываем прокрутку при смене слайда
            }
        }
    });

    // Добавляем обработчик кликов по кастомной пагинации
    document.querySelector('.swiper-pagination').addEventListener('click', function (event) {
        const target = event.target.closest('.custom-pagination-item');
        if (target) {
            const index = parseInt(target.getAttribute('data-index'), 10);
            mainSiteSwiper.slideTo(index);
        }
    });

    // Проверяем прокрутку и блокируем смену слайдов
    function checkScrollAndToggleSlideChange() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContent = activeSlide.querySelector('.scrollable-content');

        if (scrollableContent) {
            const scrollTop = scrollableContent.scrollTop;
            const scrollHeight = scrollableContent.scrollHeight;
            const clientHeight = scrollableContent.clientHeight;

            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight;

            if (atTop || atBottom) {
                mainSiteSwiper.mousewheel.enable(); // Разрешаем смену слайдов, если контент прокручен до начала или конца
            } else {
                mainSiteSwiper.mousewheel.disable(); // Блокируем смену слайдов, если контент не прокручен до конца
            }
        }
    }

    // Функция для блокировки/разблокировки смены слайдов на основе состояния прокрутки
    function handleMouseWheel(event) {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContent = activeSlide.querySelector('.scrollable-content');

        if (scrollableContent) {
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
        }
    }

    // Добавляем обработчик прокрутки мыши
    siteSwiper.addEventListener('wheel', handleMouseWheel);

    // Сбрасываем прокрутку на активном слайде
    function resetScroll() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContent = activeSlide.querySelector('.scrollable-content');

        if (scrollableContent) {
            scrollableContent.scrollTop = 0; // Сбрасываем прокрутку на начало
        }
    }
}
