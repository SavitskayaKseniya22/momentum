import {
  FlickrItemResponceTypes,
  FlickrResponceTypes,
  UnsplashItemResponceTypes,
} from "../../interfaces";
import ActualDate from "../actualDate/ActualDate";

class ImageCollection {
  static readStore() {
    const storage = window.localStorage;
    const imageSource = storage.getItem("imageSource") || "github";
    const imageTag = storage.getItem("imageTag") || "";
    const storedOrder = storage.getItem("pictureOrder");
    const pictureOrder = storedOrder ? Number(storedOrder) : 0;
    const storedList = storage.getItem("imageList") as string;
    const imageList = storedList ? JSON.parse(storedList) : storedList;
    return { imageSource, imageList, imageTag, pictureOrder };
  }

  static writeStore(
    source: string,
    imageList:
      | FlickrItemResponceTypes[]
      | UnsplashItemResponceTypes[]
      | string[],
    imageTag: string
  ) {
    const storage = window.localStorage;
    storage.setItem("imageSource", source);
    storage.setItem("imageList", JSON.stringify(imageList));
    storage.setItem("imageTag", imageTag);
  }

  static async getUnsplashImages(query: string) {
    const path = `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=mT4PCODkUPTvfvB2AxjNReUVpj98E-vPd9o9xC1EzDE&count=20`;
    const response = await fetch(path);
    if (response.ok) {
      return (await response.json()) as UnsplashItemResponceTypes[];
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  static async getFlickrImages(query: string) {
    const formatedQuery = query?.split(" ").join(", ");
    const path = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=067d2cd731eb9c311ce2550fd0764aa8&tags=${formatedQuery}&tag_mode=all&extras=url_l&content_type=1&per_page=20&format=json&nojsoncallback=1`;
    const response = await fetch(path);
    if (response.ok) {
      const data = (await response.json()) as FlickrResponceTypes;
      return data.photos.photo;
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  static getGithubImages(timeOfDay: string) {
    const data: string[] = [];
    let i = 1;
    while (i <= 20) {
      const corectedString = i < 10 ? `0${i.toString()}` : i.toString();
      data.push(
        `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${corectedString}.jpg`
      );
      i += 1;
    }
    return data;
  }

  static async getImageList(source: string, query: string | null) {
    const timeOfDay = ActualDate.getTimeOfDay();
    const overridingQuery = query || timeOfDay;
    switch (source) {
      case "github":
        return ImageCollection.getGithubImages(timeOfDay);
      case "unsplash":
        return ImageCollection.getUnsplashImages(overridingQuery);
      case "flickr":
        return ImageCollection.getFlickrImages(overridingQuery);
      default:
        return ImageCollection.getGithubImages(timeOfDay);
    }
  }

  static async getImageListAndWriteToStore(source: string, query: string) {
    const imageList = await ImageCollection.getImageList(source, query);
    ImageCollection.writeStore(source, imageList, query);
    return imageList;
  }

  static async checkImageDataExistence(isItFirstLoad?: boolean) {
    const { imageSource, imageList, imageTag, pictureOrder } =
      ImageCollection.readStore();

    const result =
      !imageList || isItFirstLoad
        ? await ImageCollection.getImageListAndWriteToStore(
            imageSource,
            imageTag
          )
        : imageList;

    return { imageSource, imageList: result, pictureOrder };
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

  static getFlickrImageUrl(responseItem: FlickrItemResponceTypes) {
    return `https://live.staticflickr.com/65535/${responseItem.id}_${responseItem.secret}_b.jpeg`;
  }

  static getUnsplashImageUrl(responseItem: UnsplashItemResponceTypes) {
    return responseItem.urls?.regular;
  }

  static getItemUrl(
    responseItem: FlickrItemResponceTypes | UnsplashItemResponceTypes | string,
    imageSource: string
  ) {
    if (
      imageSource === "flickr" &&
      ImageCollection.isItFlickrImage(responseItem)
    ) {
      return ImageCollection.getFlickrImageUrl(responseItem);
    }
    if (
      imageSource === "unsplash" &&
      ImageCollection.isItUnsplashImage(responseItem)
    ) {
      return ImageCollection.getUnsplashImageUrl(responseItem);
    }
    return responseItem as string;
  }
}

export default ImageCollection;
