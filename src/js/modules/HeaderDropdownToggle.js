class HeaderDropdownToggle {
  constructor() {
    this.toggleButtons = document.querySelectorAll('.js-header-toggle');
    this.dropdowns = document.querySelectorAll('.header__dropdown');
    this.overlay = document.querySelector('.header__dropdown-overlay');

    if (this.toggleButtons.length > 0) {
      this.toggleButtons.forEach((button) => {
        button.addEventListener('click', (event) => this.toggleDropdown(event, button));
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeAllDropdowns());
    }

    document.addEventListener('click', (event) => this.handleOutsideClick(event));
  }

  toggleDropdown(event, button) {
    event.stopPropagation();
    const dropdown = button.closest('.header').querySelector('.header__dropdown');
    if (dropdown) {
      const isActive = dropdown.classList.contains('is-show');
      this.closeAllDropdowns();
      if (!isActive) {
        dropdown.classList.add('is-show');
        if (this.overlay) this.overlay.classList.add('is-show');
      }
    }
  }

  closeAllDropdowns() {
    this.dropdowns.forEach((dropdown) => dropdown.classList.remove('is-show'));
    if (this.overlay) this.overlay.classList.remove('is-show');
  }

  handleOutsideClick(event) {
    if (!event.target.closest('.header__dropdown') && !event.target.closest('.js-header-toggle')) {
      this.closeAllDropdowns();
    }
  }
}

export default HeaderDropdownToggle;