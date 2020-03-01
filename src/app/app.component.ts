import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
//import { CountriesApiComponent, CountryData } from './components/countries-api/countries-api.component';
import { ErrorService } from './services/error.service';
import { StockReactiveService, StockPrice } from './services/stock-reactive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'stock-frontend';

  @ViewChild('div',{static:false}) div: ElementRef;

  //stockPriceData: StockPrice
  stockreactiveserviceRef: StockReactiveService;
  render: Renderer2;

  constructor(public errorService: ErrorService, private stockreactiveservice: StockReactiveService, private render2: Renderer2){
    this.stockreactiveserviceRef = stockreactiveservice;
    this.render = render2;
  }

  ngAfterViewInit(){
    let observerEvent : Observable<Array<StockPrice>> = this.stockreactiveserviceRef.getStockPriceStreams()
    let  stockPriceData : StockPrice
    const htmlWriter = new HtmlWriter(this.render, this.div);
    const stocksPricesSubscription = observerEvent.subscribe({
      next(stocksPrices) {
         stocksPrices.forEach(stockPriceData => {
          console.log('Current title/prices: ', stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time'] )
        }); 
        /* let stockPriceData: StockPrice = stocksPrices[stocksPrices.length -1];
        console.log('Current title/prices: ', stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time'] ) */
        stockPriceData = stocksPrices[stocksPrices.length -1]
        //pushDataToPage
        if (stockPriceData){
          htmlWriter.renderToHtml(stockPriceData)
        }
      },
      error(msg) {
        console.log('Error Getting prices: ', msg)
      }
    });
    setTimeout(() => { // si ferma dopo il tempo indicato
      stocksPricesSubscription.unsubscribe();
    }, 120000);
   
  }


}

export class HtmlWriter{
  render: Renderer2;
  div: ElementRef<any>;

  constructor(private render2: Renderer2, div: ElementRef){
    this.render = render2
    this.div = div
  }

  renderToHtml(stockPriceData: StockPrice){
    const p: HTMLParagraphElement = this.render.createElement('p')
    p.innerHTML = 'Current title/prices: ' + stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time']
    this.render.appendChild(this.div.nativeElement, p)
  }
}

