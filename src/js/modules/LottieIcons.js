import lottie from 'lottie-web';

export default class LottieIcons {
  constructor() {
    this.icons = document.querySelectorAll('.js-lottie-icon');
    if (this.icons.length) {
      this.initLottieIcons();
    }
  }

  initLottieIcons() {
    this.icons.forEach((icon) => {
      const jsonPath = icon.dataset.lottiePath;
      lottie.loadAnimation({
        container: icon,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: jsonPath,
      });
    });
  }
}