import { Component } from '@angular/core';
//import { CountriesApiComponent, CountryData } from './components/countries-api/countries-api.component';
import { ErrorService } from './services/error.service';
import { StockReactiveService, StockPrice } from './services/stock-reactive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-frontend';

  constructor(public errorService: ErrorService, public stockreactiveservice: StockReactiveService){
    let observerEvent : Observable<Array<StockPrice>> = stockreactiveservice.getStockPriceStreams()
    const stocksPricesSubscription = observerEvent.subscribe({
      next(stocksPrices) {
         stocksPrices.forEach(stockPriceData => {
          console.log('Current title/prices: ', stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time'] )
        }); 
        /* let stockPriceData: StockPrice = stocksPrices[stocksPrices.length -1];
        console.log('Current title/prices: ', stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time'] ) */
      },
      error(msg) {
        console.log('Error Getting prices: ', msg);
      }
    });
    setTimeout(() => { // si ferma dopo il tempo indicato
      stocksPricesSubscription.unsubscribe();
    }, 120000);
  }
}
