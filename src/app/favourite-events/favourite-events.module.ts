import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteEventsRoutingModule } from './favourite-events-routing.module';
import { FavouriteEventsComponent } from './favourite-events.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FavouriteEventsComponent
  ],
  imports: [
    CommonModule,
    FavouriteEventsRoutingModule,
    SharedModule
  ]
})
export class FavouriteEventsModule { }
