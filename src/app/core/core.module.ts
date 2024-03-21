import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, LayoutModule, AccountModule],
})
export class CoreModule {}
