import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

export default function InitializeAllSliders(sliderConfigs = []) {
  if (!sliderConfigs.length) {
    return;
  }

  sliderConfigs.forEach(config => {
    const { selector, options } = config;
    const sliderElements = document.querySelectorAll(selector);

    if (sliderElements.length) {
      sliderElements.forEach(sliderElement => {
        new Swiper(sliderElement, options);
      });
    }
  });
}