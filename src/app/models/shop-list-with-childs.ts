import { ShopList } from './shop-list';
import { Member } from './member';
import { Product } from './product';

export interface ShopListWithChilds extends ShopList {
  products: Product[];
  members: Member[];
}
