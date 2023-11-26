import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  declarations: [EventCardComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [AngularMaterialModule, EventCardComponent],
})
export class SharedModule {}
