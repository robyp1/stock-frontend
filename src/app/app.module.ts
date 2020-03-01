import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { CountriesApiComponent } from './components/countries-api/countries-api.component';
import { HiglightPushDirectiveDirective } from './directives/higlight-push-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    CountriesApiComponent,
    HiglightPushDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
