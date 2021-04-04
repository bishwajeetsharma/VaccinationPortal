import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginLogoutService } from './login-logout.service';
import { take, exhaustMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable()
export class AuthenticationServiceService implements HttpInterceptor {
  constructor(private service: LoginLogoutService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.service.principal.pipe(
      take(1),
      exhaustMap((data) => {
        if (
          data !== null &&
          req.url !== environment.api_config.base_url + 'user/register' &&
          req.url !== environment.api_config.base_url + 'doctor/register' &&
          req.url === environment.api_config.base_url + 'login' &&
          data.getExpDate() > new Date().getTime()
        ) {
          let modifiedurl = req.clone({
            headers: new HttpHeaders().append(
              'Authorization',
              'Bearer ' + data.getJwt()
            ),
          });
          return next.handle(modifiedurl);
        } else return next.handle(req);
      })
    );
  }
}
