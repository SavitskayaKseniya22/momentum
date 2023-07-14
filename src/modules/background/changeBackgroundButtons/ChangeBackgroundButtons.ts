import { BackgroundImageCollection } from '../BackgroundImageCollection';
import { QueryTag } from '../QueryTag';
import './ChangeBackgroundButtons.scss';

class ChangeBackgroundButtons {
  constructor() {
    this.changeBackground();
  }

  applyNewBackground(img: HTMLImageElement, src: string) {
    img.onload = () => {
      const backgroundContainer = document.querySelector('.slider__background');
      if (backgroundContainer) {
        (
          backgroundContainer as HTMLElement
        ).style.background = `url(${src}) center/cover, rgba(0, 0, 0, 0.5)`;
      }
    };
  }

  async changeBackground() {
    const { imageList, imageSource } =
      await BackgroundImageCollection.checkImageDataExistence();
    const pictureOrder =
      BackgroundImageCollection.readStore().pictureOrder || 0;

    const img = new Image();
    if (imageList && imageList[pictureOrder]) {
      const url = BackgroundImageCollection.getItemUrl(
        imageList[pictureOrder],
        imageSource
      );
      if (url) {
        img.src = url;
        this.applyNewBackground(img, img.src);
      }
    }
  }

  updatePictiresOrderValue(
    type: 'increase' | 'decrease',
    currentValue: number
  ) {
    const MAX_NUMBER_OF_IMAGES_IN_PACK = 19;
    const MIN_NUMBER_OF_IMAGES_IN_PACK = 0;
    switch (type) {
      case 'increase':
        const nextValue = currentValue + 1;
        return nextValue <= MAX_NUMBER_OF_IMAGES_IN_PACK
          ? nextValue
          : MIN_NUMBER_OF_IMAGES_IN_PACK;
      case 'decrease':
        const prevValue = currentValue - 1;
        return prevValue >= MIN_NUMBER_OF_IMAGES_IN_PACK
          ? prevValue
          : MAX_NUMBER_OF_IMAGES_IN_PACK;
      default:
        return currentValue;
    }
  }

  readUpdateWritePictureOrder(type: 'increase' | 'decrease') {
    const storage = window.localStorage;
    const pictureOrder = Number(storage.getItem('pictureOrder')) || 0;
    const updatedPictureOrder = this.updatePictiresOrderValue(
      type,
      pictureOrder
    );
    storage.setItem('pictureOrder', updatedPictureOrder.toString());
    return { updatedPictureOrder };
  }

  addListener() {
    document.addEventListener('click', async (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest('.slider__icons_icon')) {
          if (event.target.closest('.slider__icons_prev')) {
            this.readUpdateWritePictureOrder('decrease');
          } else if (event.target.closest('.slider__icons_next')) {
            this.readUpdateWritePictureOrder('increase');
          }
          this.changeBackground();
        } else if (event.target.closest('.background-source__option')) {
          const inputId = event.target.id;
          const { imageSource, imageTag } =
            BackgroundImageCollection.readStore();
          if (inputId !== imageSource) {
            await BackgroundImageCollection.getImageListAndWriteToStore(
              inputId,
              imageTag
            );
            this.changeBackground();
          }
        }
      }
    });
    document
      .querySelector('#search-query')
      ?.addEventListener('change', async (event: Event) => {
        const { target } = event;
        if (target) {
          QueryTag.writeStore((target as HTMLInputElement).value);
          const { imageSource, imageTag } =
            BackgroundImageCollection.readStore();
          if (imageSource && imageSource !== 'github') {
            await BackgroundImageCollection.getImageListAndWriteToStore(
              imageSource,
              imageTag
            );
            this.changeBackground();
          }
        }
      });
  }

  content() {
    return `
    <div class="slider__background"></div>
    <div class="slider__icons">
      <button class="slider__icons_prev slider__icons_icon" title="previous image">
      <i class='bx bx-chevron-left'></i>
      </button>
      <button class="slider__icons_next slider__icons_icon" title="next image">
      <i class='bx bx-chevron-right' ></i>
      </button>
    </div>`;
  }
}

export default ChangeBackgroundButtons;
