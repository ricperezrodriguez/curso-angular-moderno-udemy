import { inject } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';
import { finalize } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerInterceptor implements HttpInterceptor {
  private readonly _spinnerService = inject(SpinnerService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._spinnerService.show();
    return next
      .handle(request)
      .pipe(finalize(() => this._spinnerService.hide()));
  }
}
