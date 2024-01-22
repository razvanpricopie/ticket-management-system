import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { DeleteEntityDialogComponent } from './components/delete-entity-dialog/delete-entity-dialog.component';

@NgModule({
  declarations: [EventCardComponent, DeleteEntityDialogComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    AngularMaterialModule,
    EventCardComponent,
    DeleteEntityDialogComponent,
  ],
})
export class SharedModule {}
