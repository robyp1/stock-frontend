import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
//import { CountriesApiComponent, CountryData } from './components/countries-api/countries-api.component';
import { Observable } from 'rxjs';
import { StockReactiveService, StockPrice } from 'src/app/services/stock-reactive.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent  implements AfterViewInit {

  @ViewChild('pushTag',{static:false}) p: ElementRef;

  //stockPriceData: StockPrice
  stockreactiveserviceRef: StockReactiveService;
  renderer: Renderer2;

  constructor(public errorService: ErrorService, private stockreactiveservice: StockReactiveService, private renderer2: Renderer2){
    this.stockreactiveserviceRef = stockreactiveservice;
    this.renderer = renderer2;
  }

  ngAfterViewInit(){
    let observerEvent : Observable<Array<StockPrice>> = this.stockreactiveserviceRef.getStockPriceStreams()
    let  stockPriceData : StockPrice
    const htmlWriter = new HtmlWriter(this.renderer, this.p);
    const stocksPricesSubscription = observerEvent.subscribe({
      next(stocksPrices) { //in realtà l'array è di un solo elemento, l'ultimo aggiornamento
         stocksPrices.forEach(stockPriceData => {
          console.log('Current title/prices: ', stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time'] )
        }); 
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
  renderer: Renderer2;
  div: ElementRef<any>;

  constructor(private renderer2: Renderer2, div: ElementRef){
    this.renderer = renderer2
    this.div = div
  }

  renderToHtml(stockPriceData: StockPrice){
    //const p: HTMLParagraphElement = this.render.createElement('p')
    //p.innerHTML = 'Current title/prices: ' + stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time']
    //this.render.appendChild(this.div.nativeElement, p)
    let datapush = 'Current title/prices: ' + stockPriceData['symbol'] + "/" + stockPriceData['price'] + " at time " + stockPriceData['time'];
    this.renderer.setProperty(this.div.nativeElement, 'innerHTML',datapush)
    this.renderer.addClass(this.div.nativeElement,'push-color');
    setTimeout(() => { // si ferma dopo il tempo indicato
      this.renderer.removeClass(this.div.nativeElement,'push-color')
    }, 500);
  }
}