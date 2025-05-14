import { inject, Injectable, signal } from '@angular/core';
import { APIService } from '@dominicode/api';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  readonly categories = signal<string[]>([]);

  private readonly _endPoint = `${environment.API_URL_FAKE_STORE}/products/categories`;
  private readonly _apiService = inject(APIService);

  constructor() {
    this._getCategories();
  }

  private _getCategories(): void {
    this._apiService
      .get<string[]>(this._endPoint)
      .pipe(tap((categories: string[]) => this.categories.set(categories)))
      .subscribe();
  }
}
