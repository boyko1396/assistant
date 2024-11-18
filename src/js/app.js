/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

import { SetVH } from './modules/SetVH.js';
import BaseHelpers from './helpers/BaseHelpers.js';
import HeaderDropdownToggle from './modules/HeaderDropdownToggle.js';
import { SmoothScroll } from './modules/SmoothScroll.js';
import { InitImageScrollAnimation } from './modules/GSAP.js';
import InitializeAllSliders from './modules/SwiperInit.js';
import FaqCard from './modules/FaqCard.js';

// set vh
SetVH();

// check webp/loaded page/device type
BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  // header nav mobile toggle
  new HeaderDropdownToggle();

  // nav active anchor
  const smoothScroll = new SmoothScroll('.js-anchor', '--scroll-offset', 650);

  // faq card
  new FaqCard();

  // slider init
  InitializeAllSliders([
    {
      selector: '.js-photo-slider-init',
      options: {
        loop: false,
        pagination: {
          el: '.js-swiper-photo-slider-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            const images = [
              'images/photo-card-1.jpg',
              'images/photo-card-3.jpg',
              'images/photo-card-4.jpg'
            ];
            const title = [
              'Реализм',
              '3D-рендер',
              'Pixar'
            ];
            return `
              <button class="${className} swiper-pagination-img">
                <p>${title[index]}</p>
                <span>
                  <img src="${images[index]}" alt="Slide ${index + 1}">
                </span>
              </button>
            `;
          },
        },
        slidesPerView: 1,
        spaceBetween: 12,
      }
    },
    {
      selector: '.js-im-reviews-slider-init',
      options: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        navigation: {
          nextEl: '.js-im-reviews-slider-btn-next',
          prevEl: '.js-im-reviews-slider-btn-prev',
        },
        breakpoints: {
          0: {
            autoHeight: true,
            slidesPerView: 1,
            centeredSlides: false,
          },
          768: {
            autoHeight: false,
            slidesPerView: 'auto',
            centeredSlides: true,
          },
        },
      },
    },
  ]);

  // GSAP animation
  InitImageScrollAnimation();
});