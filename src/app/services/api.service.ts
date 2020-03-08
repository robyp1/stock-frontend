import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getCountries(){
    return this.http.get("http://restcountries.eu/rest/v2/all")
    //return this.http.get("http://restcountries.eu/rest/v2/error") //usare questo per fare uscire msg di errore!
  }


  getCountryInfo(name: string){
    return this.http.get("http://restcountries.eu/rest/v2/?name=" + name)
  }
}
