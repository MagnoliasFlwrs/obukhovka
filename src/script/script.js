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
                    '<svg xmlns="http://www.w3.org/2000/svg" width="108" height="16" viewBox="0 0 108 16" fill="none">\n' +
                    '  <path d="M0 7.5321C0 11.6685 2.61358 15.0642 7.79962 15.0642C12.9856 15.0642 15.5992 11.6685 15.5992 7.5321C15.5992 3.39545 12.9856 0 7.79962 0C2.61358 0 0 3.39545 0 7.5321ZM10.7219 7.5321C10.7219 9.50768 9.65179 10.763 7.79962 10.763C5.94745 10.763 4.87737 9.50768 4.87737 7.5321C4.87737 5.55651 5.94745 4.3012 7.79962 4.3012C9.65179 4.3012 10.7219 5.55651 10.7219 7.5321Z" fill="#00D92F"/>\n' +
                    '  <path d="M20.483 4.9022V4.72891C20.483 4.40256 20.7492 4.13642 21.0755 4.13642H26.5171C26.8435 4.13642 27.1096 3.87028 27.1096 3.54393V0.921608C27.1096 0.595255 26.8435 0.329117 26.5171 0.329117H16.3216C15.9952 0.329117 15.7291 0.595255 15.7291 0.921608V14.1424C15.7291 14.4687 15.9952 14.7349 16.3216 14.7349H22.7879C25.5868 14.7349 28.3238 13.8498 28.3238 10.125C28.3238 6.37929 25.5868 5.49469 22.7879 5.49469H21.0755C20.7492 5.49469 20.483 5.22855 20.483 4.9022ZM20.483 10.6849V9.54446C20.483 9.21811 20.7492 8.95197 21.0755 8.95197H22.1911C23.0143 8.95197 23.611 9.19903 23.611 10.125C23.611 11.051 23.0141 11.2774 22.1911 11.2774H21.0755C20.7492 11.2774 20.483 11.0112 20.483 10.6849Z" fill="#00D92F"/>\n' +
                    '  <path d="M36.665 11.4217L41.4566 1.17281C41.5451 0.98389 41.5318 0.779805 41.4198 0.603758C41.3079 0.427711 41.1286 0.329346 40.92 0.329346H37.1991C36.9472 0.329346 36.7323 0.478043 36.6441 0.714075L35.1642 4.66525C35.0787 4.89347 34.876 5.0401 34.6324 5.04952C34.3888 5.05894 34.1753 4.92863 34.0723 4.70754L32.1937 0.671786C32.0942 0.457818 31.8924 0.329346 31.6566 0.329346H27.9771C27.7597 0.329346 27.5728 0.437134 27.4641 0.625362C27.3554 0.81382 27.3554 1.0294 27.4639 1.21785L32.2661 9.54055C32.3686 9.71821 32.3748 9.91839 32.2829 10.1018L32.199 10.2693C31.9317 10.8866 31.3139 11.0926 30.532 11.0926C30.2144 11.0926 29.8766 11.059 29.5498 10.9956C29.37 10.9609 29.2011 11.0036 29.06 11.1202C28.9189 11.2364 28.8447 11.3941 28.8447 11.577V14.1775C28.8447 14.4524 29.0253 14.6848 29.2917 14.7521C30.0653 14.9479 30.7837 15.0642 31.4582 15.0642C33.8455 15.0642 35.4301 14.0971 36.665 11.4217Z" fill="#00D92F"/>\n' +
                    '  <path d="M44.1688 14.443L45.8713 11.5513C45.9809 11.3651 46.1669 11.259 46.3829 11.2597C46.5989 11.2601 46.7844 11.3668 46.8933 11.5534L48.5791 14.4411C48.6883 14.6282 48.8742 14.7351 49.0907 14.7351H53.1814C53.4055 14.7351 53.5976 14.6199 53.7036 14.4225C53.8095 14.2251 53.7987 14.0013 53.6748 13.8146L49.5671 7.63598C49.4315 7.43189 49.4322 7.18047 49.569 6.97707L53.419 1.25233C53.5445 1.06594 53.5558 0.841398 53.4505 0.643288C53.3448 0.444948 53.1522 0.329346 52.9277 0.329346H48.8487C48.6299 0.329346 48.4421 0.438512 48.3339 0.628809L46.897 3.15368C46.789 3.34352 46.6017 3.45268 46.3831 3.45337C46.1648 3.45383 45.977 3.34536 45.8683 3.15598L44.4151 0.626741C44.3064 0.437824 44.1196 0.329574 43.9015 0.329574H39.8209C39.5964 0.329574 39.4035 0.445408 39.298 0.643518C39.1923 0.841858 39.204 1.06617 39.3295 1.25256L43.1796 6.9773C43.3163 7.18047 43.317 7.43213 43.1814 7.63621L39.0737 13.8149C38.9496 14.0015 38.9391 14.2253 39.045 14.4228C39.151 14.6202 39.3431 14.7353 39.5672 14.7353H43.6592C43.875 14.7353 44.0603 14.6294 44.1697 14.4434L44.1688 14.443Z" fill="#00D92F"/>\n' +
                    '  <path d="M51.4577 7.5321C51.4577 11.6685 54.0713 15.0642 59.2573 15.0642C64.4434 15.0642 67.0569 11.6685 67.0569 7.5321C67.0569 3.39545 64.4434 0 59.2573 0C54.0713 0 51.4577 3.39545 51.4577 7.5321ZM62.1796 7.5321C62.1796 9.50768 61.1095 10.763 59.2573 10.763C57.4052 10.763 56.3351 9.50768 56.3351 7.5321C56.3351 5.55651 57.4052 4.3012 59.2573 4.3012C61.1095 4.3012 62.1796 5.55651 62.1796 7.5321Z" fill="#00D92F"/>\n' +
                    '  <path d="M67.2266 0.921609V14.1424C67.2266 14.4687 67.4928 14.7349 67.8191 14.7349H74.2444C77.2696 14.7349 80.1095 13.8912 80.1095 10.6189C80.1095 9.18088 79.5386 8.15217 78.4941 7.52337C78.3217 7.41972 78.2204 7.2524 78.2082 7.05154C78.196 6.85067 78.2764 6.67255 78.435 6.54868C79.2125 5.94148 79.5334 5.07664 79.5334 3.9714C79.5334 1.46078 77.6812 0.328888 74.4296 0.328888H67.8191C67.4928 0.328888 67.2266 0.595026 67.2266 0.921379V0.921609ZM75.376 10.0632C75.376 10.8246 74.9028 11.2362 73.9973 11.2362H72.5731C72.2467 11.2362 71.9806 10.9701 71.9806 10.6437V9.48241C71.9806 9.15606 72.2467 8.88992 72.5731 8.88992H73.9973C74.9028 8.88992 75.376 9.30177 75.376 10.063V10.0632ZM74.9644 4.89784C74.9644 5.47401 74.5735 5.96791 73.7707 5.96791L72.5662 5.95412C72.2423 5.95044 71.9803 5.68545 71.9803 5.36162V4.42026C71.9803 4.0939 72.2465 3.82776 72.5728 3.82776H73.7707C74.5733 3.82776 74.9644 4.3012 74.9644 4.89806V4.89784Z" fill="#00D92F"/>\n' +
                    '  <path d="M84.9111 14.1424V10.1822C84.9111 9.85588 85.1772 9.58974 85.5036 9.58974H85.6651C85.8798 9.58974 86.0643 9.69431 86.174 9.87886L88.8956 14.4455C89.0054 14.6301 89.1898 14.7346 89.4044 14.7346H93.2354C93.4558 14.7346 93.6449 14.6236 93.7527 14.4313C93.8603 14.2389 93.8559 14.0196 93.7403 13.8319L90.0201 7.78009C89.9002 7.58519 89.9002 7.35491 90.0199 7.15978L93.659 1.23142C93.7743 1.04365 93.7787 0.824394 93.6709 0.632259C93.5633 0.439894 93.3742 0.329118 93.1538 0.329118H89.3311C89.1114 0.329118 88.9232 0.439204 88.8154 0.63019L86.2742 5.13157C86.1664 5.32278 85.9779 5.43264 85.7584 5.43264H85.5033C85.177 5.43264 84.9109 5.1665 84.9109 4.84015V0.921379C84.9109 0.595026 84.6447 0.328888 84.3184 0.328888H80.7494C80.423 0.328888 80.1569 0.595026 80.1569 0.921379V14.1421C80.1569 14.4685 80.423 14.7346 80.7494 14.7346H84.3184C84.6447 14.7346 84.9109 14.4685 84.9109 14.1421L84.9111 14.1424Z" fill="#00D92F"/>\n' +
                    '  <path d="M96.8658 14.3297L97.2335 13.226C97.3156 12.9799 97.536 12.8211 97.7957 12.8211H101.917C102.179 12.8211 102.401 12.9829 102.481 13.2316L102.834 14.3244C102.914 14.5735 103.136 14.7349 103.398 14.7349H106.929C107.129 14.7349 107.301 14.6448 107.415 14.4802C107.529 14.3157 107.553 14.1231 107.484 13.9353L102.554 0.714535C102.466 0.478043 102.251 0.329117 101.999 0.329117H97.7173C97.4654 0.329117 97.2508 0.478044 97.1625 0.713846L92.2139 13.9346C92.1436 14.1221 92.1679 14.3152 92.2819 14.48C92.3962 14.6448 92.5683 14.7349 92.7687 14.7349H96.3032C96.5627 14.7349 96.7833 14.5758 96.8654 14.3297H96.8658ZM100.434 6.51236L101.023 8.60654C101.076 8.79523 101.055 8.98024 100.94 9.13905C100.825 9.29786 100.656 9.38404 100.46 9.38404H99.2781C99.082 9.38404 98.9131 9.29786 98.7982 9.13905C98.6831 8.98024 98.6628 8.79592 98.7152 8.60654L99.2928 6.51489C99.3647 6.25473 99.5927 6.08075 99.8625 6.08029C100.133 6.0796 100.361 6.25266 100.434 6.51236Z" fill="#00D92F"/>\n' +
                    '</svg>',
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

                saveScrollPositions();
            },

            slideChangeTransitionEnd: function () {
                document.querySelector('.swiper-pagination').classList.remove('changing-class');
                const currentSlideIndex = mainSiteSwiper.realIndex;
                const labels = [
                    '<svg xmlns="http://www.w3.org/2000/svg" width="108" height="16" viewBox="0 0 108 16" fill="none">\n' +
                    '  <path d="M0 7.5321C0 11.6685 2.61358 15.0642 7.79962 15.0642C12.9856 15.0642 15.5992 11.6685 15.5992 7.5321C15.5992 3.39545 12.9856 0 7.79962 0C2.61358 0 0 3.39545 0 7.5321ZM10.7219 7.5321C10.7219 9.50768 9.65179 10.763 7.79962 10.763C5.94745 10.763 4.87737 9.50768 4.87737 7.5321C4.87737 5.55651 5.94745 4.3012 7.79962 4.3012C9.65179 4.3012 10.7219 5.55651 10.7219 7.5321Z" fill="#00D92F"/>\n' +
                    '  <path d="M20.483 4.9022V4.72891C20.483 4.40256 20.7492 4.13642 21.0755 4.13642H26.5171C26.8435 4.13642 27.1096 3.87028 27.1096 3.54393V0.921608C27.1096 0.595255 26.8435 0.329117 26.5171 0.329117H16.3216C15.9952 0.329117 15.7291 0.595255 15.7291 0.921608V14.1424C15.7291 14.4687 15.9952 14.7349 16.3216 14.7349H22.7879C25.5868 14.7349 28.3238 13.8498 28.3238 10.125C28.3238 6.37929 25.5868 5.49469 22.7879 5.49469H21.0755C20.7492 5.49469 20.483 5.22855 20.483 4.9022ZM20.483 10.6849V9.54446C20.483 9.21811 20.7492 8.95197 21.0755 8.95197H22.1911C23.0143 8.95197 23.611 9.19903 23.611 10.125C23.611 11.051 23.0141 11.2774 22.1911 11.2774H21.0755C20.7492 11.2774 20.483 11.0112 20.483 10.6849Z" fill="#00D92F"/>\n' +
                    '  <path d="M36.665 11.4217L41.4566 1.17281C41.5451 0.98389 41.5318 0.779805 41.4198 0.603758C41.3079 0.427711 41.1286 0.329346 40.92 0.329346H37.1991C36.9472 0.329346 36.7323 0.478043 36.6441 0.714075L35.1642 4.66525C35.0787 4.89347 34.876 5.0401 34.6324 5.04952C34.3888 5.05894 34.1753 4.92863 34.0723 4.70754L32.1937 0.671786C32.0942 0.457818 31.8924 0.329346 31.6566 0.329346H27.9771C27.7597 0.329346 27.5728 0.437134 27.4641 0.625362C27.3554 0.81382 27.3554 1.0294 27.4639 1.21785L32.2661 9.54055C32.3686 9.71821 32.3748 9.91839 32.2829 10.1018L32.199 10.2693C31.9317 10.8866 31.3139 11.0926 30.532 11.0926C30.2144 11.0926 29.8766 11.059 29.5498 10.9956C29.37 10.9609 29.2011 11.0036 29.06 11.1202C28.9189 11.2364 28.8447 11.3941 28.8447 11.577V14.1775C28.8447 14.4524 29.0253 14.6848 29.2917 14.7521C30.0653 14.9479 30.7837 15.0642 31.4582 15.0642C33.8455 15.0642 35.4301 14.0971 36.665 11.4217Z" fill="#00D92F"/>\n' +
                    '  <path d="M44.1688 14.443L45.8713 11.5513C45.9809 11.3651 46.1669 11.259 46.3829 11.2597C46.5989 11.2601 46.7844 11.3668 46.8933 11.5534L48.5791 14.4411C48.6883 14.6282 48.8742 14.7351 49.0907 14.7351H53.1814C53.4055 14.7351 53.5976 14.6199 53.7036 14.4225C53.8095 14.2251 53.7987 14.0013 53.6748 13.8146L49.5671 7.63598C49.4315 7.43189 49.4322 7.18047 49.569 6.97707L53.419 1.25233C53.5445 1.06594 53.5558 0.841398 53.4505 0.643288C53.3448 0.444948 53.1522 0.329346 52.9277 0.329346H48.8487C48.6299 0.329346 48.4421 0.438512 48.3339 0.628809L46.897 3.15368C46.789 3.34352 46.6017 3.45268 46.3831 3.45337C46.1648 3.45383 45.977 3.34536 45.8683 3.15598L44.4151 0.626741C44.3064 0.437824 44.1196 0.329574 43.9015 0.329574H39.8209C39.5964 0.329574 39.4035 0.445408 39.298 0.643518C39.1923 0.841858 39.204 1.06617 39.3295 1.25256L43.1796 6.9773C43.3163 7.18047 43.317 7.43213 43.1814 7.63621L39.0737 13.8149C38.9496 14.0015 38.9391 14.2253 39.045 14.4228C39.151 14.6202 39.3431 14.7353 39.5672 14.7353H43.6592C43.875 14.7353 44.0603 14.6294 44.1697 14.4434L44.1688 14.443Z" fill="#00D92F"/>\n' +
                    '  <path d="M51.4577 7.5321C51.4577 11.6685 54.0713 15.0642 59.2573 15.0642C64.4434 15.0642 67.0569 11.6685 67.0569 7.5321C67.0569 3.39545 64.4434 0 59.2573 0C54.0713 0 51.4577 3.39545 51.4577 7.5321ZM62.1796 7.5321C62.1796 9.50768 61.1095 10.763 59.2573 10.763C57.4052 10.763 56.3351 9.50768 56.3351 7.5321C56.3351 5.55651 57.4052 4.3012 59.2573 4.3012C61.1095 4.3012 62.1796 5.55651 62.1796 7.5321Z" fill="#00D92F"/>\n' +
                    '  <path d="M67.2266 0.921609V14.1424C67.2266 14.4687 67.4928 14.7349 67.8191 14.7349H74.2444C77.2696 14.7349 80.1095 13.8912 80.1095 10.6189C80.1095 9.18088 79.5386 8.15217 78.4941 7.52337C78.3217 7.41972 78.2204 7.2524 78.2082 7.05154C78.196 6.85067 78.2764 6.67255 78.435 6.54868C79.2125 5.94148 79.5334 5.07664 79.5334 3.9714C79.5334 1.46078 77.6812 0.328888 74.4296 0.328888H67.8191C67.4928 0.328888 67.2266 0.595026 67.2266 0.921379V0.921609ZM75.376 10.0632C75.376 10.8246 74.9028 11.2362 73.9973 11.2362H72.5731C72.2467 11.2362 71.9806 10.9701 71.9806 10.6437V9.48241C71.9806 9.15606 72.2467 8.88992 72.5731 8.88992H73.9973C74.9028 8.88992 75.376 9.30177 75.376 10.063V10.0632ZM74.9644 4.89784C74.9644 5.47401 74.5735 5.96791 73.7707 5.96791L72.5662 5.95412C72.2423 5.95044 71.9803 5.68545 71.9803 5.36162V4.42026C71.9803 4.0939 72.2465 3.82776 72.5728 3.82776H73.7707C74.5733 3.82776 74.9644 4.3012 74.9644 4.89806V4.89784Z" fill="#00D92F"/>\n' +
                    '  <path d="M84.9111 14.1424V10.1822C84.9111 9.85588 85.1772 9.58974 85.5036 9.58974H85.6651C85.8798 9.58974 86.0643 9.69431 86.174 9.87886L88.8956 14.4455C89.0054 14.6301 89.1898 14.7346 89.4044 14.7346H93.2354C93.4558 14.7346 93.6449 14.6236 93.7527 14.4313C93.8603 14.2389 93.8559 14.0196 93.7403 13.8319L90.0201 7.78009C89.9002 7.58519 89.9002 7.35491 90.0199 7.15978L93.659 1.23142C93.7743 1.04365 93.7787 0.824394 93.6709 0.632259C93.5633 0.439894 93.3742 0.329118 93.1538 0.329118H89.3311C89.1114 0.329118 88.9232 0.439204 88.8154 0.63019L86.2742 5.13157C86.1664 5.32278 85.9779 5.43264 85.7584 5.43264H85.5033C85.177 5.43264 84.9109 5.1665 84.9109 4.84015V0.921379C84.9109 0.595026 84.6447 0.328888 84.3184 0.328888H80.7494C80.423 0.328888 80.1569 0.595026 80.1569 0.921379V14.1421C80.1569 14.4685 80.423 14.7346 80.7494 14.7346H84.3184C84.6447 14.7346 84.9109 14.4685 84.9109 14.1421L84.9111 14.1424Z" fill="#00D92F"/>\n' +
                    '  <path d="M96.8658 14.3297L97.2335 13.226C97.3156 12.9799 97.536 12.8211 97.7957 12.8211H101.917C102.179 12.8211 102.401 12.9829 102.481 13.2316L102.834 14.3244C102.914 14.5735 103.136 14.7349 103.398 14.7349H106.929C107.129 14.7349 107.301 14.6448 107.415 14.4802C107.529 14.3157 107.553 14.1231 107.484 13.9353L102.554 0.714535C102.466 0.478043 102.251 0.329117 101.999 0.329117H97.7173C97.4654 0.329117 97.2508 0.478044 97.1625 0.713846L92.2139 13.9346C92.1436 14.1221 92.1679 14.3152 92.2819 14.48C92.3962 14.6448 92.5683 14.7349 92.7687 14.7349H96.3032C96.5627 14.7349 96.7833 14.5758 96.8654 14.3297H96.8658ZM100.434 6.51236L101.023 8.60654C101.076 8.79523 101.055 8.98024 100.94 9.13905C100.825 9.29786 100.656 9.38404 100.46 9.38404H99.2781C99.082 9.38404 98.9131 9.29786 98.7982 9.13905C98.6831 8.98024 98.6628 8.79592 98.7152 8.60654L99.2928 6.51489C99.3647 6.25473 99.5927 6.08075 99.8625 6.08029C100.133 6.0796 100.361 6.25266 100.434 6.51236Z" fill="#00D92F"/>\n' +
                    '</svg>',
                    'Преимущества',
                    'О нас',
                    'Услуги',
                    'Галерея',
                    'Наши цены',
                    'Контакты'
                ];
                const isBenefitsSlide = labels[currentSlideIndex] === 'Преимущества' || labels[currentSlideIndex] === 'Услуги' || labels[currentSlideIndex] === 'Наши цены';

                const paginationItems = document.querySelectorAll('.custom-pagination-item');
                paginationItems.forEach(item => {
                    if (isBenefitsSlide) {
                        item.classList.add('black');
                    } else {
                        item.classList.remove('black');
                    }
                });

                restoreScrollPositions();
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

            mainSiteSwiper.slideTo(5, 0);

            setTimeout(() => {
                const sixthSlide = mainSiteSwiper.slides[5];
                sixthSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
                sixthSlide.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
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






