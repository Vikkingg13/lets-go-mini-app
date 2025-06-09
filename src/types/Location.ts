interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface Photo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    medium: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Location {
  id: string;
  documentId: string;
  title: string;
  summary: string;
  description: string;
  type: string;
  address: string;
  photo: Photo[];
  pros?: string[];
  cons?: string[];
  work_time: string;
  link: string
}
