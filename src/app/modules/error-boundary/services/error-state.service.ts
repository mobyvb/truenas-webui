import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorStateService {
  private errorSubject = new BehaviorSubject<Error | null>(null);
  error$ = this.errorSubject.asObservable();

  reportError(error: Error): void {
    this.errorSubject.next(error);
  }
}
