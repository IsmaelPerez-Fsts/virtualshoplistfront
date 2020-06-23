import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { EndpointsService } from './endpoints.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  insertProduct(prod: Product) {
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient
          .post(EndpointsService.product_Url, prod, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
            observe: 'response',
          })
          .pipe(map((resp) => resp.status))
      )
    );
  }

  deleteProduct(id: Number) {
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient
          .delete(EndpointsService.product_Url, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
            observe: 'response',
            params: new HttpParams().set('id', id.toString()),
          })
          .pipe(map((resp) => resp.status))
      )
    );
  }
}
