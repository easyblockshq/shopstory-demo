import { EditorConfig } from '@shopstory/core/dist/client/types';
import { shopstoryCompilationConfig } from './shopstoryCompilationConfig';

export const shopstoryEditorConfig: EditorConfig = {
  compilationConfig: shopstoryCompilationConfig,
  // widgets: {
  //   product: () => ({
  //     getItemById: ProductPickerService.product,
  //     getItems: ProductPickerService.products,
  //     type: 'item-picker'
  //   })
  // }
};
