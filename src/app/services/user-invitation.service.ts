import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { EndpointsService } from './endpoints.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserInvitationService {
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  inviteUser(username: string, listid: number) {
    var data = {
      username: username,
      listid: listid,
    };
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient
          .post(EndpointsService.user_invitation_Url, data, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
            observe: 'response',
          })
          .pipe(map((resp) => resp.status))
      )
    );
  }
  removeUser(userid: number, listid: number) {
    var data = {
      userid: userid,
      listid: listid,
    };
    return this.jwtService.get_token().pipe(
      switchMap((token) =>
        this.httpClient
          .delete(EndpointsService.user_invitation_Url, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
            observe: 'response',
            params: new HttpParams()
              .set('userid', userid.toString())
              .set('listid', listid.toString()),
          })
          .pipe(map((resp) => resp.status))
      )
    );
  }
}
