import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteEventsComponent } from './favourite-events.component';

const routes: Routes = [{ path: '', component: FavouriteEventsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteEventsRoutingModule { }
