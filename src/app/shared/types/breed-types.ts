export type BreedsListResponse = {
  message: {
    [breed: string]: string[];
  };
  status: string;
};

export type SubBreedsListResponse = {
  message: string[];
  status: string;
};

export type MultipleImagesResponse = {
  message: string[];
  status: string;
};

export type SingleImageResponse = {
  message: string;
  status: string;
};

