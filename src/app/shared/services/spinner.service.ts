import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  // private isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading = signal<boolean>(false);

  show(): void {
    this.isLoading.set(true);
    // this.isLoadingSubject.next(true);
  }

  hide(): void {
    this.isLoading.set(false);
    // this.isLoadingSubject.next(false);
  }
}
