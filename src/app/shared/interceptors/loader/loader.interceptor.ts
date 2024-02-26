import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoaderService } from '../../services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderSrv: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderSrv.showLoader();

    return next.handle(req).pipe(
      delay(600),
      finalize(() => {
        this.loaderSrv.hideLoader();
      })
    );
  }
}


export default LoaderInterceptor;