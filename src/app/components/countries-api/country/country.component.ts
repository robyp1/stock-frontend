import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country: CountryData

  constructor(private routed: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.routed.queryParams.subscribe(params => {
        console.log("param: " + params.name)
        this.api.getCountryInfo(params.name).subscribe(
           (res: CountryData[]) => {
            console.log(params.name)
            this.country = res.filter(function(country){
              return country.name ===  params.name
            })[0]
          }, err => {
              console.error(err)
          }
        )
    })

    

  }

}

export interface CountryData{
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


}
