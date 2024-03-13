import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorBoundaryComponent } from 'app/modules/error-boundary/components/error-boundary/error-boundary.component';

@NgModule({
  declarations: [
    ErrorBoundaryComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorBoundaryComponent,
  ],
  providers: [],
})
export class ErrorBoundaryModule { }
