import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  static base_Url = 'http://127.0.0.1:5000';
  static login_Url = EndpointsService.base_Url + '/login';
  static token_refres_Url = EndpointsService.base_Url + '/token_refresh';
  static shoplist_list_Url = EndpointsService.base_Url + '/shop/all';
  static shoplist_Url = EndpointsService.base_Url + '/shop';
  static product_Url = EndpointsService.base_Url + '/product';
  static user_invitation_Url = EndpointsService.base_Url + '/userinvitation';
}
