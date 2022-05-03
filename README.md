This project is a Shopstory demo using next.js, Contentful and Shopify. If you want to find out more about Shopstory, visit https://shopstory.app.

## How to read this code

Please remember that Shopstory can easily integrate with any React codebase. This project is just an example. Shopstory easily integrates with any CSS approach (css modules, tailwind, styled-components, emotion, stitches, etc), any ecommerce platform, etc.

In this example project we use following technologies:

1. next.js
2. For CSS we're using PostCSS with CSS Modules
3. For e-commerce platform we use Shopify

## Where is Shopstory?

We want to keep Shopstory as minimal as possible and decoupled from the rest of your code. There are 3 places where Shopstory can be found:

1. `/shopstory` directory - Shopstory configuration files
2. `/pages/shopstory-editor` - editor page
3. `/landing/[slug].tsx`, `/category/[handle.tsx]` - actual pages consuming Shopstory content

### Shopstory configuration (`/shopstory` directory)

There are 3 main configuration files for Shopstory:

1. Runtime config.
2. Compilation config
3. Editor config

#### Runtime config

This is a configuration object that will go to the client bundle. It is as minimal as possible not to overload your bundle size. It mostly consists of custom stuff from your codebase that should be available in Shopstory. Design tokens, custom components, custom actions, etc.

Please visit `/shopstory/shosptoryRuntimeConfig.tsx`to get familiar with the file (there are comments there).

#### Compilation config

Shopstory content saved in your CMS must be compiled before it can be used in the page. Compilation config has all the necessary configuration to allow compilation. Compilation phase should happen on the server so any code from compilation config won't be added unnecessarily to the client bundle.

Please visit `/shopstory/shopstoryCompilationConfig.tsx`to get familiar with compilation config.

#### Editor config

Editor config has all the configuration required by Shopstory Editor. It is used only during editing. Main information in this config is what widgets should be used for custom types (like `product`).

Please visit `/shopstory/shopstoryEditorConfig.tsx`to get familiar with editor config.

### Editor page (`/pages/shopstory-editor`)

This one can be confusing but it's fundamental part of Shopstory.

Shopstory is a visual builder that has capability of rendering your custom React components. In order to render custom components properly, we must actually render the content "in your website" because it's the only place where your custom components live.

That's why we need a "canvas" page that is part of your project. When you open Shopstory Editor the actual preview of the content is rendered in this "canvas page". We usually call it `/shopstory-editor`.

Creating this page is very simple, all you need to do is to render `Launcher` component from our SDK and pass it editor config. Please remember to remove all the header / footer and other artifacts from this page. It must be as blank as possible, otherwise it will be confusing for editors to use.

### Actual pages (like `/landing/[slug.tsx]`)

Shopstory content is stored in your CMS as a JSON. This JSON is not optimized for rendering. It must be compiled in order to be renderable. In any place you want to use Shopstory content, you must fetch the entry containing the JSON field, and pass this JSON through the `compile` provided in our SDK. The returned object can be passed via `getStaticProps` and simply fed into `<Shopstory />` component to render the content.

Compilation does couple of things:

1. Optimizes the content for rendering (small size).
2. Fetches all the external resources (like products, images, etc).
3. In case of variable content (personalisation, A/B testing) it trims all the unused variants and just returns the correct one.
