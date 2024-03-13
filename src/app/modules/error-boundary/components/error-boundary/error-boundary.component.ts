/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ErrorStateService } from 'app/modules/error-boundary/services/error-state.service';

@UntilDestroy()
@Component({
  selector: 'ix-error-boundary',
  templateUrl: './error-boundary.component.html',
})
export class ErrorBoundaryComponent implements OnInit {
  hasError = false;
  errorMessage = '';

  constructor(private errorStateService: ErrorStateService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.errorStateService.error$.pipe(untilDestroyed(this)).subscribe((error) => {
      if (error) {
        this.handleError(error);
      }
    });
  }

  handleError(error: Error): void {
    this.hasError = true;
    this.errorMessage = error.message || 'Something went wrong.';
    // You can log the error or perform any necessary actions here
    console.error(error);
    this.cdr.markForCheck();
  }
}
