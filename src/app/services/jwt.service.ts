import { Injectable } from '@angular/core';
import { EndpointsService } from './endpoints.service';
import { JwtResponse } from '../models/jwt-response';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtToken } from '../models/jwt-token';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private httpClient: HttpClient) {}
  set_token(token: string, exp_time: number) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('jwt_token_exp', exp_time.toString());
  }
  get_token(): Observable<string> {
    if (localStorage.getItem('jwt_token') != null) {
      var exp_token_time: number = Number(
        localStorage.getItem('jwt_token_exp')
      );

      if (exp_token_time > Date.now()) {
        return new Observable((subscriber) => {
          subscriber.next(localStorage.getItem('jwt_token'));
        });
      } else {
        return this.request_new_token().pipe();
      }
    } else {
      throw new Error('JWT not set in localstorage');
    }
  }
  set_refresh_token(token: string, exp_time: number) {
    localStorage.setItem('jwt_refresh_token', token);
    localStorage.setItem('jwt_token_refresh_exp', exp_time.toString());
  }
  private get_refresh_token() {
    return localStorage.getItem('jwt_refresh_token');
  }

  private request_new_token() {
    var refreshToken = this.get_refresh_token();
    var responseObs = this.httpClient.post<JwtResponse>(
      EndpointsService.token_refres_Url,
      null,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${refreshToken}`,
        }),
      }
    );
    responseObs.subscribe((data: JwtToken) => {
      this.set_token(data.access_token, data.exp_time);
    });

    return responseObs.pipe(map((jwt) => jwt.access_token));
  }
}
