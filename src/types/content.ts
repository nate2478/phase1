// 백오피스 연동 콘텐츠 타입 정의

export type ContentType = 'banner' | 'shortform' | 'listview' | 'icon' | 'footer';

export type ContentPosition = 'header' | 'main' | 'footer';

export interface BaseContent {
  id: string;
  type: ContentType;
  position: ContentPosition;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannerContent extends BaseContent {
  type: 'banner';
  imageUrl: string;
  linkUrl?: string;
  title?: string;
  description?: string;
}

export interface ShortFormContent extends BaseContent {
  type: 'shortform';
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  duration?: number;
}

export interface ListViewContent extends BaseContent {
  type: 'listview';
  items: ListViewItem[];
  title?: string;
  layout: 'grid' | 'list';
}

export interface ListViewItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  linkUrl?: string;
}

export interface IconContent extends BaseContent {
  type: 'icon';
  iconUrl: string;
  title: string;
  linkUrl?: string;
  items: IconItem[];
}

export interface IconItem {
  id: string;
  iconUrl: string;
  title: string;
  linkUrl?: string;
}

export interface FooterContent extends BaseContent {
  type: 'footer';
  links: FooterLink[];
  copyright?: string;
}

export interface FooterLink {
  id: string;
  title: string;
  linkUrl: string;
}

export type Content = BannerContent | ShortFormContent | ListViewContent | IconContent | FooterContent;

export interface HomePageConfig {
  banners: BannerContent[];
  iconShortcuts: IconContent[];
  mainContents: Content[];
  footer: FooterContent[];
}

