import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginLogoutService } from './login-logout.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthenticationServiceService implements HttpInterceptor {
  constructor(private service: LoginLogoutService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.service.principal.pipe(
      take(1),
      exhaustMap((data) => {
        if (
          data !== null &&
          req.url !== 'http://localhost:8080/user/register' &&
          req.url !== 'http://localhost:8080/doctor/register' &&
          (req.url==='http://localhost:8080/login'&& data.getExpDate() > new Date().getTime())
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
