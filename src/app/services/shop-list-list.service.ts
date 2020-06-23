import { Injectable } from '@angular/core';
import { ShopList } from '../models/shop-list';
import { JwtService } from './jwt.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EndpointsService } from './endpoints.service';
import { switchMap, map } from 'rxjs/operators';
import { ShopListWithChilds } from '../models/shop-list-with-childs';

@Injectable({
  providedIn: 'root',
})
export class ShopListListService {
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  createShopList = (shopList: ShopList) => {
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient
          .post(EndpointsService.shoplist_Url, shopList, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
            observe: 'response',
          })
          .pipe(map((resp) => resp.status))
      )
    );
  };
  getAllShopList = () => {
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient.get(EndpointsService.shoplist_list_Url, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        })
      )
    );
  };

  getShopListDetails = (id: number) => {
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient.get<ShopListWithChilds>(EndpointsService.shoplist_Url, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
          params: new HttpParams().set('id', id.toString()),
        })
      )
    );
  };

  delete = (id: number) => {
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient.delete(EndpointsService.shoplist_Url, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
          params: new HttpParams().set('id', id.toString()),
        })
      )
    );
  };
}
