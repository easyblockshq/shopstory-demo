import React from 'react'
import { RuntimeConfig, CustomComponent } from '@shopstory/core/dist/types'
import ProductCard from '../components/common/ProductCard/ProductCard'
import { Button } from '../components/common/Button/Button'
import Link from 'next/link'

const containerMargin = {
  '@initial': 96,
  '@xxl': 96,
  '@xl': 70,
  '@md': 40,
  '@sm': 24,
  '@xs': 24
}

const ShopstoryButton = React.forwardRef(({ label, ...restProps }: any, ref) => {
  return <Button {...restProps}>{label}</Button>
})

function NextLinkProvider({ Component, componentProps, values }: any) {
  return (
    <Link href={values.pagePath} passHref={true}>
      <Component {...componentProps} />
    </Link>
  )
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

  aspectRatios: [
    {
      id: '$gridMainObjectDefault',
      value: '10:7'
    }
  ],

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
      id: 'ProductCard',
      type: 'card',
      component: ProductCard,
      schema: [
        {
          prop: 'product',
          type: 'product'
        }
      ]
    },
    {
      id: 'Button',
      type: 'button',
      component: ShopstoryButton,
      schema: [
        {
          prop: 'appearance',
          type: 'select',
          options: ['solidBlack', 'solidGrey', 'solidWhite', 'outlineBlack']
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
      id: 'lg',
      w: 1024,
      h: 768,
      breakpoint: 1280,
      label: 'TabletH',
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

  fonts: [
    {
      id: 'body',
      label: 'body',
      value: {
        fontSize: 20,
        lineHeight: 1.8,
        fontFamily: 'test-soehne-mono'
      }
    },
    {
      id: 'body-small',
      label: 'body small',
      value: {
        fontSize: 13,
        lineHeight: 1.8,
        fontFamily: 'test-soehne-mono'
      }
    },
    {
      id: 'heading1',
      label: 'heading1',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 21,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: 'heading2',
      label: 'heading2',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: 'heading3',
      label: 'heading3',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 13,
        lineHeight: 1.4,
        fontWeight: 600
      }
    },
    {
      id: 'heading4',
      label: 'heading4',
      value: {
        fontFamily: 'test-national-2',
        fontSize: 36,
        lineHeight: 1.2,
        fontWeight: 700,
        '@sm': {
          fontSize: 24
        }
      }
    }
  ],
  links: [
    {
      id: 'MyLink',
      label: 'URL Route',
      linkProvider: NextLinkProvider,
      schema: [
        {
          prop: 'pagePath',
          type: 'string'
        }
      ]
    }
  ],

  mainGrid: {
    containerMargin: 0,
    horizontalGap: 1,
    numberOfItemsInRow: {
      '@initial': '3',
      '@sm': '2'
    },
    verticalGap: 24
  },

  space: [
    {
      id: 'containerMargin.default',
      value: containerMargin
    }
  ]
}

export { shopstoryRuntimeConfig }
