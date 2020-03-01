import { Directive, ElementRef, Renderer2, SimpleChange, Input } from '@angular/core';

@Directive({
  selector: '[appHiglightPushDirective]'
})
export class HiglightPushDirectiveDirective {
 
  constructor(private el: ElementRef, private renderer: Renderer2) { 
    console.log("push")
  }

  //update with new data pushed, the element with directive  'appHiglightPushDirective'
  ngOnChanges(changes: SimpleChange){
    //this.renderer.addClass(this.el.nativeElement,'higlight');  // NON FUNZIONA..
  }

}
