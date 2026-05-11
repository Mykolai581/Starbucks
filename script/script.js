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
      "slide-element": "show",
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

//Items Async

const newProductsWrapper = document.querySelector(".NewProducts-wrapper");
const items = "./script/coffee.json";

class AsyncFunctional {
  constructor(asyncItems, containerForElements) {
    this.asyncItems = asyncItems;
    this.containerForElements = containerForElements;

    this.initAsync();
  }

  async initAsync() {
    await this.asyncItemsFunction(this.asyncItems);

    this.initSwiper();
  }

  async asyncItemsFunction(itemsApi) {
    try {
      const response = await fetch(itemsApi);

      if (!response.ok) {
        throw new Error("Failed to load data");
      }

      const items = await response.json();

      items.forEach((item) => {
        const itemDiv = document.createElement("div");
        const imageDiv = document.createElement("div");
        const itemImg = document.createElement("img");
        const itemTitle = document.createElement("div");
        const itemText = document.createElement("div");
        const itemInfo = document.createElement("div");
        const itemPrice = document.createElement("div");
        const itemVolume = document.createElement("div");
        const itemButton = document.createElement("button");

        itemDiv.classList.add("swiper-slide", "NewProducts-slide");

        imageDiv.classList.add("NewProducts-slide__image");
        itemTitle.classList.add("NewProducts-slide__title");
        itemText.classList.add("NewProducts-slide__text");
        itemInfo.classList.add("NewProducts-slide__info");
        itemPrice.classList.add("NewProducts-slide__price");
        itemVolume.classList.add("NewProducts-slide__volume");

        itemButton.classList.add(
          "NewProducts-slide__button",
          "button-green",
          "button"
        );

        itemImg.src = item.img;
        itemImg.alt = item.title;

        itemTitle.textContent = item.title;
        itemText.textContent = item.text;
        itemPrice.textContent = item.price;
        itemVolume.textContent = item.volume;
        itemButton.textContent = item.buttonText;

        imageDiv.append(itemImg);

        itemInfo.append(itemPrice, itemVolume);

        itemDiv.append(imageDiv, itemTitle, itemText, itemInfo, itemButton);

        this.containerForElements.append(itemDiv);
      });
    } catch (error) {
      this.containerForElements.textContent = "Failed to load coffee ☕";

      console.error(error);
    }
  }

  initSwiper() {
    new Swiper(".swiper-container", {
      loop: false,

      spaceBetween: 54,

      navigation: {
        nextEl: ".NewProducts-button-next",
        prevEl: ".NewProducts-button-prev",
      },

      autoHeight: false,

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },

        1280: {
          slidesPerView: 3.3,
          spaceBetween: 54,
        },
      },
    });
  }
}

new AsyncFunctional(items, newProductsWrapper);

// Footer

document.addEventListener("DOMContentLoaded", () => {
  class AdaptiveButtonMover {
    constructor(button, desktopContainer, mobileContainer, breakpoint = 767) {
      this.button = button;
      this.desktopContainer = desktopContainer;
      this.mobileContainer = mobileContainer;
      this.breakpoint = breakpoint;

      this.init();
    }

    init() {
      this.moveButtonFunction();

      window.addEventListener("resize", () => {
        this.moveButtonFunction();
      });
    }

    moveButtonFunction() {
      const isMobile = window.innerWidth < this.breakpoint;
      const targetContainer = isMobile
        ? this.mobileContainer
        : this.desktopContainer;

      const currentParent = this.button.parentNode;

      if (currentParent !== targetContainer) {
        targetContainer.appendChild(this.button);
      }
    }
  }

  const footerContainer = document.querySelector(".footer__container");
  const footerInfo = document.querySelector(".footer__info");
  const footerButton = document.querySelector(".footer__image");

  new AdaptiveButtonMover(footerButton, footerContainer, footerInfo);
});
