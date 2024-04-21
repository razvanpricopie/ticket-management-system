import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { DeleteEntityDialogComponent } from './components/delete-entity-dialog/delete-entity-dialog.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PrimengModule } from './primeng.module';
import { EventsCarouselComponent } from './components/events-carousel/events-carousel.component';
import { EventsGalleriaComponent } from './components/events-galleria/events-galleria.component';

@NgModule({
  declarations: [
    EventCardComponent,
    DeleteEntityDialogComponent,
    OrderCompletedComponent,
    LoadingSpinnerComponent,
    EventsCarouselComponent,
    EventsGalleriaComponent
  ],
  imports: [CommonModule, AngularMaterialModule, PrimengModule],
  exports: [
    AngularMaterialModule,
    EventCardComponent,
    DeleteEntityDialogComponent,
    OrderCompletedComponent,
    LoadingSpinnerComponent,
    EventsCarouselComponent,
    EventsGalleriaComponent,
    PrimengModule
  ],
})
export class SharedModule {}
