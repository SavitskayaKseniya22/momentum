import ActualDate from '../../assets/js/date';
import {
  FlickrItemResponceTypes,
  FlickrResponceTypes,
  UnsplashItemResponceTypes,
} from '../../interfaces';

export class BackgroundImageCollection {
  constructor() {}
  static readStore() {
    const storage = window.localStorage;
    const imageSource = storage.getItem('imageSource');
    const imageTag = storage.getItem('imageTag');
    const pictureOrder = storage.getItem('pictureOrder');
    let imageList = storage.getItem('imageList');
    if (imageList) {
      imageList = JSON.parse(imageList);
    }
    return { imageSource, imageList, imageTag, pictureOrder };
  }

  static writeStore(
    source: string,
    imageList:
      | FlickrItemResponceTypes[]
      | UnsplashItemResponceTypes[]
      | string[]
  ) {
    const storage = window.localStorage;
    storage.setItem('imageSource', source);
    storage.setItem('imageList', JSON.stringify(imageList));
  }

  static async getUnsplashImages(query: string | null, timeOfDay: string) {
    const path = `https://api.unsplash.com/photos/random?orientation=landscape&query=${
      query || timeOfDay
    }&client_id=mT4PCODkUPTvfvB2AxjNReUVpj98E-vPd9o9xC1EzDE&count=20`;
    const res = await fetch(path);
    return (await res.json()) as UnsplashItemResponceTypes[];
  }

  static async getFlickrImages(query: string | null, timeOfDay: string) {
    const formatedTag = query?.split(' ').join(', ');
    const path = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=067d2cd731eb9c311ce2550fd0764aa8&tags=${
      formatedTag || timeOfDay
    }&tag_mode=all&extras=url_l&content_type=1&per_page=20&format=json&nojsoncallback=1`;
    const res = await fetch(path);
    const data = (await res.json()) as FlickrResponceTypes;
    return data?.photos?.photo;
  }

  static getGithubImages(timeOfDay: string) {
    const data: string[] = [];
    let i = 1;
    while (i <= 20) {
      const corectedString = i < 10 ? '0' + i.toString() : i.toString();
      data.push(
        `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${corectedString}.jpg`
      );
      i++;
    }
    return data;
  }

  static async getImageList(source: string, query: string | null) {
    const timeOfDay = ActualDate.getTimeOfDay();
    switch (source) {
      case 'github':
        return BackgroundImageCollection.getGithubImages(timeOfDay);
      case 'unsplash':
        return BackgroundImageCollection.getUnsplashImages(query, timeOfDay);
      case 'flickr':
        return BackgroundImageCollection.getFlickrImages(query, timeOfDay);
      default:
        return BackgroundImageCollection.getGithubImages(timeOfDay);
    }
  }

  static async getImageListAndWriteToStore(
    source: string,
    query: string | null
  ) {
    const imageList = await BackgroundImageCollection.getImageList(
      source,
      query
    );
    BackgroundImageCollection.writeStore(source, imageList);
    return { imageSource: source, imageList, imageTag: query };
  }

  static async checkImageDataExistence() {
    const { imageSource, imageList, imageTag } =
      BackgroundImageCollection.readStore();

    if (!imageSource || !imageList) {
      return await BackgroundImageCollection.getImageListAndWriteToStore(
        imageSource || 'github',
        imageTag //TODO: add behavior after deleting storage
      );
    } else {
      return { imageSource, imageList };
    }
  }

  static getFlickrImageUrl(responseItem: FlickrItemResponceTypes) {
    return `https://live.staticflickr.com/65535/${responseItem.id}_${responseItem.secret}_b.jpeg`;
  }

  static isItFlickrImage(
    responseItem: FlickrItemResponceTypes | UnsplashItemResponceTypes | string
  ): responseItem is FlickrItemResponceTypes {
    return (responseItem as FlickrItemResponceTypes).secret !== undefined;
  }

  static isItUnsplashImage(
    responseItem: FlickrItemResponceTypes | UnsplashItemResponceTypes | string
  ): responseItem is UnsplashItemResponceTypes {
    return (responseItem as UnsplashItemResponceTypes).slug !== undefined;
  }

  static getUnsplashImageUrl(responseItem: UnsplashItemResponceTypes) {
    return responseItem.urls?.regular;
  }

  static getGithubImageUrl(responseItem: string) {
    return responseItem;
  }

  static getItemUrl(
    responseItem: FlickrItemResponceTypes | UnsplashItemResponceTypes | string,
    imageSource: string
  ) {
    if (
      imageSource === 'flickr' &&
      BackgroundImageCollection.isItFlickrImage(responseItem)
    ) {
      return BackgroundImageCollection.getFlickrImageUrl(responseItem);
    } else if (
      imageSource === 'unsplash' &&
      BackgroundImageCollection.isItUnsplashImage(responseItem)
    ) {
      return BackgroundImageCollection.getUnsplashImageUrl(responseItem);
    } else if (imageSource === 'github' && typeof responseItem === 'string') {
      return responseItem;
    }
  }
}
