export default class ComparisonSlider {
  constructor(selector) {
    this.container = document.querySelector(selector);

    if (!this.container) return;

    this.sliderButton = this.container.querySelector('.js-comparison-img-btn');
    this.imageBefore = this.sliderButton.nextElementSibling;

    this.sliderButtonWidth = this.sliderButton.getBoundingClientRect().width;
    this.imageBeforeWidth = this.imageBefore.getBoundingClientRect().width;

    this.mouseDown = false;
    this.mousePosition = 0;

    this.init();
  }

  init() {
    this.setInitialClip();
    this.addEventListeners();
  }

  setInitialClip() {
    this.imageBefore.style.clip = `rect(0px, ${this.imageBeforeWidth / 2}px, 9999px, 0px)`;
    this.imageBefore.style.clipPath = `inset(0 ${this.imageBeforeWidth / 2}px 0 0)`;
    this.sliderButton.style.left = `${this.imageBeforeWidth / 2 - this.sliderButtonWidth / 2}px`;
  }

  addEventListeners() {
    this.sliderButton.addEventListener('mousedown', (event) => this.handleMouseDown(event));
    this.sliderButton.addEventListener('touchstart', (event) => this.handleTouchStart(event));

    this.sliderButton.addEventListener('mouseup', () => this.handleMouseUp());
    this.sliderButton.addEventListener('touchend', () => this.handleMouseUp());
    this.sliderButton.addEventListener('mouseout', () => this.handleMouseUp());

    this.sliderButton.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    this.sliderButton.addEventListener('touchmove', (event) => this.handleTouchMove(event));

    this.container.addEventListener('click', (event) => this.handleClick(event));
  }

  handleMouseDown(event) {
    this.mousePosition = event.clientX;
    this.mouseDown = true;
  }

  handleTouchStart(event) {
    this.mousePosition = event.touches[0].clientX;
    this.mouseDown = true;
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  handleMouseMove(event) {
    if (this.mouseDown) {
      const sliderButtonPosition = parseInt(this.sliderButton.style.left);
      this.sliderButton.style.left = `${sliderButtonPosition + (event.clientX - this.mousePosition)}px`;
      this.mousePosition = event.clientX;
      this.updateClip(sliderButtonPosition);
    }
  }

  handleTouchMove(event) {
    if (this.mouseDown) {
      const sliderButtonPosition = parseInt(this.sliderButton.style.left);
      this.sliderButton.style.left = `${sliderButtonPosition + (event.touches[0].clientX - this.mousePosition)}px`;
      this.mousePosition = event.touches[0].clientX;
      this.updateClip(sliderButtonPosition);
    }
  }

  handleClick(event) {
    const containerRect = this.container.getBoundingClientRect();
    const clickPosition = event.clientX - containerRect.left;

    const newLeftPosition = clickPosition - this.sliderButtonWidth / 2;
    
    const minLeft = 0;
    const maxLeft = this.container.getBoundingClientRect().width - this.sliderButtonWidth;

    if (newLeftPosition < minLeft) {
      this.sliderButton.style.left = `${minLeft}px`;
    } else if (newLeftPosition > maxLeft) {
      this.sliderButton.style.left = `${maxLeft}px`;
    } else {
      this.sliderButton.style.left = `${newLeftPosition}px`;
    }

    this.updateClip(newLeftPosition);
  }

  updateClip(sliderButtonPosition) {
    this.imageBefore.style.clip = `rect(0px, ${this.sliderButton.getBoundingClientRect().width / 2 + sliderButtonPosition}px, ${this.sliderButton.getBoundingClientRect().height}px, 0px)`;

    this.imageBefore.style.clipPath = `inset(0 ${(this.imageBefore.getBoundingClientRect().width - sliderButtonPosition) - this.sliderButton.getBoundingClientRect().width / 2}px 0 0)`;
  }
}