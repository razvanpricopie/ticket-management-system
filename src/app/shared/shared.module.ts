import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { DeleteEntityDialogComponent } from './components/delete-entity-dialog/delete-entity-dialog.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    EventCardComponent,
    DeleteEntityDialogComponent,
    OrderCompletedComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    AngularMaterialModule,
    EventCardComponent,
    DeleteEntityDialogComponent,
    OrderCompletedComponent,
    LoadingSpinnerComponent
  ],
})
export class SharedModule {}
