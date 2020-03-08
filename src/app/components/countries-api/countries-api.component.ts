import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-countries-api',
  templateUrl: './countries-api.component.html',
  styleUrls: ['./countries-api.component.scss']
})
export class CountriesApiComponent implements OnInit/*, OnDestroy*/  {

  //_countriesArr: CountryData[] =[]
  
  countryes : any[]

  constructor(private api: ApiService, private errorService: ErrorService) {
    
    /*const onsuccess = (res) => {
      console.log("sucess");
      
      res.forEach(element => {
        const country: CountryData = new CountryDataImpl()
        country.name = element.name
        country.capital = element.capital
        country.nativeName = element.nativeName
        country.population = element.population
        country.region = element.region
        country.timezones = element.timezones
        country.flag = element.flag
        this._countriesArr.push(country)
      });
    }*/

        
    const onsuccess = (res) =>{
      this.countryes = res
    }

    const onerror = (res) => {
      console.log("error", res);
      this.errorService.errorMsg = "Errore nella chiamata al servizio"
      
    }

    this.api.getCountries().subscribe(onsuccess, onerror);
  }
  

  ngOnInit() {
  }

  /*ngOnDestroy(){
    this._countriesArr = []
  }*/

}

/*export interface CountryData{
  name: string
  capital?: string
  region?: string
  population?: number
  timezones?: any
  nativeName?: string
  flag?: string
}

export class CountryDataImpl implements CountryData {
  name: string;  
  capital: string;
  region: string;
  population: number;
  timezones: any;
  nativeName: string;
  flag: string;


}*/
