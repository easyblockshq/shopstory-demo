import { ContentfulParams } from '@shopstory/core/dist/client/contentful/types';

export const shopstoryContentfulParams: ContentfulParams = {
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  enablePreview: process.env.IS_PRODUCTION !== 'true',
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  previewAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
};
