const siteSwiper = document.querySelector('.site-swiper');

if (siteSwiper) {
    let mainSiteSwiper = new Swiper(siteSwiper, {
        direction: "vertical",
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
                for (let i = 1; i <= total; i++) {
                    paginationHTML += `
                        <div class="custom-pagination-item ${i === current ? 'active' : ''}">
                            <div class="progress-bar"></div>
                            <span>${labels[i - 1]}</span>
                        </div>
                    `;
                }
                return paginationHTML;
            },
        },
    });
}
