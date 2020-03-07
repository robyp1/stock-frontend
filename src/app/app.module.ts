import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { CountriesApiComponent } from './components/countries-api/countries-api.component';
import { HiglightPushDirectiveDirective } from './directives/higlight-push-directive.directive';
import { MenuComponent } from './menu/menu.component';
import { PushComponent } from './components/push/push.component';
import { RouterModule } from '@angular/router';

const routes = [
   { path: "", component: AppComponent },
   { path: "countries", component: CountriesApiComponent},
   { path: "push", component: PushComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    CountriesApiComponent,
    HiglightPushDirectiveDirective,
    MenuComponent,
    PushComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes,{useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
