import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ShopList } from 'src/app/models/shop-list';
import { ShopListListService } from 'src/app/services/shop-list-list.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  shop_list_array: ShopList[];
  listName: string;
  addShopListState: boolean = false;
  @ViewChild('shopListInput') input: ElementRef;

  constructor(
    private shoplistService: ShopListListService,
    private changDetector: ChangeDetectorRef
  ) {
    // this.shop_list_array = [
    //   { id: 1, name: 'lista1', userAdminId: 1 },
    //   { id: 2, name: 'lista2', userAdminId: 2 },
    // ];
    this.loadShopList();
  }
  ngOnInit(): void {}

  createNewList = () => {
    var shoplist: ShopList = { name: this.listName };
    this.shoplistService.createShopList(shoplist).subscribe((resp) => {
      if (resp == 200) {
        this.loadShopList();
      } else {
        alert('error');
      }
    });
    this.toggleAddShopListState();
  };

  loadShopList = () => {
    this.shoplistService.getAllShopList().subscribe((arr: ShopList[]) => {
      this.shop_list_array = arr;
    });
  };

  toggleAddShopListState = () => {
    this.addShopListState = !this.addShopListState;
    if (this.addShopListState) {
      this.changDetector.detectChanges();
      this.input.nativeElement.focus();
    }
  };

  delete = (listid: number) => {
    this.shoplistService.delete(listid).subscribe((resp) => {
      this.loadShopList();
    });
  };
}
