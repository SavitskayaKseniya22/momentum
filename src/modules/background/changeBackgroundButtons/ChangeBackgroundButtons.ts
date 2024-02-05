/* eslint-disable max-classes-per-file */
import calculateNumber from '../../../utils';
import ImageCollection from '../ImageCollection';
import './ChangeBackgroundButtons.scss';

const MAX_NUMBER_OF_IMAGES_IN_PACK = 19;
const MIN_NUMBER_OF_IMAGES_IN_PACK = 0;

class ChangeBackgroundButtons extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'slider__icons';
  }

  static async changeBackground(isItFirstLoad?: boolean) {
    const { imageList, imageSource, pictureOrder } =
      await ImageCollection.checkImageDataExistence(isItFirstLoad);

    const img = new Image();
    if (imageList[pictureOrder]) {
      const url = ImageCollection.getItemUrl(
        imageList[pictureOrder],
        imageSource
      );
      img.src = url;
      ChangeBackgroundButtons.applyNewBackground(img, img.src);
    }
  }

  addListener() {
    window.addEventListener('load', () => {
      ChangeBackgroundButtons.changeBackground(true);
    });

    this.addEventListener('click', async (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        event.target.closest('.slider__icons_icon')
      ) {
        const sliderIcon = event.target.closest('.slider__icons_icon');
        const operation = (sliderIcon as HTMLElement).dataset.operation as
          | 'increase'
          | 'decrease';
        ChangeBackgroundButtons.updatePictureOrder(operation);
        ChangeBackgroundButtons.changeBackground();
      }
    });

    document.addEventListener('click', async (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        event.target.closest('.background-source__option')
      ) {
        const inputId = event.target.id;
        const { imageSource, imageTag } = ImageCollection.readStore();
        if (inputId !== imageSource) {
          await ImageCollection.getImageListAndWriteToStore(inputId, imageTag);
          ChangeBackgroundButtons.changeBackground();
        }
      }
    });

    document
      .querySelector('#search-query')
      ?.addEventListener('change', async (event: Event) => {
        const query = (event.target as HTMLInputElement).value;
        const { imageSource } = ImageCollection.readStore();
        if (imageSource && imageSource !== 'github') {
          await ImageCollection.getImageListAndWriteToStore(imageSource, query);
          ChangeBackgroundButtons.changeBackground();
        }
      });
  }

  static applyNewBackground(img: HTMLImageElement, src: string) {
    img.addEventListener('load', () => {
      const backgroundContainer = document.querySelector('.slider__background');
      if (backgroundContainer && backgroundContainer instanceof HTMLElement) {
        backgroundContainer.style.background = `url(${src}) center/cover, rgba(0, 0, 0, 0.5)`;
      }
    });
  }

  static updatePictureOrder(type: 'increase' | 'decrease') {
    const storage = window.localStorage;
    const { pictureOrder } = ImageCollection.readStore();
    const updatedPictureOrder = calculateNumber(
      type,
      pictureOrder,
      MAX_NUMBER_OF_IMAGES_IN_PACK,
      MIN_NUMBER_OF_IMAGES_IN_PACK
    );
    storage.setItem('pictureOrder', String(updatedPictureOrder));
    return { updatedPictureOrder };
  }

  render() {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <button class="slider__icons_prev slider__icons_icon" data-operation='decrease' title="previous image" data-i18n="[title]images.prev">
      <i class='bx bx-chevron-left'></i>
      </button>

      <button class="slider__icons_next slider__icons_icon" data-operation='increase' title="next image" data-i18n="[title]images.next">
      <i class='bx bx-chevron-right' ></i>
      </button>
    `
    );
  }

  connectedCallback() {
    this.render();
    this.addListener();
  }
}

customElements.define('bg-buttons-custom', ChangeBackgroundButtons, {
  extends: 'div',
});

export default class Background extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'background';
  }

  render() {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="slider__background"></div>
      <div is="bg-buttons-custom"></div>
    `
    );
  }

  connectedCallback() {
    this.render();
  }
}
