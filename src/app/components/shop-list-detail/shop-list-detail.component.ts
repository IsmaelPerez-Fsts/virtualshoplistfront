import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ShopListWithChilds } from 'src/app/models/shop-list-with-childs';
import { ShopListListService } from 'src/app/services/shop-list-list.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { UserInvitationService } from 'src/app/services/user-invitation.service';

@Component({
  selector: 'app-shop-list-detail',
  templateUrl: './shop-list-detail.component.html',
  styleUrls: ['./shop-list-detail.component.css'],
})
export class ShopListDetailComponent implements OnInit {
  shoplist: ShopListWithChilds;
  listid: number;
  usernameToInvite: string;
  producToAdd: Product;

  constructor(
    private route: ActivatedRoute,
    private shopListService: ShopListListService,
    private productService: ProductsService,
    private userInivitationService: UserInvitationService
  ) {
    this.producToAdd = {};
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listid = params['shoplistid'];
      this.producToAdd.listid = this.listid;
      this.loadShopList();
    });
  }

  loadShopList = () => {
    this.shopListService
      .getShopListDetails(this.listid)
      .subscribe((shoplist: ShopListWithChilds) => {
        console.log(shoplist);
        this.shoplist = shoplist;
      });
  };

  deleteProduct = (prodId: number) => {
    this.productService.deleteProduct(prodId).subscribe(() => {
      this.loadShopList();
    });
  };

  addproduct() {
    console.log(this.producToAdd);
    this.productService.insertProduct(this.producToAdd).subscribe(() => {
      this.loadShopList();
    });
  }

  deleteMember = (id: number) => {
    this.userInivitationService.removeUser(id, this.listid).subscribe(() => {
      this.loadShopList();
    });
  };

  invite = () => {
    this.userInivitationService
      .inviteUser(this.usernameToInvite, this.listid)
      .subscribe(() => {
        this.loadShopList();
      });
  };
}
