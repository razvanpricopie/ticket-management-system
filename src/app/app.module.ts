import { ErrorHandler, NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerConnectionService } from './core/services/server-connection.service';
import { ApiRequestInterceptor } from './core/interceptors/api-request.interceptor';
import { ErrorHandlerService } from './core/services/error-handler.service';

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
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRequestInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    {
      provide: 'adminGuard',
      useFactory: adminGuardFactory,
      deps: [AccountService, Router],
    },
    {
      provide: 'notAuthGuard',
      useFactory: notAuthGuardFactory,
      deps: [AccountService, Router],
    },
    {
      provide: 'authGuard',
      useFactory: authGuardFactory,
      deps: [AccountService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
