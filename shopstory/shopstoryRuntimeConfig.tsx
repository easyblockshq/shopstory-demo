import React from 'react'
import { RuntimeConfig, CustomComponent } from '@shopstory/core/dist/types'
import ProductCard from "../components/common/ProductCard/ProductCard";

const containerMargin = {
  '@initial': 96,
  '@xxl': 96,
  '@xl': 70,
  '@md': 40,
  '@sm': 24,
  '@xs': 24
}

const shopstoryRuntimeConfig: RuntimeConfig = {
  actions: [
    // {
    //   action: (values: any) => {
    //     alert('action text: ' + values.someText);
    //   },
    //   id: 'MyAction',
    //   label: 'Custom action',
    //   schema: [
    //     {
    //       defaultValue: 'Hello world!',
    //       prop: 'someText',
    //       type: 'text'
    //     }
    //   ]
    // }
  ],

  aspectRatios: [],

  colors: [
    {
      id: 'color_black_01',
      label: 'black01',
      value: '#252525'
    },
    {
      id: 'color_black_02',
      label: 'black02',
      value: '#4f4f4f'
    },
    {
      id: 'color_black_01',
      label: 'black01',
      value: '#252525'
    },
    {
      id: 'white_01',
      label: 'white01',
      value: '#f9f8f3'
    },
    {
      id: 'white_02',
      label: 'white02',
      value: '#bdbdbd'
    },
    {
      id: 'beige_01',
      label: 'beige_01',
      value: '#f1f0ea'
    },
    {
      id: 'grey_01',
      label: 'grey_01',
      value: '#a0a09d'
    }
  ],

  components: [
    {
      id: "ProductCard",
      type: "card",
      component: ProductCard,
      schema: [
        {
          prop: "product",
          type: "product",
        }
      ]
    }
  ],

devices: [
    {
      breakpoint: 480,
      h: 667,
      id: 'xs',
      label: 'Phone',
      w: 375
    },
    {
      breakpoint: 768,
      h: 375,
      hidden: true,
      id: 'sm',
      label: 'Phone SM h',
      w: 667
    },
    {
      breakpoint: 1024,
      h: 1024,
      id: 'md',
      label: 'Tablet',
      w: 768
      // hidden: true
    },
    {
        id: "lg",
        w: 1024,
        h: 768,
        breakpoint: 1280,
        label: "TabletH",
        hidden: true
    },
    {
      breakpoint: 1680,
      h: 768,
      id: 'xl',
      isMain: true,
      label: 'Laptop',
      w: 1366
    },
    {
      breakpoint: null,
      h: 920,
      hidden: true,
      id: '2xl',
      label: 'Desktop',
      w: 1920
    }
  ],

  /* Fonts */
//   @define-mixin font-body01 {
// @mixin typography-soehne-mono;
//   font-size: 20px;
// }
//
// @define-mixin font-body02 {
// @mixin typography-soehne-mono;
//   font-size: 13px;
//   line-height: 1.8;
// }
//
// @define-mixin font-heading01 {
// @mixin typography-national;
//   font-size: 21px;
//   line-height: 1.4;
//   font-weight: 600;
// }
//
// @define-mixin font-heading02 {
// @mixin typography-national;
//   font-size: 16px;
//   font-weight: 600;
// }
//
// @define-mixin font-heading03 {
// @mixin typography-national;
//   font-size: 13px;
//   line-height: 1.4;
//   font-weight: 600;
// }
//
// @define-mixin font-heading04 {
// @mixin typography-national;
//   font-size: 24px;
//   line-height: 1.2;
//   font-weight: 700;
//
//   /* TODO: @media (--md) doesn't work in this file. Why?? */
// @media (min-width: 740px) {
//     font-size: 36px;
//   }
// }


  fonts: [
    {
      id: "body",
      label: "body",
      value: {
        fontSize: 20,
        lineHeight: 1.8,
        fontFamily: 'test-soehne-mono'
      }
    },
    {
      id: "body-small",
      label: "body small",
      value: {
        fontSize: 13,
        lineHeight: 1.8,
        fontFamily: 'test-soehne-mono'
      }
    },
    {
      id: "heading1",
      label: "heading1",
      value: {
        fontFamily: 'test-national-2',
        fontSize: 21,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: "heading2",
      label: "heading2",
      value: {
        fontFamily: 'test-national-2',
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: "heading3",
      label: "heading3",
      value: {
        fontFamily: 'test-national-2',
        fontSize: 13,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: "heading4",
      label: "heading4",
      value: {
        fontFamily: 'test-national-2',
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 700,
        "@sm": {
          fontSize: 24
        }
      }
    },
  ],
  links: [
    // {
    //   id: 'MyLink',
    //   label: 'URL Route',
    //   linkProvider: URLRouteLinkProvider,
    //   schema: [
    //     {
    //       contentTypeId: 'UrlRoute',
    //       mapper: (link: any) => {
    //         return {
    //           path: link.fields.path
    //         };
    //       },
    //       prop: 'link',
    //       type: 'contentful-entry'
    //     }
    //   ]
    // }
  ],
  mainGrid: {
    containerMargin: containerMargin,
    horizontalGap: {
      '@initial': 24,
      '@md': 8,
      '@xl': 16
    },
    numberOfItemsInRow: {
      '@initial': '4',
      '@md': '3',
      '@xs': '2'
    },
    verticalGap: {
      '@initial': 24 + 40,
      '@md': 8 + 40,
      '@xl': 16 + 40
    }
  },
  space: [
    {
      id: 'containerMargin.default',
      value: containerMargin
    }
  ]
}

export { shopstoryRuntimeConfig }
