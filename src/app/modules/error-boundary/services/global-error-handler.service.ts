import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorStateService } from 'app/modules/error-boundary/services/error-state.service';
import { ErrorHandlerService } from 'app/services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorStateService: ErrorStateService, private errorHandlerService: ErrorHandlerService) {}

  handleError(error: Error): void {
    this.errorStateService.reportError(error);

    this.errorHandlerService.handleError(error);
  }
}
