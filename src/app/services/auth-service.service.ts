import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JwtResponse } from '../models/jwt-response';
import { EndpointsService } from './endpoints.service';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  autenticate(loginModel: LoginModel) {
    var responseObs = this.httpClient.post<JwtResponse>(
      EndpointsService.login_Url,
      loginModel,
      {
        observe: 'body',
        responseType: 'json',
      }
    );
    responseObs.subscribe((data: JwtResponse) => {
      console.log(data);

      this.jwtService.set_token(data.access_token, data.exp_time);
      this.jwtService.set_refresh_token(
        data.refresh_token,
        data.exp_refresh_time
      );
    });
  }
}
