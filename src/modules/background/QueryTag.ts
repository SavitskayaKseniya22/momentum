export class QueryTag {
  constructor() {}
  static readStore() {
    const storage = window.localStorage;
    const imageTag = storage.getItem('imageTag');
    return { imageTag };
  }

  static writeStore(imageTag: string) {
    const storage = window.localStorage;
    storage.setItem('imageTag', imageTag);
  }
}
