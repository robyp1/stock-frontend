import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
/* import * as EventSource from 'eventsource' */
import {EventSourcePolyfill} from 'ng-event-source'

/* 
Angular 8
install ng-event-source: https://www.npmjs.com/package/ng-event-source
npm install ng-event-source 
then use EventSourcePolyfill instead of EventSource
*/

@Injectable({
  providedIn: 'root'
})
export class StockReactiveService {

  url: string = "http://localhost:8080/stocks/titolo"
  stockP : StockPrice [] = []

  constructor(private httpClient : HttpClient ) { 
    
  }

  getStockPriceStreams(): Observable<Array<StockPrice>>
  {
      const observableObj : Observable<Array<StockPrice>> = new Observable((observer) =>{
          let url = this.url; 
          let eventSource = new EventSourcePolyfill(url,{ heartbeatTimeout: 15000, connectionTimeout: 15000, headers: { 'Authorization': 'Basic foo' }});
          eventSource.onmessage = (event => {
            console.debug('Received event: ', event);
            let json = JSON.parse(event.data);
            this.stockP.push(new StockPrice(json['symbol'], json['price'], json['time']))
            observer.next(this.stockP)
          });
          eventSource.onerror = (error) => {
            console.log("error")
            // readyState === 0 (closed) means the remote source closed the connection,
            // so we can safely treat it as a normal situation. Another way of detecting the end of the stream
            // is to insert a special element in the stream of events, which the client can identify as the last one.
            if(eventSource.readyState === 0) {
              console.log('The stream has been closed by the server.');
              eventSource.close();
              observer.complete();
            } else {
              observer.error('EventSource error: ' + error);
            }
          }
        });
        return observableObj;
  }


}

export class StockPrice{
    symbol: string
    price: number
    time: any

    constructor( symbol: string, price: number, time: any){
      this.symbol =symbol
      this.price =price
      this.time =time
    }
}


/* rx Example*/
  /* const locations = new Observable((observer) => {
          let watchId: number;
        
          // Simple geolocation API check provides values to publish
          if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition((position: Position) => {
              observer.next(position);
            }, (error: PositionError) => {
              observer.error(error);
            });
          } else {
            observer.error('Geolocation not available');
          }
        
          // When the consumer unsubscribes, clean up data ready for next subscription.
          return {
            unsubscribe() {
              navigator.geolocation.clearWatch(watchId);
            }
          };
        });
        
        // Call subscribe() to start listening for updates.
        const locationsSubscription = locations.subscribe({
          next(position) {
            console.log('Current Position: ', position);
          },
          error(msg) {
            console.log('Error Getting Location: ', msg);
          }
        });
        
        // Stop listening for location after 10 seconds
        setTimeout(() => {
          locationsSubscription.unsubscribe();
        }, 10000); */
