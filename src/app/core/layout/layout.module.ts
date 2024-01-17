import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CdkMenuModule } from '@angular/cdk/menu';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule, CdkMenuModule],
})
export class LayoutModule {}
