import { Directive, ElementRef, Renderer2, SimpleChange, Input, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHiglightPushDirective]'
})
export class HiglightPushDirectiveDirective implements OnInit, OnChanges {
  
  
  constructor(private el: ElementRef, private renderer: Renderer2) { 
    console.log("push")
  }
  
  //update with new data pushed, the element with directive  'appHiglightPushDirective'
  ngOnInit(){
    this.renderer.addClass(this.el.nativeElement,'higlight');
  }
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {}
  /*
    this.renderer.addClass(this.el.nativeElement,'higlight');  // NON FUNZIONA sull'elelemento in push..!
    setTimeout(() => { // si ferma dopo il tempo indicato
      this.renderer.removeClass(this.el.nativeElement,'higlight')
    }, 500);
  }*/

}
