import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './core/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from './core/account/account.service';
import { adminGuardFactory } from './core/account/admin.guard';
import { Router } from '@angular/router';
import { authGuardFactory } from './core/account/auth.guard';
import { notAuthGuardFactory } from './core/account/not-auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'adminGuard',
      useFactory: adminGuardFactory,
      deps: [AccountService, Router],
    },
    {
      provide: 'authGuard',
      useFactory: authGuardFactory,
      deps: [AccountService, Router],
    },
    {
      provide: 'notAuthGuard',
      useFactory: notAuthGuardFactory,
      deps: [AccountService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
