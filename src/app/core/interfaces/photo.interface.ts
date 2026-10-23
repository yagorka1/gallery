export interface PhotoInterface {
  id: string;
  url: string;
}

export interface PhotoDtoInterface {
  id: string;
  url: string;
  author: string
  download_url: string;
  width: number;
  height: number;
}
