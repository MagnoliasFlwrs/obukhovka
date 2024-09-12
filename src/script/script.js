const siteSwiper = document.querySelector('.site-swiper');

if (siteSwiper) {

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
                    'обуховка',
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
        speed: 1000,
        on: {
            slideChangeTransitionStart: function () {
                document.querySelector('.swiper-pagination').classList.add('changing-class');
                saveScrollPositions(); // сохраняем позиции скролла перед сменой слайда

                const activeIndex = mainSiteSwiper.activeIndex;
                const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet');


                paginationBullets.forEach((bullet) => {
                    bullet.classList.remove('changing-class');
                });


                setTimeout(() => {
                    paginationBullets.forEach((bullet, index) => {
                        if (index === activeIndex) {
                            bullet.classList.add('changing-class');
                        }
                    });

                    if (mainSiteSwiper.slides[activeIndex].classList.contains('specific-slide-label')) {
                        document.querySelector('.swiper-pagination').classList.add('black');
                        document.querySelector('.swiper-pagination').classList.remove('changing-class');
                    } else {
                        document.querySelector('.swiper-pagination').classList.remove('black');
                        document.querySelector('.swiper-pagination').classList.remove('changing-class');
                    }
                }, mainSiteSwiper.params.speed / 4);
            },
            slideChangeTransitionEnd: function () {
                document.querySelector('.swiper-pagination').classList.remove('changing-class');
                restoreScrollPositions(); // восстанавливаем позиции скролла после смены слайда
            }
        }
    });

    function saveScrollPositions() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach((scrollableContent, index) => {
            scrollPositions[activeSlide.dataset.swiperSlideIndex] = scrollPositions[activeSlide.dataset.swiperSlideIndex] || {};
            scrollPositions[activeSlide.dataset.swiperSlideIndex][index] = scrollableContent.scrollTop;
        });
    }

    function restoreScrollPositions() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach((scrollableContent, index) => {
            const savedScrollTop = scrollPositions[activeSlide.dataset.swiperSlideIndex]?.[index] || 0;
            scrollableContent.scrollTop = savedScrollTop;
        });
    }

    document.querySelector('.swiper-pagination').addEventListener('click', function (event) {
        const target = event.target.closest('.custom-pagination-item');
        if (target) {
            const index = parseInt(target.getAttribute('data-index'), 10);
            mainSiteSwiper.slideTo(index);
        }
    });

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
                canChangeSlide = false;
            }
        });

        if (canChangeSlide) {
            mainSiteSwiper.mousewheel.enable();
        } else {
            mainSiteSwiper.mousewheel.disable();
        }
    }

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
                if (atTop) {
                    mainSiteSwiper.mousewheel.enable();
                } else {
                    mainSiteSwiper.mousewheel.disable();
                }
            } else if (event.deltaY > 0) {
                if (atBottom) {
                    mainSiteSwiper.mousewheel.enable();
                } else {
                    mainSiteSwiper.mousewheel.disable();
                }
            }
        });
    }

    siteSwiper.addEventListener('wheel', handleMouseWheel);

    function resetScroll() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        const scrollableContents = activeSlide.querySelectorAll('.scrollable-content');

        scrollableContents.forEach(scrollableContent => {
            scrollableContent.scrollTop = 0;
        });
    }


    document.querySelectorAll('.anchor-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {

                mainSiteSwiper.mousewheel.disable();

                mainSiteSwiper.slideTo(5, 0);

                setTimeout(() => {
                    const sixthSlide = mainSiteSwiper.slides[5];

                    const targetPosition = targetElement.offsetTop;
                    const scrollContainer = sixthSlide.querySelector('.scrollable-content');

                    const duration = 500;
                    const startTime = performance.now();
                    const startScrollTop = scrollContainer.scrollTop;

                    function smoothScroll(timestamp) {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        scrollContainer.scrollTop = startScrollTop + (targetPosition - startScrollTop) * progress;

                        if (progress < 1) {
                            requestAnimationFrame(smoothScroll);
                        } else {
                            mainSiteSwiper.mousewheel.enable();
                        }
                    }

                    requestAnimationFrame(smoothScroll);
                }, 300);
            }
        });
    });



}

Fancybox.bind("[data-fancybox]", {

});




const priceCards = document.querySelectorAll('.price-card');
const fadeImageContainer = document.querySelector('.fade-image');
const fadeImage = fadeImageContainer.querySelector('img');
const dPriceCards = document.querySelector('.d-price-cards');

let scrollTimeout;

dPriceCards.addEventListener('scroll', function () {
    fadeImageContainer.classList.remove('show');

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        // Вы можете добавить дополнительную логику здесь, если необходимо
    }, 100);
});

priceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const cardImage = card.querySelector('img');
        const imageSrc = cardImage.getAttribute('src');
        fadeImage.setAttribute('src', imageSrc);
        fadeImageContainer.classList.add('show');
    });

    card.addEventListener('mouseleave', function () {
        fadeImageContainer.classList.remove('show');
    });
});



// modal-forms

const callbackForm = document.querySelector('.callback-form');
const bookingForm = document.querySelector('.booking-form');
const overlay = document.querySelector('.overlay');
const callbackFormBtns = document.querySelectorAll('.show-callback-form');
const bookingFormBtns = document.querySelectorAll('.show-booking-form');

bookingFormBtns?.forEach(el=> {
    el.addEventListener('click' , ()=> {
        bookingForm.classList.add('open');
        overlay.classList.add('open');
    })
})
callbackFormBtns?.forEach(el=> {
    el.addEventListener('click' , ()=> {
        callbackForm.classList.add('open');
        overlay.classList.add('open');
    })
})

overlay.addEventListener('click' , ()=> {
    if (callbackForm.classList.contains('open')) {
        callbackForm.classList.remove('open');
    }
    if (bookingForm.classList.contains('open')) {
        bookingForm.classList.remove('open');
    }
    overlay.classList.remove('open')
})


document.addEventListener('DOMContentLoaded', () => {
    const bgScreen = document.querySelector('.mobile-version .screen-1 .bg-screen');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                bgScreen.classList.add('visible');
            } else {
                bgScreen.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(bgScreen);
});

const priorityMobileSwiper = document.querySelector('.priority-swiper');
if (priorityMobileSwiper) {
    const priorityMobSwiper = new Swiper(priorityMobileSwiper, {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1.3,
        breakpoints: {
            700: {
                slidesPerView: 2.3,
            },
            1000: {
                slidesPerView: 3
            }
        }
    });
}

// burger-menu

const burgerBtn = document.querySelector('.burger-btn');
const burgerCloseBtn = document.querySelector('.close-menu-btn');
const burgerMenu = document.querySelector('.mobile-menu');
const menuLinks = burgerMenu.querySelectorAll(' a');

burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.add('active');
});

burgerCloseBtn.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
    });
});






