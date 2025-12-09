'use client';

import React from 'react';
import { Content } from '@/types/content';
import BannerWidget from './BannerWidget';
import ShortFormWidget from './ShortFormWidget';
import ListViewWidget from './ListViewWidget';
import IconShortcutWidget from './IconShortcutWidget';
import FooterWidget from './FooterWidget';

interface ContentRendererProps {
  content: Content;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  if (!content.isActive) return null;

  switch (content.type) {
    case 'banner':
      return <BannerWidget content={content} />;
    case 'shortform':
      return <ShortFormWidget content={content} />;
    case 'listview':
      return <ListViewWidget content={content} />;
    case 'icon':
      return <IconShortcutWidget content={content} />;
    case 'footer':
      return <FooterWidget content={content} />;
    default:
      return null;
  }
};

export default ContentRenderer;

