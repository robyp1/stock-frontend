import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesApiComponent } from './components/countries-api/countries-api.component';
import { PushComponent } from './components/push/push.component';
import { CountryComponent } from './components/countries-api/country/country.component';


const routes = [
  { path: "", component: AppComponent },
  { path: "countries", component: CountriesApiComponent},
  { path: "push", component: PushComponent},
  { path: "country", component: CountryComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
