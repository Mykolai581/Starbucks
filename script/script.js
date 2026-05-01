//Menu-Burger

class MenuFunctional {
  constructor(menu, menuItems, burgerButton) {
    this.menu = menu;
    this.menuItems = menuItems;
    this.burgerButton = burgerButton;

    this.initMenu();
  }

  initMenu() {
    this.burgerButton.addEventListener("click", () => this.toggleClass());
    this.addMenuItemListeners();
  }

  toggleClass() {
    this.menu.classList.toggle("active");
    this.burgerButton.classList.toggle("active");
  }

  addMenuItemListeners() {
    this.menuItems.forEach((menuItem) => {
      menuItem.addEventListener("click", () => {
        this.menu.classList.remove("active");
        this.burgerButton.classList.remove("active");
      });
    });
  }
}

const headerMenu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".menu__link");
const menuBurger = document.querySelector(".menu-burger");

const menuFunctional = new MenuFunctional(headerMenu, menuLinks, menuBurger);

//Modal

class Modal {
  constructor(modal) {
    this.modal = modal;
  }
}

//Lazy-Loading

class LoadingLazy {
  constructor(images) {
    this.images = images;

    this.initLoadingLazy();
  }

  initLoadingLazy() {
    this.observerLoadingLazy();
  }

  observerLoadingLazy() {
    const lazyLoad = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;

            img.onload = () => {
              img.classList.remove("lazy");
            };

            lazyLoad.unobserve(img);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    this.images.forEach((img) => lazyLoad.observe(img));
  }
}

const imgDataSrc = document.querySelectorAll("img[data-src]");
const loadLazy = new LoadingLazy(imgDataSrc);

//Animation

class AnimationFunctional {
  constructor(elements) {
    this.elements = elements;
    this.options = {
      "animation-element": "active",
      "animation-fall": "show",
      "image-animation": "active-infinity",
      "card-image": "show",
    };

    this.initAnimation();
  }

  initAnimation() {
    this.observerAnimation();
  }

  observerAnimation() {
    const animation = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            Object.keys(this.options).forEach((cls) => {
              if (el.classList.contains(cls)) {
                el.classList.add(this.options[cls]);
              }
            });

            animation.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.elements.forEach((el) => animation.observe(el));
  }
}

const animationElements = document.querySelectorAll(".animation-element");
const animationsFall = document.querySelectorAll(".animation-fall");
const imagesAnimation = document.querySelectorAll(".image-animation");
const cardImages = document.querySelectorAll(".card-image");
const cardImagesBefore = document.querySelectorAll(".card-image::before");

const animationElementsFunctional = new AnimationFunctional(animationElements);
const animationFallFunction = new AnimationFunctional(animationsFall);
const imagesAnimationFunctional = new AnimationFunctional(imagesAnimation);
const cardImagesFunctional = new AnimationFunctional(cardImages);
const cardImagesBeforeFunctional = new AnimationFunctional(cardImagesBefore);

//Hi 😀 its a website for StarBacks

/*
1. Modal for button
2. Slider and create items 
3. A button that scrolls the user to the top of a web page
*/
